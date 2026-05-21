import db from '../configs/db.js'

export const getAllHabitats = async (userId) => {
    const query = `
    SELECT * FROM habitats WHERE user_id = $1 ORDER BY created_at DESC;`
    const res = await db.query(query, [userId]);
    return res.rows;
}

export const getHabitatById = async (id) =>{
    const query = `
    SELECT * FROM habitats WHERE id = $1;`
    const res = await db.query(query, [id]);
    return res.rows[0] || null
}

export const createHabitat = async(userId, name, species, count, stage, image) => {
    const query =  `
    INSERT INTO habitats (user_id, name, species, count, stage, image) 
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;`
    const values = [userId, name, species, count, stage, image];
    const res = await db.query(query, values);
    return res.rows[0];
}
export const updateHabitat = async(id, userId, data) => {
    const query = `
    UPDATE habitats
    SET name = $1, species = $2, count = $3, stage = $4, image = $5
    WHERE id = $6 AND user_id = $7
    RETURNING *`
    const values = [data.name, data.species, data.count, data.stage, data.image, id, userId];
    const res = await db.query(query, values);
    return res.rows[0];
}
export const deleteHabitat = async(id, userId) =>{
    const query = `
    DELETE FROM habitats WHERE id = $1 AND user_id = $2 RETURNING id;`
    const res = await db.query(query, [id, userId]);
    return res.rows[0] || null
}