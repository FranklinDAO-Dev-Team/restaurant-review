import { Router } from "express";
import { getRestaurantsByCityId } from "../controllers/restaurant";

const restaurantRouter = Router();

restaurantRouter.get("/:cityId", getRestaurantsByCityId);

export { restaurantRouter };
