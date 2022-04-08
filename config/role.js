const AccessControl = require('accesscontrol');

const ac = new AccessControl();

/*En esta parte se colocaron los perfiles
que tendra mi parte de actividad
Juan Leonel.
*/

exports.roles = () =>  {
    //Aca todos los roles que tendra la aplicacion
    ac.grant('ninguno'); ///Sin permisos alguno

    ac.grant('user')
        .readOwn(['perfil'])
        .readAny(['treatments', 'information']);
    
    ac.grant('admin')
        .extend('user')
        .readAny(['customers', 'appointments','categories', 'orders', 'treatments','images', 'information', 'images-information', 'usuarios'])
        .createAny(['customers', 'appointments','categories', 'orders', 'treatments','images', 'information', 'images-information', 'usuarios'])
        .updateAny(['customers', 'appointments','categories', 'orders', 'treatments','images', 'information', 'images-information', 'usuarios']);
    
    ac.grant('super')
        .extend('admin')
        .deleteAny(['customers', 'appointments','categories', 'orders', 'treatments', 'information', 'images-information', 'usuarios']);

    return ac;
};