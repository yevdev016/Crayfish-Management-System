import db from '../configs/db.js'

export const createActivity = async (userId, action) => {
    const query = `
    INSERT INTO activities (user_id, action)
    VALUES ($1, $2)
    RETURNING *;
    `
    const res = await db.query(query, [userId, action])
    return res.rows[0]
}

export const getAllActivities = async (userId) => {
    const query = `
    SELECT * FROM activities WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50;
    `
    const res = await db.query(query, [userId])
    return res.rows
}
