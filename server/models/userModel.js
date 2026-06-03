import db from '../configs/db.js'

export const createUser = async (username, email, password, google_id=null, isVerified=false) => {
    const query = `
    INSERT INTO users(username, email, password, google_id, is_verified)
    VALUES($1, $2, $3, $4, $5) RETURNING id, email, created_at;
    `;
    const values = [username, email, password, google_id, isVerified];
    const res = await db.query(query, values);
    return res.rows[0];
};

export const findUserById = async (id) => {
    const query = `
    SELECT id, username, email, password, google_id, is_verified FROM users WHERE id = $1;
    `;
    const res = await db.query(query, [id]);
    return res.rows[0] || null;
};

export const findUserByEmail = async (email) => {
    const query = 
    `
    SELECT id, username, email, password, google_id, is_verified FROM users WHERE email = $1;
    `
    const res = await db.query(query, [email]);
    return res.rows[0] || null;
}
export const findUserByGoogleId = async (google_id) => {
    const query = `
    SELECT id, username, email, password, google_id FROM users WHERE google_id = $1;
    `;
    const res = await db.query(query, [google_id]);
    return res.rows[0] || null;
}
export const googleUpdateInDb = async (userId, googleId) => {
    const query = `
        UPDATE users 
        SET google_id = $1, is_verified = TRUE
        WHERE id = $2 
        RETURNING *;
    `;
    const values = [googleId, userId];
    const result = await db.query(query, values); 
    return result.rows[0]; 
};

export const storeOtp = async (email, otp, expiresAt) => {
    const query = `
        UPDATE users SET otp = $1, otp_expires_at = $2 WHERE email = $3 RETURNING id;
    `;
    const res = await db.query(query, [otp, expiresAt, email]);
    return res.rows[0] || null;
}

export const verifyOtp = async (email, otp) => {
    const query = `
        SELECT id FROM users
        WHERE email = $1 AND otp = $2 AND otp_expires_at > NOW()
        AND is_verified = FALSE;
    `;
    const res = await db.query(query, [email, otp]);
    return res.rows[0] || null;
}

export const markVerified = async (userId) => {
    const query = `
        UPDATE users SET is_verified = TRUE, otp = NULL, otp_expires_at = NULL
        WHERE id = $1 RETURNING id, username, email;
    `;
    const res = await db.query(query, [userId]);
    return res.rows[0];
}

export const clearOtp = async (email) => {
    const query = `
        UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE email = $1;
    `;
    await db.query(query, [email]);
}