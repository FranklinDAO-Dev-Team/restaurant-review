import { Request, Response } from "express";
import { getRestaurantsByCityIdFromDb } from "../models/restaurant";

const getRestaurantsByCityId = async (req: Request, res: Response) => {
  const { cityId } = req.params;
  const result = await getRestaurantsByCityIdFromDb(parseInt(cityId, 10));
  res.send(result);
};

export { getRestaurantsByCityId };
