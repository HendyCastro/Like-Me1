const express = require("express");
const cors = require("cors");
const { datos_recibidos, agregarPost, actualizarPost, eliminarPost } = require("./consultas");
const app = express();

app.listen(3000, () => console.log("servidor levantado en el puerto 3000"));

app.use(express.json());
app.use(cors());

app.get("/posts", async (req, res) => {
    try {
        const posts = await datos_recibidos();
        res.json(posts);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body
        if (!titulo || !url || !descripcion) {
            return res.status(400).json({ message: "Faltan datos" });
        } else {
            const posts = await agregarPost(titulo, url, descripcion);
        }
        res.json("posts agregado");
    } catch (error) {
        console.log(error.message);
    }
});

app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { likes } = req.query
        const posts = await actualizarPost(id, likes);
        res.send("post actualizado");

    
    } catch (error) {
    res.status(400).json(error.message)
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        const posts = await eliminarPost(id);
        res.json(posts);
        res.send("post eliminado");
    } catch (error) {
        console.log(error.message);
    }
});







