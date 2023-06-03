import { Request, Response } from "express";
import { getRestaurantsByCountryAndCityNameFromDb } from "../models/restaurant";

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

export { getRestaurantsByCountryAndCityName };
