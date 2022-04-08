const { roles } = require('../config/role');

/**
 * función para validar el permiso del usuario actual sobre el recurso indicado
 */

/*
 * Codigo extraido, del repositorio del profesor.
 */
 exports.grantAccess = (accion, recurso) => 
 async (request, response, next) => {
   try {
    console.log(request.user);

     // permiso
     const permiso = roles().can(request.user.rol)[accion](recurso);

     if (!permiso.granted) {
       return response.status(403).json({
         message: 'No autorizado para realizar esta acción.',
       });
     }

     return next(); // continue con el proceso del request
   } catch (error) {
     return next(error);
   }
};