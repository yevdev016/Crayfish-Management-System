import db from '../configs/db.js';

const validStages = ['Berried', 'Crayling', 'Juvenile', 'Adult', 'Breeder'];

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
    if (!validStages.includes(data.from_stage)) throw new Error('Invalid from_stage');
    if (!validStages.includes(data.to_stage)) throw new Error('Invalid to_stage');
    if (data.from_stage === data.to_stage) throw new Error('From and to stages must be different');
    if (!data.count || data.count < 1) throw new Error('Count must be at least 1');

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
            `UPDATE habitats SET stage = $1 WHERE id = $2 AND user_id = $3`,
            [data.to_stage, data.habitat_id, userId]
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
