import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { findUserByEmail, findUserByGoogleId, createUser } from "../models/userModel.js";
import { validatePassword } from "../services/authService.js";

dotenv.config();

passport.use(
    new LocalStrategy({usernameField: 'email'}, async(email, password, done) => {
        try {
            const user = await findUserByEmail(email);
            if(!user) return done(null, false, {message: "User not found"});
            
            const isMatch = await validatePassword(user.password, password);
            if(!isMatch) return done(null, false, {message: "Invalid Credentials"});

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await findUserByEmail(jwt_payload);
            if(!user) return done(null, false);
            return done(null, user);
        } catch(err){
            return done(err, false);
        }
    })
);
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async(accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await findUserByGoogleId(profile.id);
                if(existingUser) return done(null, existingUser);
                
                const newUser = await createUser(profile.displayName, profile.email[0].value, null, profile.id);
                done(null, user);
            } catch(err){
                done(err);
            }
        }
    )
);