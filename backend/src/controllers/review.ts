import { Request, Response } from "express";
import { getReviewsByRestaurantIdFromDb } from "../models/review";

const getReviewsByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const result = await getReviewsByRestaurantIdFromDb(
    parseInt(restaurantId, 10)
  );
  res.send(result);
};

export { getReviewsByRestaurantId };
