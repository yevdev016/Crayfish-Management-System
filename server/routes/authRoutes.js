import express from 'express';
import { signUpController, signinController, googleCallback, signoutController } from '../controllers/authController.js';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import { generateJwt } from '../services/authService.js';
import { setAuthCookie } from '../utils/cookieUtils.js';
import { validate } from '../middleware/validate.js';
import { signinSchema, signupSchema } from '../configs/validationSchemas.js';
const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {message: "Too many attempts. Try again later"},
    standardHeaders: true,
    legacyHeaders: false
});

router.post('/signin', authLimiter, validate(signinSchema), signinController);
router.post('/signup', authLimiter, validate(signupSchema), signUpController);
router.post('/signout', signoutController);
router.get('/check-auth', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({
        message: 'Authenticated',
        id: req.user.id,
        username: req.user.username
    });
});
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/login', 
        session: false
    }),
    (req, res) => {
        try {
            const userId = req.user.id;
            const token = generateJwt(userId);
            setAuthCookie(res, token);
            res.redirect('http://localhost:5173/dashboard');
        } catch(err) {
            console.error("Token Generation Error:", err);
            res.redirect('http://localhost:5173/login');
        }
        
    }
);
export default router;