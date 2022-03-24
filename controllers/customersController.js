const res = require('express/lib/response');
const { Op }  = require("sequelize");
const { Customer } = require('../models');
//CRUD.

//Agregar cliente.
exports.add = async(req, res, next) => {
    try {
        const clienteData = {...req.body};

        const customer = await Customer.create(clienteData);
        res.json({
            message: "Cliente registardo",
            customer,
        });
    } catch (error) {
        let errores = [];
        if (error. errors){
            errores = error.errors.map((errorItem) => ({
                error: errorItem.message,
                field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: "Error al registrar cliente.",
            errors: errores,
        });
    }
};

//Actualizar Clientes.
exports.update = async(req, res, next) => {
    try {
        const actualizaCliente = {...req.body};

        await Customer.update(actualizaCliente,{
            where: {
                id:req.params.id,
            },
        });
        res.json({
            message: "Cliente actualizado",
        });

    } catch (error) {
        let errores = [];
        if (error. errors){
            errores = error.errors.map((errorItem) => ({
                error: errorItem.message,
                field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: "Información no actualizada.",
            errors: errores,
        });
    }
};

//Mostrar a los usuarios en la tabla.
exports.list = async (req, res, next) => {
    try {
        const customers = await Customer.findAll({
            include: ['category', 'appointments'],
        });
        res.json(customers);
    } catch (error) {
        res.status().json({
            message: 'Error al leer, los clientes',
        });
        
    }
};

//Listar clientes por ID.
exports.show = async(req, res, next) => {
    try {
        const customers = await Customer.findOne({
           where: {
               id: req.params.id,
           },
           include: ['category','appointments'], 
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({
            message: "Error al encontrar al usuario.",
        });
    }
};

//Funcion de filtrar. Usuarios por Categoria.
exports.filtrar = async (req, res, next ) => {
    try {
        const customers = await Customer.findAll({
            where: {
                categoryId: req.body.category,
            },
            include: ['category']
        });
        res.json({resultados: customers})
    } catch (error) {
        res.status.json({
            message: 'Error al filtrar la información.'
        });
        
    }
};

//Funcion para buscar la informacion de algun usuario.
exports.search = async (req, res, next) => {
    try {
        console.log(req.query);

        const customers = await Customer.findAll({
            where :{
                [Op.or]: [
                    {
                        name:{
                            [Op.like]:`%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        email:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        phone:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        age:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                ]
            },
            include: ['category', 'appointments'],
        });
        res.json({resultados:customers});
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar cliente.',
        });
    }
};

//Eliminar información de clientes.
exports.delete = async(req, res, next) => {
    try {
        await Customer.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.json({
            message: 'Cliente, eliminada.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro al eliminar cliente.',
        });
    }
};
