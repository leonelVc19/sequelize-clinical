const res = require('express/lib/response');
const { Treatment } = require('../models');
const { Op } = require("sequelize")
//CRUD.
 
//Agregar cista.
exports.add = async(req, res, next) => {
    try {
        const tratamientoData = {...req.body};

        const treatment = await Treatment.create(tratamientoData);
        res.json({
            message: "Tratamiento registrado.",
            treatment,
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
            message: "Error al registrar tratamiento.",
            errors: errores,
        });
    }
};

//Actualizar cita.
exports.update = async(req, res, next) => {
    try {
        const tratamientoData = {...req.body};

        await Treatment.update(tratamientoData,{
            where: {
                id:req.params.id,
            },
        });
        res.json({
            message: "Tratamiento actualizado",
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
        const treatment = await Treatment.findAll({
            include: ['images'],
        });
        res.json(treatment);
    } catch (error) {
        res.status().json({
            message: 'Error al leer, los tratamiento.',
        });
        
    }
};

//Listar citas por ID.
exports.show = async(req, res, next) => {
    try {
        const treatment = await Treatment.findOne({
           where: {
               id: req.params.id,
           },
           include: ['images'],
        });
        res.json(treatment);
    } catch (error) {
        res.status(500).json({
            message: "Error al encontrar el tratamiento.",
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
*/
//Eliminar información de citas.
exports.delete = async(req, res, next) => {
    try {
        await Treatment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json({
            message: 'Tratamiento, eliminada.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro al tratamiento cita.',
        });
    }
};
