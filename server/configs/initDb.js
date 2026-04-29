import db from "./db.js";

const initDatabase = async () => {
    const createUserTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(250) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            google_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        console.log("Initializing db");
        await db.query(createUserTable);
    } catch(err) {
        console.log("Error Initializing db", err);
        process.exit(1);
    }
}
export default initDatabase;