//Importar los modulos de express.js
const express = require('express');

//Crear un servidor de express
const app = express();

//Inicializar el servidor en un puerto en especifico
app.listen(3000, () =>{
    console.log("Servidor ejecutandose correctamente el el puerto 3000");
});
