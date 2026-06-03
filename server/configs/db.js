import pg from 'pg'
import dotenv from 'dotenv'
import dns from 'dns/promises'

dotenv.config();

const poolConfig = {
    idleTimeoutMillis: 30000,
    max: 10
};

if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    poolConfig.user = decodeURIComponent(url.username);
    poolConfig.password = decodeURIComponent(url.password);
    poolConfig.host = url.hostname;
    poolConfig.port = url.port;
    poolConfig.database = url.pathname.slice(1);
    poolConfig.ssl = { rejectUnauthorized: false };

    try {
        const [ipv4] = await dns.resolve4(poolConfig.host);
        console.log(`Resolved ${poolConfig.host} -> ${ipv4}`);
        poolConfig.host = ipv4;
    } catch (err) {
        console.error('IPv4 resolution failed:', err.message);
    }
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

const connectDb = async () => {
    try {
        const client = await db.connect();
        console.log("Database is connected")
        client.release();
    } catch(err) {
        console.error('Database connection error: ', err);
    }
}
connectDb();

export default db;