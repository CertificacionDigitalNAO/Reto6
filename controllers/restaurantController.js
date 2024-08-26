/**
 * @fileoverview Lógica de los endpoints de la API REST, separando las operaciones de las rutas para mantener el código limpio y fácil de mantener.
 */

const Restaurant = require("../models/Restaurant");

/**
 * Obtener todos los restaurantes con paginación y ordenación (GET).
 * @async
 * @function getAllRestaurants
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Objeto que contiene los parámetros de consulta.
 * @param {string} [req.query.limit=10] - Número de documentos por página.
 * @param {string} [req.query.page=1] - Número de la página actual.
 * @param {string} [req.query.sort=-createdAt] - Campo por el cual ordenar los resultados.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con la lista de restaurantes o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.getAllRestaurants = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Número de documentos por página, por defecto 10
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const sort = req.query.sort || "-createdAt"; // Campo por el cual ordenar, por defecto -createdAt
    const skip = (page - 1) * limit;

    const restaurants = await Restaurant.find()
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total = await Restaurant.countDocuments();

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
      data: restaurants,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Crear un nuevo restaurante (POST).
 * @async
 * @function createRestaurant
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Objeto que contiene los datos del nuevo restaurante.
 * @param {string} req.body.name - Nombre del restaurante.
 * @param {string} req.body.address - Dirección del restaurante.
 * @param {string} req.body.cuisine - Tipo de cocina del restaurante.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con el nuevo restaurante creado o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.createRestaurant = async (req, res) => {
  const restaurant = new Restaurant(req.body);
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Actualizar un Restaurante (PUT).
 * @async
 * @function updateRestaurant
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - ID del restaurante a actualizar.
 * @param {Object} req.body - Objeto que contiene los datos actualizados del restaurante.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con el restaurante actualizado o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const updateData = req.body;

    // Encuentra el restaurante por ID y actualiza con los nuevos datos
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updateData,
      {
        new: true, // Devuelve el documento actualizado
        runValidators: true, // Ejecuta las validaciones del esquema
      }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el restaurante", error });
  }
};

/**
 * Eliminar un Restaurante (DELETE).
 * @async
 * @function deleteRestaurant
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - ID del restaurante a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con el restaurante eliminado o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Encuentra el restaurante por ID y elimina
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    res.status(200).json(deletedRestaurant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el restaurante", error });
  }
};

/* Operaciones CRUD para Comentarios de Restaurantes */

