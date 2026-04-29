import db from '../configs/db.js'
import bcrypt from 'bcrypt'

export const createUser = async (username, email, password, google_id=null) => {
    const query = `
    INSERT INTO users(username, email, password, google_id)
    VALUES($1, $2, $3, $4) RETURNING id, email, created_at;
    `;
    const values = [username, email, password, google_id];
    const res = await db.query(query, values);
    return res.rows[0];
};

export const findUserByEmail = async (email) => {
    const query = `
    SELECT id, username, email, password, google_id FROM users WHERE email = $1;
    `;
    const res = await db.query(query, [email]);
    return res.rows[0] || null;
};

export const findUserByGoogleId = async (google_id) => {
    const query = `
    SELECT id, username, email, password, google_id FROM users WHERE google_id = $1;
    `;
    const res = await db.query(query, [google_id]);
    return res.rows[0] || null;
}