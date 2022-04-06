const express = require('express');
const router = express.Router();

//Importación de los controllers para las acciones.
const customersController = require('./controllers/customersController');

const appointmentsController = require('./controllers/appointmentsController');

const categoriesController = require('./controllers/categoriesController');

const ordersController = require('./controllers/ordersController');

const treatmentsController = require('./controllers/treatmentsController');
const imagesController = require('./controllers/imagesController');

const informationHome = require('./controllers/infomationHome');
const imageInformationHome = require('./controllers/imageInformationController');


//IMPORTAR RUTAS DE USUARIOS.
const usuariosController = require('./controllers/Session/UsuariosController');
module.exports = () => {
    //Rutas de customers.
    //Mostrar todos los registros y por id
    router.get('/customers', customersController.list);
    router.get('/customers/:id', customersController.show);
    //Agregar un resgistro nuevo y actualizar resgistros
    router.post('/customers', customersController.add);
    router.put('/customers/:id', customersController.update);
    //Eliminar registros
    router.delete('/customers/:id', customersController.delete);
    //Filtar a los clientes.
    //Buscar a cliente. 
    router.get('/search', customersController.search);
    //Filtrar a los usuarios por categoria
    router.post('/filtrar', customersController.filtrar);
    

    //Rutas para las citas.
    //Mostrar todos los registros y por id
    router.get('/appointments', appointmentsController.list);
    router.get('/appointments/:id', appointmentsController.show);
    //Agregar un resgistro nuevo y actualizar resgistros
    router.post('/appointments', appointmentsController.add);
    router.put('/appointments/:id',appointmentsController.update);
    //Eliminar registros
    router.delete('/appointments/:id',appointmentsController.delete);
    //Buscar información de una cita
    router.get('/search_appointment', appointmentsController.search_appointment);

    

    //Rutas para categorias.
    //Mostrar todas las categorias que esten es la base de datos.
    router.get('/categories', categoriesController.list);
    //Mostrar categoria por id
    router.get('/categories/:id', categoriesController.show);
    //Agregar y actualizar categorías.
    router.post('/categories', categoriesController.add);
    router.put('/categories/:id', categoriesController.update);
    //Eliminar categorias.
    router.delete('/categories/:id', categoriesController.delete);




    //Rutas para las ordenes.
    //Mostrar a todas las ordenes de pago
    router.get('/orders', ordersController.list);
    //Mostrar orden opr id.
    router.get('/orders/:id', ordersController.show);
    //Agregar orden y actualizar la misma.
    router.post('/orders', ordersController.add);
    router.put('/orders/:id', ordersController.update);
    //eliminar orden
    router.delete('/orders/:id', ordersController.delete)
    //Buscar orden
    router.get('/search_orders', ordersController.search);
    


    //Tratamientos.
    //Buscar todos o por ID.
    router.get('/treatments', treatmentsController.list);
    router.get('/treatments/:id', treatmentsController.show);
    //Agragar y actualizar tratamientos.
    router.post('/treatments', treatmentsController.add);
    router.put('/treatments/:id', treatmentsController.update);
    //Eliminar tratamiento
    router.delete('/treatments/:id', treatmentsController.delete);
    //Rutas para las imagenes.
    router.post('/images', imagesController.fileUpload, imagesController.add);
    


    ///Rutas para la INFORMACION de inicio del frontend
    //Buscar todos o por ID.
    router.get('/information', informationHome.list);
    router.get('/information/:id', informationHome.show);
    //Agragar y actualizar tratamientos.
    router.post('/information', informationHome.add);
    router.put('/information/:id', informationHome.update);
    //Eliminar tratamiento
    router.delete('/information/:id', informationHome.delete);
    //Rutas para las imagenes.
    router.post('/images-information', imagesController.fileUpload, imageInformationHome.add);


    //Estas rutas son paras los usuarios. Pero estan protegidas
    //Solo se podran ejecutar si hay un usuario logueado con su teken.
    router.get('/usuarios',  usuariosController.list);
    router.get('/usuarios/:id',  usuariosController.show);
  
    //router.get('/perfil', grantAccess('readOwn', 'perfil'), usuariosController.perfil);

    return router;
}

