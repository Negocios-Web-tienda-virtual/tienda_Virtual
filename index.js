//Importar los modulos de express.js
const express = require('express');

// Importación de Handlebars
const exphbs = require("express-handlebars");

// Importar las rutas requeridas
const routes = require("./routes");

// Crear la conexión a la base de datos
const dataBaseVS = require("./config/db");

// Importar Modelos 
require("./models/administradorVS");
require("./models/Cliente");
require("./models/Producto");



// Realizando la conexión a la base de datos virtualStore
dataBaseVS.sync()
    .then(() => console.log("Conectado con el servidor de DataBase: virtualStore"))
    .catch((error) => console.log(error));

//Crear un servidor de express
const app = express();


// Indicarle al servidor la carpeta de archivos estáticos
app.use(express.static("public"));

// Indicar el template engine a utilizar o en su defecto Handlebars
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
    })
);

app.set("view engine", "hbs");

// rutas del servidor 
app.use("/", routes());

// Inicializar el servidor en un puerto en especifico
app.listen(3000, () => {
    console.log("Servidor ejecutandose correctamente el el puerto 3000");
});