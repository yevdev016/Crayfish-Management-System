import express from 'express';
import jwt from 'jsonwebtoken'
import { signUpController, signinController, googleCallback } from '../controllers/authController.js';
import passport from 'passport';
import { generateJwt } from '../services/authService.js';
const router = express.Router();

router.post('/signin', signinController);
router.post('/signup', signUpController);
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
            res.redirect(`http://localhost:5173/dashboard?token=${token}`);
        } catch(err) {
            console.error("Token Generation Error:", error);
            res.redirect('http://localhost:5173/login?error=token_generation_failed');
        }
        
    }
);
export default router;