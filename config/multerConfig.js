const fs = require('fs');
const multer = require('multer');
const shortid = require('shortid');

/**
 * multer config for save file
 * @param {*} collection
 * @param {*} subFolder
 */
const multerConfig = () => {
  const config = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./uploads/`);
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, `${shortid.generate()}${extension}`);
      },
    }),
    fileFilter(req, file, cb) {
      // if file is not document, validate image only
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Formato de archivo no válido'));
      }
    },
  };

  return config;
};

module.exports = multerConfig;