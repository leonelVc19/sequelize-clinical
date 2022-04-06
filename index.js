const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

//importacion de las variables de entorno
require('dotenv').config();
require('./middlewares/auth');

//Hacer la importación de los modulos.
const db = require('./models');

//importación de rutas PROTEGIDAS
const routes = require('./routes/routes');

//IMPORTACION DE RUTAS NO PROTEGIDAS
const rutasNoProtegidas = require('./routes/rutasNoProtegidas');


//Hacer la conexión, con la base de datos.
db.sequelize.authenticate()
.then(() => {
    console.log("DB, Conect.");
})
.catch((error) => {
    console.log(error);
});

//creación del servidor.
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//conrs para el acceso algun dominio d
//oh donde estara ubicado el frontend,.
app.use(
    cors({
        credentials: true,
        origin:['http://localhost:3000'],
    })
);


//RUTAS
//Incluir las tutas en index.js principal
app.use('/', rutasNoProtegidas());

// rutas protegidas
app.use('/', passport.authenticate('jwt', { session: false }), routes());

//Acceso a la capeta para mostrar imagenes
app.use('/uploads', express.static('uploads'));

//Habilitar el puerto de escucha en donde estara el server.
/**para llamar las variables de entorno, se les colcoca process.env. y despues con fue nombrada la variable. 
 * La otra opcion.
 * solo colocar el puerto en este caso 5000
 * 
*/
app.listen(process.env.APP_PORT, () => {
    console.log("El servidor esta, activo.");
})