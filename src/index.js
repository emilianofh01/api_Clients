/**
 * Configuracion de la api
 */
const express = require("express");
const app = require("./app/app");
const global = require("./const/global");
const globalRoutes = require("./routes/index.route");
const createHttpError = require("http-errors");
const error = require("./database/middleware/error");
const cors = require("cors");
/**
 * Configuración de la API para permitir la recepción de JSON y formularios
 */
const config_api = () => {
  app.use(express.json()); // Se permite a la api recibir json
  app.use(express.urlencoded({ extended: true })); // Se permite a la api recibir formularios
};

/**
 * Configuración de la rutas globales de la API
 */
const config_route = () => {
  app.use("/api/", globalRoutes.init_routes());

  // Gestión para manejar rutas no encontradas
  app.use((req, res, next) => {
    return next(createHttpError(404));
  });

  // Manejo de errores generales
  app.use(error);
};

/**
 * Inicialización de la API
 */
const init = () => {
  app.use(
    cors({
      origin: "*",
    })
  );
  config_api();
  config_route();

  app.listen(global.PORT, () => {
    console.log(`--------------------- Servidor en puerto: ${global.PORT} `);
  });
};

// Inicia la ejecución de la API
init();
