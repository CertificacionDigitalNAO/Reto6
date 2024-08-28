/**
 * @fileoverview Definición de las rutas de la API REST. Se especifican los endpoints y se conectan con los controladores correspondientes.
 */

const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

/* Ciclo ID 2 - CRUD para restaurantes */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Obtener todos los restaurantes
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de restaurantes por página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de la página actual
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: "-createdAt"
 *         description: Campo por el cual ordenar los resultados
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Número total de restaurantes
 *                 page:
 *                   type: integer
 *                   description: Número de la página actual
 *                 pages:
 *                   type: integer
 *                   description: Número total de páginas
 *                 limit:
 *                   type: integer
 *                   description: Número de restaurantes por página
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID del restaurante
 *                       name:
 *                         type: string
 *                         description: Nombre del restaurante
 *                       address:
 *                         type: string
 *                         description: Dirección del restaurante
 *                       cuisine:
 *                         type: string
 *                         description: Tipo de cocina del restaurante
 *       500:
 *         description: Error del servidor
 */
router.get("/", restaurantController.getAllRestaurants);

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Crear un nuevo restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del restaurante
 *                 example: "Restaurante Ejemplo"
 *               address:
 *                 type: string
 *                 description: Dirección del restaurante
 *                 example: "123 Calle Principal"
 *               cuisine:
 *                 type: string
 *                 description: Tipo de cocina del restaurante
 *                 example: "Italiana"
 *     responses:
 *       201:
 *         description: Restaurante creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del restaurante
 *                 name:
 *                   type: string
 *                   description: Nombre del restaurante
 *                 address:
 *                   type: string
 *                   description: Dirección del restaurante
 *                 cuisine:
 *                   type: string
 *                   description: Tipo de cocina del restaurante
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post("/", restaurantController.createRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Actualizar un restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: object
 *                 properties:
 *                   building:
 *                     type: string
 *                   coord:
 *                     type: array
 *                     items:
 *                       type: number
 *                   street:
 *                     type: string
 *                   zipcode:
 *                     type: string
 *               borough:
 *                 type: string
 *               cuisine:
 *                 type: string
 *               grades:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     grade:
 *                       type: string
 *                     score:
 *                       type: number
 *               name:
 *                 type: string
 *               restaurant_id:
 *                 type: string
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Restaurante actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 address:
 *                   type: object
 *                   properties:
 *                     building:
 *                       type: string
 *                     coord:
 *                       type: array
 *                       items:
 *                         type: number
 *                     street:
 *                       type: string
 *                     zipcode:
 *                       type: string
 *                 borough:
 *                   type: string
 *                 cuisine:
 *                   type: string
 *                 grades:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       grade:
 *                         type: string
 *                       score:
 *                         type: number
 *                 name:
 *                   type: string
 *                 restaurant_id:
 *                   type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al actualizar el restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put("/:id", restaurantController.updateRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Eliminar un restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante a eliminar
 *     responses:
 *       200:
 *         description: Restaurante eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al eliminar el restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.delete("/:id", restaurantController.deleteRestaurant);

/* Endpoints para Comentarios de Restaurantes */

/**
 * @swagger
 * /restaurants/{id}/comments:
 *   get:
 *     summary: Obtener todos los comentarios de un restaurante por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                   comment:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al obtener los comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/:id/comments", restaurantController.getAllCommentsById);

/**
 * @swagger
 * /restaurants/{id}/comments/{commentId}:
 *   put:
 *     summary: Actualizar un comentario de un restaurante por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Comentario actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 comment:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Restaurante o comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al actualizar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put("/:id/comments/:commentId", restaurantController.updateCommentById);

/**
 * @swagger
 * /restaurants/{id}/comments:
 *   post:
 *     summary: Agregar un comentario a un restaurante
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Comentario agregado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 comment:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al agregar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/:id/comments", restaurantController.addComment);

/**
 * @swagger
 * /restaurants/{id}/comments/{commentId}:
 *   delete:
 *     summary: Eliminar un comentario de un restaurante por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Restaurante o comentario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al eliminar el comentario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.delete(
  "/:id/comments/:commentId",
  restaurantController.deleteCommentById
);

/* Endpoints para Calificaciones de Restaurantes */

/**
 * @swagger
 * /restaurants/{id}/grades:
 *   get:
 *     summary: Obtener todas las calificaciones de un restaurante por ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *     responses:
 *       200:
 *         description: Lista de calificaciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   grade:
 *                     type: string
 *                   score:
 *                     type: number
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al obtener las calificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.get("/:id/grades", restaurantController.getGradesByRestaurantId);

/**
 * @swagger
 * /restaurants/{id}/grades/{gradeId}:
 *   put:
 *     summary: Actualizar una calificación de un restaurante por ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la calificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               grade:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Calificación actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 grade:
 *                   type: string
 *                 score:
 *                   type: number
 *       404:
 *         description: Restaurante o calificación no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al actualizar la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put("/:id/grades/:gradeId", restaurantController.updateGradeById);

/**
 * @swagger
 * /restaurants/{id}/grades/{gradeId}:
 *   delete:
 *     summary: Eliminar una calificación de un restaurante por ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la calificación
 *     responses:
 *       200:
 *         description: Calificación eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Restaurante o calificación no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al eliminar la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.delete("/:id/grades/:gradeId", restaurantController.deleteGradeById);

/**
 * @swagger
 * /restaurants/{id}/grades:
 *   post:
 *     summary: Agregar una calificación a un restaurante por ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del restaurante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               grade:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Calificación agregada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 grade:
 *                   type: string
 *                 score:
 *                   type: number
 *       404:
 *         description: Restaurante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al agregar la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post("/:id/grades", restaurantController.addGrade);

/**
 * @swagger
 * /restaurants/search:
 *   get:
 *     summary: Busca y ordena restaurantes según los filtros proporcionados y la proximidad geográfica.
 *     tags:
 *       - Restaurantes
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del restaurante a buscar.
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: Tipo de cocina del restaurante a buscar.
 *       - in: query
 *         name: borough
 *         schema:
 *           type: string
 *         description: Distrito del restaurante a buscar.
 *       - in: query
 *         name: lng
 *         schema:
 *           type: string
 *         description: Longitud para la búsqueda por proximidad.
 *       - in: query
 *         name: lat
 *         schema:
 *           type: string
 *         description: Latitud para la búsqueda por proximidad.
 *     responses:
 *       200:
 *         description: Lista de restaurantes que coinciden con los filtros y la proximidad.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nombre del restaurante.
 *                   cuisine:
 *                     type: string
 *                     description: Tipo de cocina del restaurante.
 *                   borough:
 *                     type: string
 *                     description: Distrito del restaurante.
 *                   address:
 *                     type: object
 *                     properties:
 *                       coord:
 *                         type: array
 *                         items:
 *                           type: number
 *                         description: Coordenadas del restaurante.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/search", restaurantController.searchAndSortRestaurants);

module.exports = router;
