import express from 'express';
import jwt from 'jsonwebtoken'
import { signUpController, signinController, googleCallback } from '../controllers/authController.js';
import passport from 'passport';
import { generateJwt } from '../services/authService.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import { setAuthCookie } from '../utils/cookieUtils.js';
const router = express.Router();

router.post('/signin', signinController);
router.post('/signup', signUpController);
router.get('/check-auth', authenticateJWT, (req, res) => {
    res.status(200).json({message: 'Authenticated'});
});
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/login', 
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