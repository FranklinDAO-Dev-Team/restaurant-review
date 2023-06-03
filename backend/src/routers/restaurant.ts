import { Router } from "express";
import { getRestaurantsByCountryAndCityName } from "../controllers/restaurant";

const restaurantRouter = Router();

restaurantRouter.get(
  "/:countryName/:cityName",
  getRestaurantsByCountryAndCityName
);

export { restaurantRouter };
