const Restaurant = require("../models/restaurant")

//Obtener todos los restaurantes
exports.getRestaurants = async (req, res) => {
  const { limit = 6, from = 0 } = req.query;
  const restaurants = await Restaurant.find()
    .skip(Number(from))
    .limit(Number(limit));

  const total = await Restaurant.countDocuments();

  res.json({
    total,
    restaurants,
  });
};

////Busqueda de restaurante
exports.getRestaurantsById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el restaurante por su ID
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurante no encontrado" });
    }

    res.json({
      restaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el restaurante" });
  }
};

//eliminar restaurante
exports.deleteRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el restaurante por su ID y eliminarlo
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurante no encontrado" });
    }

    res.json({
      message: "Restaurante eliminado exitosamente",
      restaurant: deletedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el restaurante" });
  }
};

//Agregar un nuevo restaurante
exports.addNewRestaurant = async (req = request, res = response) => {
  const body = req.body;
  const restaurant = new Restaurant(body);

  // Validar que el restaurante no existe en la DB
  const restaurant_id = req.body.restaurant_id;
  const restaurantExists = await Restaurant.findOne({ restaurant_id });
  if (restaurantExists) {
    return res.status(400).json({
      msg: "El restaurante ya se encuentra en la base de datos.",
    });
  }

  await restaurant.save();

  res.json({
    restaurant,
  });
};

//AGREGAR UN COMENTARIO
exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { comment, date } = req.body;
  try {
      const restaurant = await Restaurant.findOneAndUpdate(
          {restaurant_id: id},
          { $push: { comments: { comment, date } } },
          { new: true }
          );

    if (!restaurant) {
      return res.status(404).json({
        msg: "Restaurante no encontrado",
      });
    }

    res.json({
      restaurant,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error al enviar el comentario.");
  }
};

//AGREGAR VALORACION
exports.addScore = async(req, res) => {
    const { id } = req.params;
    const { date, grade, score } = req.body;
    try {
        const restaurant = await Restaurant.findOneAndUpdate(
            {restaurant_id: id},
            { $push: { grades: {date, grade, score} } },
            { new: true }
            );
  
      if (!restaurant) {
        return res.status(404).json({
          msg: "Restaurante no encontrado",
        });
      }
  
      res.json({
        restaurant,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al enviar la puntuación.'
      })
      throw new Error("Error al enviar la puntuación.");
    }

}

//FILTROS DE BUSQUEDA
exports.getRestaurantStages = async (req, res) => {
  const { borough, cuisine, sortBy, longitude, latitude } = req.body;

  // Construir el pipeline de agregación basado en los filtros recibidos
  const pipeline = [];

  // Agregar etapa de geolocalización si se proporcionan las coordenadas de ubicación
  if (longitude && latitude) {
    const location = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)] 
    };
    pipeline.push({
      $geoNear: {
        near: location,
        distanceField: "distance",
        maxDistance: 5000, // 5 km en metros
        spherical: true,
      },
    });
  }

  // Filtro por borough y cuisine (si están presentes en la solicitud)
  if (borough) {
    pipeline.push({ $match: { borough } });
  }
  if (cuisine) {
    pipeline.push({ $match: { cuisine } });
  }

  // Agregar el operador $project para dar forma a la salida
  const projectFields = {
    name: 1,
    borough: 1,
    cuisine: 1,
    grades: 1,
  };
  pipeline.push({ $project: projectFields });

  // Ordenar los resultados (si sortBy está presente en la solicitud)
  if (sortBy) {
    const sortField = sortBy.startsWith("-") ? sortBy.slice(1) : sortBy;
    const sortOrder = sortBy.startsWith("-") ? -1 : 1;
    pipeline.push({ $sort: { [sortField]: sortOrder } });
  }

  try {
    const restaurant = await Restaurant.aggregate(pipeline);
    res.json({ restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar restaurantes." });
  }
};