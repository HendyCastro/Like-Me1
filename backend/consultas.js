const {Pool} = require ("pg");
require ("dotenv").config();
const pg = require ("pg");


const pool = new pg.Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
});


const datos_recibidos = async () => {
    
    const query = "SELECT * FROM posts;"
    const {rows} = await pool.query(query);
    return rows
 
}

const agregarPost = async (titulo, url, descripcion) => {
    const id = Math.floor(Math.random() * 9999);
    const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES($1, $2, $3, $4, $5) RETURNING *;";
    const values = [id, titulo, url, descripcion, 0];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Devuelve el nuevo post agregado
};

const actualizarPost = async (id) => {
    const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;";
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Devuelve el post actualizado
};

const eliminarPost = async (id) => {
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *;";
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Devuelve el post eliminado
};

module.exports = {
    datos_recibidos,
    agregarPost,
    actualizarPost,
    eliminarPost
}