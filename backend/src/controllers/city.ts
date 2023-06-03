import { Request, Response } from "express";
import { getAllCitiesByCountryNameFromDb } from "../models/city";

const getAllCitiesByCountryName = async (req: Request, res: Response) => {
  const { countryName } = req.params;
  const result = await getAllCitiesByCountryNameFromDb(countryName);
  res.send(result);
};

export { getAllCitiesByCountryName };
