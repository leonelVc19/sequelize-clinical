const express = require('express');

const router = express.Router();

const sesionController = require('../controllers/Session/SesionController');
const usuariosController = require('../controllers/Session/UsuariosController');
const passwordController = require('../controllers/Session/PasswordController');
//rutasNoProtegidas

module.exports = function() {
  // rutas que no requieren autenticacion
  router.post('/login', sesionController.login);
  router.post('/users', usuariosController.add);
  router.post('/recuperar-password', passwordController.resetPassword);
  router.post('/validar-token', passwordController.validationToken);
  router.post('/actualizar-password', passwordController.SaveNewPassword);
  return router;
};