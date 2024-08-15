/**
 * @fileoverview Configuración y conexión a MongoDB usando Mongoose.
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Conecta a la base de datos MongoDB.
 * @async
 * @function connectDB
 * @returns {Promise<void>} - Devuelve una promesa que resuelve cuando la conexión es exitosa o se rechaza en caso de error.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión a MongoDB exitosa...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
