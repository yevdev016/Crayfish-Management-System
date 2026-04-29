import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import initDatabase from './configs/initDb.js';

const app = express();

const port = process.env.SERVER_PORT || 3000;
await initDatabase();

app.use(cors({
    origin: "http://localhost:5172",
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hi");
});

app.listen(port, () => {
    console.log(`This server is running on port: ${port}`);
});