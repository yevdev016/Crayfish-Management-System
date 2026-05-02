import passport from 'passport';
import { createUserService, generateJwt } from '../services/authService.js';
import { setAuthCookie } from '../utils/cookieUtils.js';
export const signUpController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUserService(username, email, password);
        const token = generateJwt(user.id);
        setAuthCookie(res, token);
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
        console.log(token)
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

export const signinController = async (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if(error) return next(error);
        if(!user) {
            return res.status(401).json({
                message: info?.message || 'Invalid Credentials'
            });
        }
        const token = generateJwt(user.id);
        setAuthCookie(res, token);

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        });
    })(req, res, next);
}
export const googleCallback = passport.authenticate('google', {failureRedirect: '/'});