const restaurant = require("../controllers/restaurantController");
const router = require("express").Router();

router.get("/restaurante", restaurant.getRestaurants);

router.get("/restaurante/:id", restaurant.getRestaurantsById);

router.post("/restaurante", restaurant.addNewRestaurant);

router.delete("/restaurante/:id", restaurant.deleteRestaurantById);

router.patch("/comments/:id", restaurant.addComment);

router.patch("/scores/:id", restaurant.addScore);

router.post("/getRestaurante", restaurant.getRestaurantStages);

module.exports = router