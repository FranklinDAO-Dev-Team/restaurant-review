import { Router } from "express";
import { getReviewsByRestaurantId } from "../controllers/review";

const reviewRouter = Router();

reviewRouter.get("/:restaurantId", getReviewsByRestaurantId);

export { reviewRouter };
