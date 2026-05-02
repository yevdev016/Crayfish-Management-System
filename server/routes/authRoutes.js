import express from 'express';
import jwt from 'jsonwebtoken'
import { signUpController, signinController, googleCallback } from '../controllers/authController.js';
import passport from 'passport';
import { generateJwt } from '../services/authService.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
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
            res.cookie('authToken', token, { 
                httpOnly: true, 
                secure: false});
        } catch(err) {
            console.error("Token Generation Error:", error);
        }
        
    }
);
export default router;