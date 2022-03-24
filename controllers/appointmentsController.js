const res = require('express/lib/response');
const { Appointment } = require('../models');
const { Op } = require("sequelize")
//CRUD.
 
//Agregar cista.
exports.add = async(req, res, next) => {
    try {
        const citasData = {...req.body};

        const appointment = await Appointment.create(citasData);
        res.json({
            message: "Cita registrada.",
            appointment,
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
            message: "Error al registrar cita.",
            errors: errores,
        });
    }
};

//Actualizar cita.
exports.update = async(req, res, next) => {
    try {
        const actualizaCita = {...req.body};

        await Appointment.update(actualizaCita,{
            where: {
                id:req.params.id,
            },
        });
        res.json({
            message: "Cita actualizado",
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

//Mostrar la informacion de citas en la tabla.
exports.list = async (req, res, next) => {
    try {
        const appointments = await Appointment.findAll({
            include: ['customerinfo'],
        });
        res.json(appointments);
    } catch (error) {
        res.status().json({
            message: 'Error al leer, las citas.',
        });
        
    }
};

//Listar citas por ID.
exports.show = async(req, res, next) => {
    try {
        const appointments = await Appointment.findOne({
           where: {
               id: req.params.id,
           },
           include: ['customerinfo'],
        });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({
            message: "Error al encontrar al usuario.",
        });
    }
};

//Funcion para buscar informacion de una cita.
//Datoas a buscar
/*
"treatment": "Ortodoncia",
        "description": "algo",
        "type": "Aulto",
        "gender": "Masculino",
        "date": "{{currentDate}}",
        "customerId
*/
exports.search_appointment = async (req, res, next) => {
    try {
        console.log(req.query);
        const appointments = await Appointment.findAll({
            where: {
                [Op.or]: [
                    { 
                        treatment:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        description:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        type:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        gender:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                    {
                        customerId:{
                            [Op.like]: `%${req.query.q.toLowerCase()}%`
                        },
                    },
                ]
            },
            include: ['customerinfo'],
        });
        res.json({busqueda: appointments})
        
    } catch (error) {
        res.status(500).json({
            message: 'Erro al buscar informacion de esta cita.',
        });
        
    }
};

//Eliminar información de citas.
exports.delete = async(req, res, next) => {
    try {
        await Appointment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json({
            message: 'Cita, eliminada.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro al eliminar cita.',
        });
    }
};
