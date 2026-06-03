import passport from 'passport';
import { createUserService, generateJwt, storeOtpForUser } from '../services/authService.js';
import { setAuthCookie, clearAuthCookie } from '../utils/cookieUtils.js';
import { sendOtpEmail } from '../services/emailService.js';
import { verifyOtp, markVerified } from '../models/userModel.js';

export const signUpController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUserService(username, email, password);
        const otp = await storeOtpForUser(email)
        await sendOtpEmail(email, otp)
        res.status(201).json({
            message: "Verification code sent to your email",
            email: user.email
        });
    } catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
}

export const verifyOtpController = async (req, res) => {
    const { email, otp } = req.body
    try {
        const user = await verifyOtp(email, otp)
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' })
        }
        const verified = await markVerified(user.id)
        const token = generateJwt(verified.id)
        setAuthCookie(res, token)
        res.status(200).json({
            message: 'Email verified successfully',
            user: {
                id: verified.id,
                username: verified.username,
                email: verified.email
            }
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const resendOtpController = async (req, res) => {
    const { email } = req.body
    try {
        const otp = await storeOtpForUser(email)
        await sendOtpEmail(email, otp)
        res.status(200).json({ message: 'OTP resent to your email' })
    } catch (err) {
        res.status(400).json({ message: err.message })
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
        if (!user.is_verified) {
            return res.status(403).json({
                message: 'Please verify your email first. Check your inbox for the OTP.',
                email: user.email
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
            }
        });
    })(req, res, next);
}
export const signoutController = async (req, res) => {
    try {
        clearAuthCookie(res);
        return res.status(200).json({
            success: true,
            message: "Logged out successful"
        })
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        })
    }
    
}
export const googleCallback = passport.authenticate('google', {failureRedirect: '/'});