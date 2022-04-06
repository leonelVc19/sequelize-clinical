const AccessControl = require('accesscontrol');

const ac = new AccessControl();

/*En esta parte se colocaron los perfiles
que tendra mi parte de actividad
Juan Leonel.
*/

exports.roles = () =>  {
    //Aca todos los roles que tendra la aplicacion
    return ac;
}