//Importar los modulos de express.js
const express = require('express');

// Importar las rutas requeridas
const routes = require("./routes");

// Crear la conexión a la base de datos
const dataBaseVS = require("./config/db");

// Realizando la conexión a la base de datos virtualStore
dataBaseVS.sync()
    .then(() => console.log("Conectado con el servidor de DataBase: virtualStore"))
    .catch((error) => console.log(error));

//Crear un servidor de express
const app = express();

//Inicializar el servidor en un puerto en especifico
app.listen(3000, () => {
    console.log("Servidor ejecutandose correctamente el el puerto 3000");
});