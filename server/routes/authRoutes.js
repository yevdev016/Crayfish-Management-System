import express from 'express';
import { signUpController, signinController, googleCallback, signoutController } from '../controllers/authController.js';
import passport from 'passport';
import { generateJwt } from '../services/authService.js';
import { setAuthCookie } from '../utils/cookieUtils.js';
import { validate } from '../middleware/validate.js';
import { signinSchema, signupSchema } from '../configs/validationSchemas.js';
const router = express.Router();

router.post('/signin', validate(signinSchema), signinController);
router.post('/signup', validate(signupSchema), signUpController);
router.post('/signout', signoutController);
router.get('/check-auth', passport.authenticate('jwt', {session: false}), (req, res) => {
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