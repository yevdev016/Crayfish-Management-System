import db from '../configs/db.js';
import { validStages } from '../constants.js';

export const getAllLifecycle = async (userId) => {
    const query = `
    SELECT lifecycle.*, habitats.name AS habitat, habitats.species AS species
    FROM lifecycle
    JOIN habitats ON lifecycle.habitat_id = habitats.id
    WHERE lifecycle.user_id = $1
    ORDER BY lifecycle.created_at DESC
    `
    const result = await db.query(query, [userId]);
    return result.rows;
}

export const createLifecycle = async (userId, data) => {
    if (data.from_stage === data.to_stage) throw new Error('From and to stages must be different');

    if (data.count < 1) throw new Error('Count must be at least 1');

    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const habitat = await client.query(
            `SELECT id, count, stage FROM habitats WHERE id = $1 AND user_id = $2 FOR UPDATE`,
            [data.habitat_id, userId]
        );
        if (!habitat.rows[0]) {
            await client.query('ROLLBACK');
            throw new Error('Habitat not found');
        }

        const currentHabitat = habitat.rows[0];

        if (data.from_stage !== currentHabitat.stage) {
            await client.query('ROLLBACK');
            throw new Error(`Habitat is at stage "${currentHabitat.stage}", not "${data.from_stage}"`);
        }

        if (data.count > currentHabitat.count) {
            await client.query('ROLLBACK');
            throw new Error('Count exceeds habitat population');
        }

        const created = await client.query(
            `INSERT INTO lifecycle(user_id, habitat_id, from_stage, to_stage, count, date)
             VALUES($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [userId, data.habitat_id, data.from_stage, data.to_stage, data.count, data.date]
        );

        await client.query(
            `UPDATE habitats SET count = count - $1, stage = $2 WHERE id = $3 AND user_id = $4`,
            [data.count, data.to_stage, data.habitat_id, userId]
        );

        await client.query('COMMIT');

        const fullQuery = `
        SELECT lifecycle.*, habitats.name AS habitat, habitats.species AS species
        FROM lifecycle
        JOIN habitats ON lifecycle.habitat_id = habitats.id
        WHERE lifecycle.id = $1
        `
        const fullResult = await db.query(fullQuery, [created.rows[0].id]);
        return fullResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

export const updateLifecycle = async (id, userId, data) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const existing = await client.query(
            `SELECT id, count, habitat_id FROM lifecycle WHERE id = $1 AND user_id = $2 FOR UPDATE`,
            [id, userId]
        );
        if (!existing.rows[0]) {
            await client.query('ROLLBACK');
            return null;
        }

        const oldCount = existing.rows[0].count;
        const habitatId = existing.rows[0].habitat_id;

        const delta = data.count - oldCount;

        if (delta > 0) {
            const habitatUpdate = await client.query(
                `UPDATE habitats SET count = count - $1 WHERE id = $2 AND user_id = $3 AND count >= $1`,
                [delta, habitatId, userId]
            );
            if (habitatUpdate.rowCount === 0) {
                await client.query('ROLLBACK');
                throw new Error('Insufficient habitat count to increase transition');
            }
        } else if (delta < 0) {
            await client.query(
                `UPDATE habitats SET count = count + $1 WHERE id = $2 AND user_id = $3`,
                [-delta, habitatId, userId]
            );
        }

        const updated = await client.query(
            `UPDATE lifecycle SET count = $1, date = $2 WHERE id = $3 AND user_id = $4 RETURNING *`,
            [data.count, data.date, id, userId]
        );

        await client.query('COMMIT');

        const fullQuery = `
        SELECT lifecycle.*, habitats.name AS habitat, habitats.species AS species
        FROM lifecycle
        JOIN habitats ON lifecycle.habitat_id = habitats.id
        WHERE lifecycle.id = $1
        `
        const fullResult = await db.query(fullQuery, [id]);
        return fullResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

export const deleteLifecycle = async (id, userId) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const entry = await client.query(
            `SELECT id, count, habitat_id, from_stage FROM lifecycle WHERE id = $1 AND user_id = $2`,
            [id, userId]
        );
        if (!entry.rows[0]) {
            await client.query('ROLLBACK');
            return null;
        }

        const { count, habitat_id, from_stage } = entry.rows[0];

        await client.query(
            `UPDATE habitats SET count = count + $1, stage = $2 WHERE id = $3 AND user_id = $4`,
            [count, from_stage, habitat_id, userId]
        );

        const deleted = await client.query(
            `DELETE FROM lifecycle WHERE id = $1 AND user_id = $2 RETURNING *`,
            [id, userId]
        );

        await client.query('COMMIT');
        return deleted.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}
