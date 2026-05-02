import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { findUserByEmail, findUserByGoogleId, createUser, googleUpdateInDb } from "../models/userModel.js";
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
    jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies.authToken]),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await findUserByEmail(jwt_payload.email);
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
                const email = profile.emails[0].value;
                const googleId = profile.id;
                let user = await findUserByGoogleId(googleId);

                if(!user){
                    user = await findUserByEmail(email);
                    if(user) {
                        user = await googleUpdateInDb (user.id, googleId);
                    } else {
                        user = await createUser(
                            profile.displayName, 
                            email, 
                            'google', 
                            googleId
                        );
                    }
                }
                return done(null, user);
            } catch(err){
                return done(err);
            }
        }
    )
);