/**
 * Obtener todos los Comentarios de un Restaurante por ID (GET).
 * @async
 * @function getAllCommentsById
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - El ID del restaurante.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con los comentarios del restaurante o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.getAllCommentsById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).select(
      "comments"
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    res.status(200).json(restaurant.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Actualizar un Comentario de un Restaurante por ID (PUT).
 * @async
 * @function updateCommentById
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - El ID del restaurante.
 * @param {string} req.params.commentId - El ID del comentario.
 * @param {Object} req.body - Objeto que contiene los datos del comentario actualizado.
 * @param {string} req.body.comment - El contenido del comentario actualizado.
 * @param {Date} req.body.date - La fecha del comentario actualizado.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con el comentario actualizado o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.updateCommentById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const commentId = req.params.commentId;
    const { comment, date } = req.body;

    console.log(`Restaurant ID: ${restaurantId}`);
    console.log(`Comment ID: ${commentId}`);

    // Validación de entrada
    if (!comment || !date) {
      return res
        .status(400)
        .json({ message: "Datos incompletos para actualizar el comentario" });
    }

    // Encuentra el restaurante por ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    console.log(`Restaurant found: ${restaurant}`);

    // Encuentra el comentario por ID y actualiza los campos
    const commentToUpdate = restaurant.comments.id(commentId);
    if (!commentToUpdate) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    console.log(`Comment found: ${commentToUpdate}`);

    commentToUpdate.comment = comment;
    commentToUpdate.date = date;

    // Guarda el restaurante actualizado
    await restaurant.save();

    res.status(200).json(commentToUpdate);
  } catch (error) {
    console.error("Error al actualizar el comentario:", error); // Log del error completo
    res.status(500).json({
      message: "Error al actualizar el comentario",
      error: error.message,
    });
  }
};

/**
 * Agregar un comentario a un restaurante por ID (POST).
 * @async
 * @function addComment
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - El ID del restaurante.
 * @param {Object} req.body - Objeto que contiene los datos del comentario.
 * @param {string} req.body.comment - El contenido del comentario.
 * @param {Date} req.body.date - La fecha del comentario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con el comentario agregado o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.addComment = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { comment, date } = req.body;

    // Validación de entrada
    if (!comment || !date) {
      return res
        .status(400)
        .json({ message: "Datos incompletos para agregar el comentario" });
    }

    // Encuentra el restaurante por ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    // Agrega el nuevo comentario al array de comentarios
    restaurant.comments.push({ comment, date });

    // Guarda el restaurante actualizado
    await restaurant.save();

    res.status(201).json(restaurant.comments);
  } catch (error) {
    console.error("Error al agregar el comentario:", error); // Log del error completo
    res.status(500).json({
      message: "Error al agregar el comentario",
      error: error.message,
    });
  }
};

/**
 * Eliminar un Comentario de un Restaurante por ID (DELETE).
 * @async
 * @function deleteCommentById
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - El ID del restaurante.
 * @param {string} req.params.commentId - El ID del comentario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con el comentario eliminado o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.deleteCommentById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const commentId = req.params.commentId;

    // Encuentra el restaurante por ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    // Encuentra el comentario por ID y elimínalo usando el método pull
    const commentToDelete = restaurant.comments.id(commentId);
    if (!commentToDelete) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    restaurant.comments.pull(commentId);

    // Guarda el restaurante actualizado
    await restaurant.save();

    res.status(200).json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el comentario:", error); // Log del error completo
    res.status(500).json({
      message: "Error al eliminar el comentario",
      error: error.message,
    });
  }
};

/* Enpoints para Calificar Restaurantes */

/**
 * Obtener todas las Calificaciones de un Restaurante por ID (GET).
 * @async
 * @function getGradesByRestaurantId
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - El ID del restaurante.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con las calificaciones del restaurante o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.getGradesByRestaurantId = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    res.status(200).json(restaurant.grades);
  } catch (error) {
    console.error("Error al obtener las calificaciones:", error);
    res.status(500).json({
      message: "Error al obtener las calificaciones",
      error: error.message,
    });
  }
};

// Endpoint para Actualizar una Calificación de un Restaurante por ID (PUT)

/**
 * Actualizar una Calificación de un Restaurante por ID (PUT).
 * @async
 * @function updateGradeById
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Objeto que contiene los parámetros de la ruta.
 * @param {string} req.params.id - El ID del restaurante.
 * @param {string} req.params.gradeId - El ID de la calificación.
 * @param {Object} req.body - Objeto que contiene los datos de la calificación actualizada.
 * @param {number} req.body.score - La puntuación de la calificación.
 * @param {Date} req.body.date - La fecha de la calificación.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta JSON con la calificación actualizada o un mensaje de error.
 * @throws {Error} - Devuelve un mensaje de error en caso de fallo.
 */
exports.updateGradeById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const gradeId = req.params.gradeId;
    const { score, date } = req.body;

    // Validación de entrada
    if (score === undefined || !date) {
      return res
        .status(400)
        .json({ message: "Datos incompletos para actualizar la calificación" });
    }

    // Encuentra el restaurante por ID
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurante no encontrado" });
    }

    // Encuentra la calificación por ID y actualiza los campos
    const gradeToUpdate = restaurant.grades.id(gradeId);
    if (!gradeToUpdate) {
      return res.status(404).json({ message: "Calificación no encontrada" });
    }

    gradeToUpdate.score = score;
    gradeToUpdate.date = date;

    // Guarda el restaurante actualizado
    await restaurant.save();

    res.status(200).json(gradeToUpdate);
  } catch (error) {
    console.error("Error al actualizar la calificación:", error); // Log del error completo
    res.status(500).json({
      message: "Error al actualizar la calificación",
      error: error.message,
    });
  }
};
