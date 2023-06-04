import { Router } from "express";
import {
  getRestaurantById,
  getRestaurantsByCountryAndCityName,
} from "../controllers/restaurant";

const restaurantRouter = Router();

restaurantRouter.get(
  "/all/:countryName/:cityName",
  getRestaurantsByCountryAndCityName
);

restaurantRouter.get("/:id", getRestaurantById);

export { restaurantRouter };
