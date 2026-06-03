import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const poolConfig = {
    idleTimeoutMillis: 30000,
    max: 10
};

if (process.env.DATABASE_URL) {
    poolConfig.connectionString = process.env.DATABASE_URL;
    poolConfig.ssl = { rejectUnauthorized: false };
} else {
    Object.assign(poolConfig, {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    });
}

const db = new pg.Pool(poolConfig);