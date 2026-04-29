import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { createUser, findUserByEmail, findUserByGoogleId } from '../models/userModel.js'
dotenv.config();

export const createUserService = async (username, email, password, google_id = null) => {
    const exististingUser = await findUserByEmail(email);
    if(exististingUser) throw new Error('User already exist');

    return await createUser(username, email, password, google_id);
}

export const generateJwt = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_IN
    });
}

export const validatePassword = async (storedPassword, enteredPassword) => {
    return bcrypt.compare(enteredPassword, storedPassword);
}
export const findUserByGoogleIdService = async (google_id) => {
    return await findUserByGoogleId(google_id);
}