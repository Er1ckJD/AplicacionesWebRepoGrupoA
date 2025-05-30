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

// Conectar una sola vez al inicio
let db;
client.connect().then(() => {
    db = client.db('DataBaseGrupoA');
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error conectando a MongoDB:', err);
});

// RUTA MEJORADA: Insertar usuario con datos del formulario
app.post('/insertar', async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Validar que los datos existan
        if (!usuario || !password) {
            return res.status(400).json({
                error: 'Usuario y contraseña son requeridos'
            });
        }

        const collection = db.collection('users');

        // Verificar si el usuario ya existe
        const usuarioExistente = await collection.findOne({ usuario: usuario });
        if (usuarioExistente) {
            return res.status(400).json({
                error: 'El usuario ya existe'
            });
        }

        // Insertar el nuevo usuario
        const resultado = await collection.insertOne({
            usuario: usuario,
            password: password,
            fechaCreacion: new Date()
        });

        res.json({
            mensaje: "Usuario agregado exitosamente",
            id: resultado.insertedId
        });

    } catch (error) {
        console.error("Error insertando documento:", error);
        res.status(500).json({
            error: "Error al agregar el usuario"
        });
    }
});

// NUEVA RUTA: Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const collection = db.collection('users');
        const usuarios = await collection.find({}).toArray();
        res.json(usuarios);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        res.status(500).json({
            error: "Error al obtener usuarios"
        });
    }
});

// NUEVA RUTA: Obtener un usuario específico
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const collection = db.collection('users');
        const usuario = await collection.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Error obteniendo usuario:", error);
        res.status(500).json({
            error: "Error al obtener el usuario"
        });
    }
});

// NUEVA RUTA: Actualizar usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const { usuario, password } = req.body;
        const collection = db.collection('users');

        const resultado = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    usuario: usuario,
                    password: password,
                    fechaActualizacion: new Date()
                }
            }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: "Usuario actualizado exitosamente"
        });
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        res.status(500).json({
            error: "Error al actualizar el usuario"
        });
    }
});

// NUEVA RUTA: Eliminar usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { ObjectId } = require('mongodb');
        const collection = db.collection('users');

        const resultado = await collection.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: "Usuario eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        res.status(500).json({
            error: "Error al eliminar el usuario"
        });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Servidor funcionando correctamente',
        rutas: {
            'POST /insertar': 'Crear usuario',
            'GET /usuarios': 'Obtener todos los usuarios',
            'GET /usuarios/:id': 'Obtener usuario específico',
            'PUT /usuarios/:id': 'Actualizar usuario',
            'DELETE /usuarios/:id': 'Eliminar usuario'
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// Cerrar conexión al terminar el proceso
process.on('SIGINT', async () => {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
    process.exit(0);
});