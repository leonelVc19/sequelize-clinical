const res = require('express/lib/response');
const { informationHome } = require('../models');
//CRUD.
 
//Agregar .
exports.add = async(req, res, next) => {
    try {
        const informationData = {...req.body};

        const informationhome = await informationHome.create(informationData);
        res.json({
            message: "Información registrada.",
            informationhome,
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
            message: "Error al registrar información.",
            errors: errores,
        });
    }
};

//Actualizar .
exports.update = async(req, res, next) => {
    try {
        const informationData = {...req.body};

        await informationHome.update(informationData,{
            where: {
                id:req.params.id,
            },
        });
        res.json({
            message: "Información actualizada.",
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

//Mostrar la informacion de s en la tabla.
exports.list = async (req, res, next) => {
    try {
        const informationhome = await informationHome.findAll({
            include: ['images'],
        });
        res.json(informationhome);
    } catch (error) {
        res.status().json({
            message: 'Error al leer, la información.',
        });
        
    }
};

//Listar s por ID.
exports.show = async(req, res, next) => {
    try {
        const informationhome = await informationHome.findOne({
           where: {
               id: req.params.id,
           },
           include: ['images'],
        });
        res.json(informationhome);
    } catch (error) {
        res.status(500).json({
            message: "Error al encontrar, información.",
        });
    }
};



//Eliminar información de s.
exports.delete = async(req, res, next) => {
    try {
        await informationHome.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json({
            message: 'Información, eliminada.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro al eliminar información.',
        });
    }
};
