const multerConfig = require('../config/multerConfig');
const multer = require('multer');
const { imageInformation } = require('../models');


// parámetro donde viene el archivo
const upload = multer(multerConfig()).single('file');

exports.fileUpload = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
};

//CRUD. //Agregar cista.
exports.add = async(req, res, next) => {
    try {
        const imageData = {...req.body};
         
        if (req.file && req.file.filename) {
            imageData.path = `${req.file.destination.substring(2)}${req.file.filename}`;
          }

        const image = await imageInformation.create(imageData);
        res.json({
            message: "Imagen registrado.",
            image,
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
            message: "Error al registrar imagen.",
            errors: errores,
        });
    }
};

//La demas partes de CRUD, estan pospuestas.