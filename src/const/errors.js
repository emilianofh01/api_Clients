/**
 * Modulo para exportar contasnte para mensajes de error
 */
module.exports =  {
    // Mensaje de error para el dato nombre vacio
    'EmptyNameField': {
        code: 400,
        message: 'The name is a required attribute'
    },

    // Mensaje de error para el dato de correo electrónico
    'EmptyEmailField': {
        code: 400,
        message: 'Enter a valid email address'
    },

    // Mensaje de error cuando no se encuentra un usuario
    'ClientNotFound': {
        code: 404,
        message: "This user does not exist"
    },

    // Mensaje de error cuando se intenta registrar un correo electrónico ya existente
    'EmailAlreadyRegistered': {
        code: 409,
        message: 'This email is already registered'
    }
}