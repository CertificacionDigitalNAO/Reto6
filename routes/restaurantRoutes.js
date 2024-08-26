/**
 * @fileoverview Definición de las rutas de la API REST. Se especifican los endpoints y se conectan con los controladores correspondientes.
 */

const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

/* Ciclo ID 2 - CRUD para restaurantes */

/**
 * @route GET /
 * @description Obtener todos los restaurantes
 * @access Public
 */
router.get("/", restaurantController.getAllRestaurants);

/**
 * @route POST /
 * @description Crear un nuevo restaurante
 * @access Public
 */
router.post("/", restaurantController.createRestaurant);

/**
 * @route PUT /:id
 * @description Actualizar un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante a actualizar
 */
router.put("/:id", restaurantController.updateRestaurant);

/**
 * @route DELETE /:id
 * @description Eliminar un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante a eliminar
 */
router.delete("/:id", restaurantController.deleteRestaurant);

/* Endpoints para Comentarios de Restaurantes */

/**
 * @route GET /:id/comments
 * @description Obtener todos los comentarios de un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante
 */
router.get("/:id/comments", restaurantController.getAllCommentsById);

/**
 * @route PUT /:id/comments/:commentId
 * @description Actualizar un comentario de un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante
 * @param {string} commentId - El ID del comentario
 */
router.put("/:id/comments/:commentId", restaurantController.updateCommentById);

/**
 * @route POST /:id/comments
 * @description Agregar un comentario a un restaurante
 * @access Public
 * @param {string} id - El ID del restaurante
 */
router.post("/:id/comments", restaurantController.addComment);

/**
 * @route DELETE /:id/comments/:commentId
 * @description Eliminar un comentario de un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante
 * @param {string} commentId - El ID del comentario
 */
router.delete(
  "/:id/comments/:commentId",
  restaurantController.deleteCommentById
);
module.exports = router;

/* Endpoints para Calificaciones de Restaurantes */

/**
 * @route GET /:id/grades
 * @description Obtener todas las calificaciones de un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante
 */
router.get("/:id/grades", restaurantController.getGradesByRestaurantId);

/**
 * @route PUT /:id/grades/:gradeId
 * @description Actualizar una calificación de un restaurante por ID
 * @access Public
 * @param {string} id - El ID del restaurante
 * @param {string} gradeId - El ID de la calificación
 */
router.put("/:id/grades/:gradeId", restaurantController.updateGradeById);
