import db from "./db.js";

const initDatabase = async () => {
    const createUserTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(250) UNIQUE NOT NULL,
            password TEXT,
            google_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    const createHabitatTable = `
        CREATE TABLE IF NOT EXISTS habitats (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL,
        species VARCHAR(50) NOT NULL,
        count INT DEFAULT 0,
        stage VARCHAR(50) NOT NULL DEFAULT 'Adult',
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
    const createInventoryTable = `
        CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        habitat_id INT NOT NULL REFERENCES habitats(id) ON DELETE CASCADE,
        species VARCHAR(50) NOT NULL,
        stage VARCHAR(20) NOT NULL,
        count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
    const createLifecycleTable = `
        CREATE TABLE IF NOT EXISTS lifecycle (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        habitat_id INT NOT NULL REFERENCES habitats(id) ON DELETE CASCADE,
        from_stage VARCHAR(50) NOT NULL,
        to_stage VARCHAR(50) NOT NULL,
        count INT DEFAULT 0,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
    const createActivitiesTable = `
        CREATE TABLE IF NOT EXISTS activities (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        action TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        );
     `
    try {
        console.log("Initializing db");
        await db.query(createUserTable);
        await db.query(createHabitatTable);
        await db.query(createInventoryTable);
        await db.query(createLifecycleTable);
        await db.query(createActivitiesTable);
    } catch(err) {
        console.log("Error Initializing db", err);
        process.exit(1);
    }
}
export default initDatabase;