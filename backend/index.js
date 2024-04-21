const express = require("express");
const cors = require("cors");
const pg = require("pg");

const app = express();
app.listen(3000, () => console.log("servidor levantado en el puerto 3000"));


const pool = new pg.Pool({
    host: 'localhost',
    user: 'naya',
    password: 'naya1234',
    database: 'likeme',
    allowExitOnIdle: true
});

app.use(express.json());
app.use(cors());

app.get("/posts", async (req, res) => {
    try {
        const query = "SELECT * FROM posts;"
        const response = await pool.query(query);
        console.log(response.rows)
        res.json(response.rows)
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/posts", async (req, res) => {
    try {
        const {titulo, url, descripcion} = req.body 
        const id = Math.floor(Math.random() * 9999)
        const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES($1,$2,$3,$4,$5);"
        const values = [id,titulo, url,descripcion,0];
        const response = await pool.query(query, values);
        res.json(response.rows)

    } catch (error) {
        console.log(error.message);
    }
}); 








