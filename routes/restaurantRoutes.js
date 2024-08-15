/**
 * @fileoverview Definición de las rutas de la API REST. Se especifican los endpoints y se conectan con los controladores correspondientes.
 */

const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

/**
 * @route GET /
 * @description Obtener todos los restaurantes
 * @access Public
 */
router.get('/', restaurantController.getAllRestaurants);

/**
 * @route POST /
 * @description Crear un nuevo restaurante
 * @access Public
 */
router.post('/', restaurantController.createRestaurant);

/**
 * @route PUT /:id
 * @description Actualizar un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante a actualizar
 */
router.put('/:id', restaurantController.updateRestaurant);

module.exports = router;