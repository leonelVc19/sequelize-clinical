const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Order } =  require('../models');

//CRUD ORDERS.

//ADD ORDER.
exports.add = async (req, res, next ) => {
    try {
        const orderData = {...req.body};

        const order = await Order.create(orderData);
        res.json({
            message: 'Orden creada.',
            order,
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
            message: 'Error al agregar Orden de pago.',
            errors: errores,
        });
    }
};

//UPDATE ORDER.
exports.update = async (req, res, next ) => {
    try {
        const orderUpData = {...req.body}
        await Order.update(orderUpData, {
            where: {
                id: req.params.id,
            },
        });
        res.json({
            message: 'Orden actualizada.',
        })
    } catch (error) {
        let errores = [];
        if (error. errors){
            errores = error.errors.map((errorItem) => ({
                error: errorItem.message,
                field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: 'Error al actualizar Orden de pago.',
            errors: errores,
        });
    }
};

//LIST ORDERS.
exports.list = async (req, res, next ) => {
    try {
        const orders = await Order.findAll({
            include:['appointmentsInfo'],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error al mostrar Ordenes de pago.',
        });
    }
};

//SHOW ORDER.
exports.show = async (req, res, next ) => {
    try {
        const orders = await Order.findOne({
            where: {
                id: req.params.id,
            },
            include:['appointmentsInfo'],
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error al mostrar Orden de pago.',
        });
    }
};

//SEARCH ORDER.
exports.search = async (req, res, next ) => {
    try {
        console.log(req.query);
            const orders = await Order.findAll({
                where: {
                    [Op.or]: [
                        {
                            payment:{
                                [Op.like]: `%${req.query.q.toLowerCase()}%`
                            },
                        },
                        {
                            appointmentId:{
                                [Op.like]: `%${req.query.q.toLowerCase()}%`
                            },
                        },
                    ]
                },
            });
        res.json({respuestas: orders});
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar Orden de pago.',
        });
    }
};

//DELETE ORDER.
exports.delete = async (req, res, next ) => {
    try {
        await Order.destroy({
            where:{
                id: req.params.id,
            }
        });
        res.json({
            message:'Informacion eliminada.'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar Orden de pago.',
        });
    }
};