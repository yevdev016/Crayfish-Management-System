import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import db from '../configs/db.js'
import { createUser, findUserById, findUserByGoogleId, findUserByEmail, storeOtp, clearOtp } from '../models/userModel.js'
dotenv.config();

export const createUserService = async (username, email, password, google_id = null) => {
    const saltRounds = 10;
    const existingUser = await findUserByEmail(email);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (existingUser) {
        if (existingUser.is_verified) throw new Error('User already exist');
        await clearOtp(email)
        const query = `
            UPDATE users SET username = $1, password = $2 WHERE email = $3 RETURNING id, email;
        `;
        const res = await db.query(query, [username, hashedPassword, email])
        return res.rows[0]
    }
    return await createUser(username, email, hashedPassword, google_id);
}

export const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
}

export const storeOtpForUser = async (email) => {
    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)
    await storeOtp(email, otp, expiresAt)
    return otp
}

export const generateJwt = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_IN
    });
}

export const validatePassword  = async (storedPassword, enteredPassword) => {
    return bcrypt.compare(enteredPassword, storedPassword);
}
export const findUserByGoogleIdService = async (google_id) => {
    return await findUserByGoogleId(google_id);
}