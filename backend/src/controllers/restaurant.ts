import { Request, Response } from "express";
import {
  getTopRestaurantsByCountryAndCityFromDb,
  getTopRestaurantsFromDb,
} from "../models/restaurant";

const getTopRestaurants = async (req: Request, res: Response) => {
  const result = await getTopRestaurantsFromDb();
  res.send(result);
};

const getTopRestaurantsByCountryAndCity = async (
  req: Request,
  res: Response
) => {
  const { country, city } = req.params;
  const result = await getTopRestaurantsByCountryAndCityFromDb(country, city);
  res.send(result);
};

export { getTopRestaurants, getTopRestaurantsByCountryAndCity };
