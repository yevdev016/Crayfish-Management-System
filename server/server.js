import express from 'express'
import passport from 'passport';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import initDatabase from './configs/initDb.js';
import authRoutes from './routes/authRoutes.js'
import './configs/passport.js'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
const app = express();
app.use(helmet());
const port = process.env.SERVER_PORT || 3000;
await initDatabase();
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {message: "Too many attempts. Try again later"},
    standardHeaders: true,
    legacyHeaders: false
})
app.use('/api/auth', authLimiter);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`This server is running on port: ${port}`);
});