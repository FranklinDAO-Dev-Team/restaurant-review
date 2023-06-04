import { Request, Response } from "express";
import {
  getRestaurantByIdFromDb,
  getRestaurantsByCountryAndCityNameFromDb,
} from "../models/restaurant";

const getRestaurantsByCountryAndCityName = async (
  req: Request,
  res: Response
) => {
  const { countryName, cityName } = req.params;
  const result = await getRestaurantsByCountryAndCityNameFromDb(
    countryName,
    cityName
  );
  res.send(result);
};

const getRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getRestaurantByIdFromDb(Number(id));
  res.send(result);
};

export { getRestaurantsByCountryAndCityName, getRestaurantById };
