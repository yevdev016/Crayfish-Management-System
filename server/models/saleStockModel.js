import db from '../configs/db.js';

export const getAllSaleStock = async (userId) => {
    const query = `
    SELECT sales_stock.*, habitats.name AS habitat, habitats.species, habitats.stage
    FROM sales_stock
    JOIN habitats ON sales_stock.habitat_id = habitats.id
    WHERE sales_stock.user_id = $1
    ORDER BY sales_stock.created_at DESC
    `
    const result = await db.query(query, [userId]);
    return result.rows;
}

export const createSaleStock = async (userId, data) => {
    const query = `
    WITH deduct AS (
        UPDATE habitats
        SET count = count - $1
        WHERE id = $2 AND user_id = $3 AND count >= $1
        RETURNING id
    ),
    insert_stock AS (
        INSERT INTO sales_stock(user_id, habitat_id, price, status, count, notes, available)
        SELECT $3, $2, $4, 'available', $1, $5, $1
        WHERE EXISTS (SELECT 1 FROM deduct)
        RETURNING *
    )
    SELECT insert_stock.*, h.name AS habitat, h.species, h.stage
    FROM insert_stock
    JOIN habitats h ON insert_stock.habitat_id = h.id
    `
    const values = [data.count, data.habitat_id, userId, data.price, data.notes];
    const result = await db.query(query, values);
    if (!result.rows[0]) throw new Error('Insufficient habitat count');
    return result.rows[0];
}

export const updateSaleStock = async (id, userId, data) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const old = await client.query(
            `SELECT habitat_id, count, available FROM sales_stock WHERE id = $1 AND user_id = $2 FOR UPDATE`,
            [id, userId]
        );
        if (!old.rows[0]) {
            await client.query('ROLLBACK');
            return null;
        }

        const { habitat_id: oldHabitatId, count: oldCount, available: oldAvailable } = old.rows[0];
        const newHabitatId = data.habitat_id || oldHabitatId;
        const delta = data.count - oldCount;

        if (oldAvailable + delta < 0) {
            await client.query('ROLLBACK');
            throw new Error('Cannot reduce count below what has already been sold');
        }

        if (newHabitatId !== oldHabitatId) {
            const restore = await client.query(
                `UPDATE habitats SET count = count + $1 WHERE id = $2 AND user_id = $3`,
                [oldAvailable, oldHabitatId, userId]
            );
            if (restore.rowCount === 0) {
                await client.query('ROLLBACK');
                throw new Error('Old habitat not found');
            }
            const deduct = await client.query(
                `UPDATE habitats SET count = count - $1 WHERE id = $2 AND user_id = $3 AND count >= $1`,
                [data.count, newHabitatId, userId]
            );
            if (deduct.rowCount === 0) {
                await client.query('ROLLBACK');
                throw new Error('Insufficient count in new habitat');
            }
            await client.query(
                `UPDATE sales_stock
                 SET count = $1, price = $2, notes = $3, habitat_id = $4,
                     available = $5,
                     status = CASE WHEN $5 <= 0 THEN 'sold' ELSE status END
                 WHERE id = $6 AND user_id = $7`,
                [data.count, data.price, data.notes, newHabitatId, oldAvailable + delta, id, userId]
            );
        } else {
            if (delta > 0) {
                const habitatUpdate = await client.query(
                    `UPDATE habitats SET count = count - $1 WHERE id = $2 AND user_id = $3 AND count >= $1`,
                    [delta, oldHabitatId, userId]
                );
                if (habitatUpdate.rowCount === 0) {
                    await client.query('ROLLBACK');
                    throw new Error('Insufficient habitat count');
                }
            } else if (delta < 0) {
                await client.query(
                    `UPDATE habitats SET count = count + $1 WHERE id = $2 AND user_id = $3`,
                    [-delta, oldHabitatId, userId]
                );
            }

            await client.query(
                `UPDATE sales_stock
                 SET count = $1, price = $2, notes = $3,
                     available = $4,
                     status = CASE WHEN $4 <= 0 THEN 'sold' ELSE status END
                 WHERE id = $5 AND user_id = $6`,
                [data.count, data.price, data.notes, oldAvailable + delta, id, userId]
            );
        }

        await client.query('COMMIT');

        const fullResult = await db.query(`
            SELECT sales_stock.*, habitats.name AS habitat, habitats.species, habitats.stage
            FROM sales_stock
            JOIN habitats ON sales_stock.habitat_id = habitats.id
            WHERE sales_stock.id = $1
        `, [id]);

        return fullResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

export const sellSaleStock = async (id, userId, qty, customerName) => {
    const query = `
    WITH valid AS (
        SELECT id FROM sales_stock WHERE id = $3 AND user_id = $4 AND available >= $1
    ),
    insert_sale AS (
        INSERT INTO sales(sales_stock_id, qty, customer_name)
        SELECT $3, $1, $2
        WHERE EXISTS (SELECT 1 FROM valid)
    ),
    update_stock AS (
        UPDATE sales_stock
        SET available = available - $1,
            customer_name = $2,
            sold_date = CURRENT_DATE,
            status = CASE WHEN available - $1 <= 0 THEN 'sold' ELSE status END
        WHERE id IN (SELECT id FROM valid)
        RETURNING *
    )
    SELECT update_stock.*, h.name AS habitat, h.species, h.stage
    FROM update_stock
    JOIN habitats h ON update_stock.habitat_id = h.id
    `
    const values = [qty, customerName, id, userId];
    const result = await db.query(query, values);
    if (!result.rows[0]) return null
    return result.rows[0]
}

export const deleteSaleStock = async (id, userId) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const entry = await client.query(
            `SELECT habitat_id, available FROM sales_stock WHERE id = $1 AND user_id = $2`,
            [id, userId]
        );
        if (!entry.rows[0]) {
            await client.query('ROLLBACK');
            return null;
        }

        const { habitat_id, available } = entry.rows[0];

        const deleted = await client.query(
            `DELETE FROM sales_stock WHERE id = $1 AND user_id = $2 RETURNING *`,
            [id, userId]
        );

        await client.query(
            `UPDATE habitats SET count = count + $1 WHERE id = $2 AND user_id = $3`,
            [available, habitat_id, userId]
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
