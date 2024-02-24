const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    // Obtener los errores de validación de la solicitud
    const errors = validationResult(req);

    // Verificar si hay errores de validación
    if (!errors.isEmpty()) {
        let messages = errors.array().map((error) => error.msg);
        next(messages);
    }

    next();
  };
