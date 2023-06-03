import { Request, Response } from "express";
import {
  getAllCitiesByCountryNameFromDb,
  getCityByCountryNameAndCityNameFromDb,
} from "../models/city";

const getAllCitiesByCountryName = async (req: Request, res: Response) => {
  const { countryName } = req.params;
  const result = await getAllCitiesByCountryNameFromDb(countryName);
  res.send(result);
};

const getCityById = async (req: Request, res: Response) => {
  const { countryName, cityName } = req.params;
  const result = await getCityByCountryNameAndCityNameFromDb(
    countryName,
    cityName
  );
  res.send(result);
};

export { getAllCitiesByCountryName, getCityById };
