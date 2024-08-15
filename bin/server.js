/**
 * @fileoverview Archivo de entrada principal para iniciar el servidor Express.
 */

const express = require("express");
const connectDB = require("../config/db");

// Conectar a la base de datos
connectDB();

const app = express();

/**
 * Middleware para parsear JSON.
 * @name useJsonMiddleware
 * @function
 * @memberof module:express
 */
app.use(express.json());

/**
 * Definir rutas para la API de restaurantes.
 * @name useRestaurantRoutes
 * @function
 * @memberof module:express
 */
app.use("/api/restaurants", require("../routes/restaurantRoutes"));

/**
 * Iniciar el servidor en el puerto especificado.
 * @name listen
 * @function
 * @memberof module:express
 * @param {number} PORT - El puerto en el que el servidor escuchará las solicitudes.
 * @param {function} callback - Función de callback que se ejecuta cuando el servidor está en funcionamiento.
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
