const res = require('express/lib/response');
const { Category } = require('../models');

//CRUD para el apartado de categorias que tendra este backend.

//Add Category
exports.add = async (req, res, next) => {
    try {
        const categoriaData = {...req.body};
        
        const categoria = await Category.create(categoriaData);
        res.json({
            message: "Categoria registrada.",
            categoria,
        });

    } catch (error) {
        let errores = [];
        if(error. errors){
            errores = error.errors.map((errorItem) => ({
                error: errorItem.message,
                field: errorItem.field,
            }));
        }
        res.status(500).json({
            message: 'Error, al agregar categoria.',
            errors: errores,
        });
    }
};

//Update Category
exports.update = async (req, res, next) => {
    try {
        const categoriaData = {...req.body};

      await Category.update(categoriaData, {
            where: {
                id: req.params.id,
            },
        });
        res.json({
            message: "Categoria Actualizada."
        });
    } catch (error) {
        let errores = [];
        if(error. errors){
            errores = error.errors.map((errorItem) => ({
                error: errorItem.message,
                field: errorItem.field,
            }));
        }
        res.status(500).json({
            message: 'Error, al actualizar categoría.',
            errors: errores,
        });
    }
};

//Show Category
exports.list = async (req, res, next) => {
    try {
     
     const categoria = await Category.findAll({
         include: ['customers']
     });
     res.json(categoria); 

    } catch (error) {
        res.status(500).json({
            message: 'Error, al mostrar categorías.'
        });
    }
};

//Show Category By Id.
exports.show = async (req, res, next ) => {
    try {
        const categoria = await Category.findOne({
            where: {
                id: req.params.id,
            },
        include: ['customers']
        });
        res.json(categoria); 

    } catch (error) {
        res.status(500).json({
            message: 'Erros, al mostrar categoría.'
        });
    }
};

//Delete Category
exports.delete = async (req, res, next ) => {
    try {
        await Category.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.json({
            message: 'Categoría, eliminada.'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar categoría.'
        });
    }
};
