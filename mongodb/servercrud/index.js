const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://Erick:@EricK2016@cluster0.uhv0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

app.post('/insertar', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('DataBaseGrupoA');
        const collection = db.collection('users');
        await collection.insertOne({ usuario: 'pepe', password: 'pepe' });
        res.send("Documento agregado exitosamente");
    } catch (error) {
        console.error("Error connecting to MongoDB or inserting document:", error);
        res.status(500).send("Error al agregar el documento");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});