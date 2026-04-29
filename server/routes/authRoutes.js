import express from 'express';
import { signUpController, signinController, googleCallback } from '../controllers/authController.js';
import passport from 'passport';
const router = express.Router();

router.post('/signin', signinController);
router.post('/signup', signUpController);
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', 
    passport.authenticate('google', {failureRedirect: '/login'})
);
export default router;