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
    const createsalesStockTable = `
        CREATE TABLE IF NOT EXISTS sales_stock (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        habitat_id INT NOT NULL REFERENCES habitats(id) ON DELETE CASCADE,
        price DECIMAL(10,2) DEFAULT 0,
        status TEXT,
        count INT DEFAULT 0,
        available INT NOT NULL,
        sold_date DATE,
        notes TEXT,
        customer_name VARCHAR(100),
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
    const createSalesTable = `
        CREATE TABLE IF NOT EXISTS sales (
        id SERIAL PRIMARY KEY,
        sales_stock_id INT REFERENCES sales_stock(id) ON DELETE SET NULL,
        qty INT NOT NULL,
        customer_name VARCHAR(100),
        sold_date DATE DEFAULT CURRENT_DATE,
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
    const fixSalesFK = `
        ALTER TABLE sales ALTER COLUMN sales_stock_id DROP NOT NULL;
        ALTER TABLE sales DROP CONSTRAINT IF EXISTS sales_sales_stock_id_fkey;
        ALTER TABLE sales ADD CONSTRAINT sales_sales_stock_id_fkey
            FOREIGN KEY (sales_stock_id) REFERENCES sales_stock(id) ON DELETE SET NULL;
     `
    try {
        console.log("Initializing db");
        await db.query(createUserTable);
        await db.query(createHabitatTable);
        await db.query(createsalesStockTable);
        await db.query(createLifecycleTable);
        await db.query(createSalesTable);
        await db.query(createActivitiesTable);
        await db.query(fixSalesFK);
    } catch(err) {
        console.log("Error Initializing db", err);
        process.exit(1);
    }
}
export default initDatabase;