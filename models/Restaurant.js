/**
 * @fileoverview Esquema de la colección de restaurantes en MongoDB.
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} Address
 * @property {string} building - El número del edificio.
 * @property {string} street - El nombre de la calle.
 * @property {string} zipcode - El código postal.
 * @property {number[]} coord - Las coordenadas geográficas [longitud, latitud].
 */

/**
 * @typedef {Object} Grade
 * @property {Date} date - La fecha de la evaluación.
 * @property {number} score - La puntuación obtenida.
 */

/**
 * @typedef {Object} Comment
 * @property {Date} date - La fecha del comentario.
 * @property {string} comment - El contenido del comentario.
 * @property {mongoose.Schema.Types.ObjectId} _id - El identificador único del comentario.
 */

/**
 * @typedef {Object} Restaurant
 * @property {string} name - El nombre del restaurante.
 * @property {string} borough - El distrito donde se encuentra el restaurante.
 * @property {string} cuisine - El tipo de cocina que ofrece el restaurante.
 * @property {Address} address - La dirección del restaurante.
 * @property {Grade[]} grades - Las evaluaciones del restaurante.
 * @property {string} restaurant_id - El identificador del restaurante.
 * @property {Comment[]} comments - Los comentarios sobre el restaurante.
 */

/**
 * Esquema de la colección de restaurantes.
 * @type {mongoose.Schema<Restaurant>}
 */
const RestaurantSchema = new mongoose.Schema({
  name: String,
  borough: String,
  cuisine: String,
  address: {
    building: String,
    street: String,
    zipcode: String,
    coord: [Number],
  },
  grades: [
    {
      date: Date,
      score: Number,
    },
  ],
  restaurant_id: String,
  comments: [
    {
      date: Date,
      comment: String,
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],
});

/**
 * Modelo de la colección de restaurantes.
 * @type {mongoose.Model<Restaurant>}
 */
const Restaurant = mongoose.model("Restaurant", RestaurantSchema, 'restaurants');

module.exports = Restaurant;