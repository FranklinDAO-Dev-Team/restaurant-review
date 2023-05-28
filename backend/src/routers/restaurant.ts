import { Router } from "express";
import {
  getTopRestaurants,
  getTopRestaurantsByCountryAndCity,
} from "../controllers/restaurant";

const restaurantRouter = Router();

restaurantRouter.get("/top", getTopRestaurants);

restaurantRouter.get("/:country/:city/top", getTopRestaurantsByCountryAndCity);

export { restaurantRouter };
