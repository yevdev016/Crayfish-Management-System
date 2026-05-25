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
    INSERT INTO sales_stock(user_id, habitat_id, price, status, count, notes)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
    const values = [userId, data.habitat_id, data.price, 'available', data.count, data.notes];
    const result = await db.query(query, values);

    const getFullQuery = `
    SELECT sales_stock.*, habitats.name AS habitat, habitats.species, habitats.stage
    FROM sales_stock
    JOIN habitats ON sales_stock.habitat_id = habitats.id
    WHERE sales_stock.id = $1
    `
    const fullResult = await db.query(getFullQuery, [result.rows[0].id])
    return fullResult.rows[0]
}
export const updateSaleStock = async (id, userId, data) => {
    const query = `
    UPDATE sales_stock
    SET count = $1, price = $2, notes = $3
    WHERE id = $4 AND user_id = $5
    RETURNING *;
    `
    const values = [data.count, data.price, data.notes, id, userId];
    const result = await db.query(query, values);
    if (!result.rows[0]) return null

    const getFullQuery = `
    SELECT sales_stock.*, habitats.name AS habitat, habitats.species, habitats.stage
    FROM sales_stock
    JOIN habitats ON sales_stock.habitat_id = habitats.id
    WHERE sales_stock.id = $1
    `
    const fullResult = await db.query(getFullQuery, [id])
    return fullResult.rows[0]
}
export const sellSaleStock = async (id, userId, customerName) => {
    const query = `
    UPDATE sales_stock
    SET status = 'sold', customer_name = $1, sold_date = CURRENT_DATE
    WHERE id = $2 AND user_id = $3
    RETURNING *;
    `
    const values = [customerName, id, userId];
    const result = await db.query(query, values);
    if (!result.rows[0]) return null

    const getFullQuery = `
    SELECT sales_stock.*, habitats.name AS habitat, habitats.species, habitats.stage
    FROM sales_stock
    JOIN habitats ON sales_stock.habitat_id = habitats.id
    WHERE sales_stock.id = $1
    `
    const fullResult = await db.query(getFullQuery, [id])
    return fullResult.rows[0]
}

export const deleteSaleStock = async (id, userId) => {
    const query = `
    DELETE FROM sales_stock
    WHERE id = $1 AND user_id = $2
    RETURNING *;
    `
    const values = [id, userId];
    const result = await db.query(query, values);
    return result.rows[0] || null;
}