import express from 'express'
import passport from 'passport';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import initDatabase from './configs/initDb.js';
import authRoutes from './routes/authRoutes.js'
import habitatRoutes from './routes/habitatRoutes.js'
import saleStockRoutes from './routes/saleStockRoutes.js'
import './configs/passport.js'
import cookieParser from 'cookie-parser'
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

app.use('/api/auth', authRoutes);
app.use('/api/habitats', habitatRoutes)
app.use('/api/sales-stock', saleStockRoutes);
app.listen(port, () => {
    console.log(`This server is running on port: ${port}`);
});