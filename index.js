//Importar los modulos de express.js
const express = require("express");

// Importación de Handlebars
const exphbs = require("express-handlebars");

// Importar las rutas requeridas
const routes = require("./routes");

// Crear la conexión a la base de datos
const dataBaseVS = require("./config/db");
const bodyParer = require("body-parser");

// importar passport
const passport = require("./config/passport");

// importar connect flash para mensajes
const flash = require("connect-flash");

//importar express-session para manejar las sesiones de cliente
const session = require("express-session");

const cookieParser = require("cookie-parser");

//const formidable = require("express-formidable");

require("./models/Producto");
require("./models/Pedido");
require("./models/Usuario");


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

app.use(bodyParer.urlencoded({ extended: true }));

// Habilitar el uso de cookie-Parser
app.use(cookieParser());

//app.use(formidable.parse({ keepExtensions: true }));    
// Habiliar las sesiones el usuario
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(flash());
// Crear una instancia de passport y cargar nuestra estrategia
app.use(passport.initialize());
app.use(passport.session());


// Pasar algunos valores mediante middleware
app.use((req, res, next) => {
    res.locals.Usuario = {...req.user } || null;
    res.locals.messages = req.flash();
    next();
});
/* app.use((req, res, next) => {
    res.locals.Producto = {...req.user } || null;
    res.locals.messages = req.flash();
    next();
});
 */


// rutas del servidor 
app.use("/", routes());

const host = "0.0.0.0";
const port = process.env.PORT;
// Inicializar el servidor en un puerto en especifico
app.listen(port, host, () => {
    console.log("Servidor ejecutandose correctamente el el puerto 3000");
});