const express = reuire ('express');
const cors = require ('cors');
const app = express();
const port =3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const{MongoClient} = requie('mongodb');

const uri = 'mongodb+srv://202260138:aMigoS6A@baloo.1nlyg.mongodb.net/?retryWrites=true&w=majority&appName=Baloo'
const cliente = new MongoClient(uri);

app.post('/insertar', async(req,res)=>{
    try{
        await cliente.connect();
        const db=cliente.db(DataBaseGrupoA);
        const coleccion=db.coleccion('users');
        await coleccion.insertOne({usuario:'pepe',password:'pepe123'});
        req.send ("Documento agregado exitosamente");
    }finally{
        await cliente.close();
    }
});

app.listen(port,()=>{

    console.log(server listenig at http:localhost//localhost:${port});
});