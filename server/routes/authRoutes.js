import express from 'express';
import { signUpController, signinController, googleCallback } from '../controllers/authController.js';
import passport from 'passport';
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
        const token = req.user.token;
        res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    }
);
export default router;