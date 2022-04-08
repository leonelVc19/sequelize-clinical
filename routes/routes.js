const express = require('express');
const router = express.Router();
/*Importacion de access control */
const { grantAccess } = require('../middlewares/accessControl');


//Importación de los controllers para las acciones.
const customersController = require('../controllers/customersController');

const appointmentsController = require('../controllers/appointmentsController');

const categoriesController = require('../controllers/categoriesController');

const ordersController = require('../controllers/ordersController');

const treatmentsController = require('../controllers/treatmentsController');
const imagesController = require('../controllers/imagesController');

const informationHome = require('../controllers/infomationHome');
const imageInformationHome = require('../controllers/imageInformationController');


//IMPORTAR RUTAS DE USUARIOS.
const usuariosController = require('../controllers/Session/UsuariosController');
module.exports = () => {
    //Rutas de customers.
    //Mostrar todos los registros y por id
    router.get('/customers', grantAccess('readAny', 'customers') ,customersController.list);
    router.get('/customers/:id', grantAccess('readAny', 'customers') ,customersController.show);
    //Agregar un resgistro nuevo y actualizar resgistros
    router.post('/customers', grantAccess('createAny', 'customers') ,customersController.add);
    router.put('/customers/:id', grantAccess('updateAny', 'customers') ,customersController.update);
    //Eliminar registros
    router.delete('/customers/:id', grantAccess('deleteAny', 'customers') ,customersController.delete);
    //Filtar a los clientes.
    //Buscar a cliente. 
    router.get('/search', grantAccess('readAny', 'customers') ,customersController.search);
    //Filtrar a los usuarios por categoria
    router.post('/filtrar', customersController.filtrar);
    

    //Rutas para las citas.
    //Mostrar todos los registros y por id
    router.get('/appointments', grantAccess('readAny', 'appointments'), appointmentsController.list);
    router.get('/appointments/:id', grantAccess('readAny', 'appointments'), appointmentsController.show);
    //Agregar un resgistro nuevo y actualizar resgistros
    router.post('/appointments', grantAccess('createAny', 'appointments'), appointmentsController.add);
    router.put('/appointments/:id',  grantAccess('updateAny', 'appointments'), appointmentsController.update);
    //Eliminar registros
    router.delete('/appointments/:id', grantAccess('deleteAny', 'appointments'), appointmentsController.delete);
    //Buscar información de una cita
    router.get('/search_appointment', grantAccess('readAny', 'appointments'), appointmentsController.search_appointment);

    

    //Rutas para categorias.
    //Mostrar todas las categorias que esten es la base de datos.
    router.get('/categories', grantAccess('readAny', 'categories'), categoriesController.list);
    //Mostrar categoria por id
    router.get('/categories/:id', grantAccess('readAny', 'categories'), categoriesController.show);
    //Agregar y actualizar categorías.
    router.post('/categories', grantAccess('createAny', 'categories'), categoriesController.add);
    router.put('/categories/:id', grantAccess('updateAny', 'categories'),  categoriesController.update);
    //Eliminar categorias.
    router.delete('/categories/:id', grantAccess('deleteAny', 'categories'),  categoriesController.delete);




    //Rutas para las ordenes.
    //Mostrar a todas las ordenes de pago
    router.get('/orders', grantAccess('readAny', 'orders'), ordersController.list);
    //Mostrar orden opr id.
    router.get('/orders/:id', grantAccess('readAny', 'orders'), ordersController.show);
    //Agregar orden y actualizar la misma.
    router.post('/orders', grantAccess('createAny', 'orders'), ordersController.add);
    router.put('/orders/:id',  grantAccess('updateAny', 'orders'), ordersController.update);
    //eliminar orden
    router.delete('/orders/:id', grantAccess('deleteAny', 'orders'),ordersController.delete)
    //Buscar orden
    router.get('/search_orders', grantAccess('readAny', 'orders'),  ordersController.search);
    


    //Tratamientos.
    //Buscar todos o por ID.
    router.get('/treatments', grantAccess('readAny', 'treatments'), treatmentsController.list);
    router.get('/treatments/:id', grantAccess('readAny', 'treatments'),  treatmentsController.show);
    //Agragar y actualizar tratamientos.
    router.post('/treatments',  grantAccess('createAny', 'treatments'), treatmentsController.add);
    router.put('/treatments/:id',  grantAccess('updateAny', 'treatments'), treatmentsController.update);
    //Eliminar tratamiento
    router.delete('/treatments/:id', grantAccess('deleteAny', 'treatments'),treatmentsController.delete);
    //Rutas para las imagenes.
    router.post('/images',  grantAccess('createAny', 'images'), imagesController.fileUpload, imagesController.add);
    


    ///Rutas para la INFORMACION de inicio del frontend
    //Buscar todos o por ID.
    router.get('/information', grantAccess('readAny', 'information'), informationHome.list);
    router.get('/information/:id', grantAccess('readAny', 'treatments'), informationHome.show);
    //Agragar y actualizar tratamientos.
    router.post('/information', grantAccess('createAny', 'treatments'), informationHome.add);
    router.put('/information/:id', grantAccess('updateAny', 'treatments'), informationHome.update);
    //Eliminar tratamiento
    router.delete('/information/:id', grantAccess('deleteAny', 'treatments'), informationHome.delete);
    //Rutas para las imagenes.
    router.post('/images-information', grantAccess('readAny', 'images-information'), imagesController.fileUpload, imageInformationHome.add);


    //Estas rutas son paras los usuarios. Pero estan protegidas
    //Solo se podran ejecutar si hay un usuario logueado con su teken.
    router.get('/usuarios', grantAccess('readAny', 'usuarios'), usuariosController.list);
    router.get('/usuarios/:id', grantAccess('readAny', 'usuarios'), usuariosController.show);
    router.get('/perfil', grantAccess('readOwn', 'perfil'), usuariosController.profile);

    return router;
}

