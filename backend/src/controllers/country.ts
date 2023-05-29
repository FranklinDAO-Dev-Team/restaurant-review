import { Request, Response } from "express";
import { getAllCountriesFromDb } from "../models/city";

const getAllCountries = async (req: Request, res: Response) => {
  const result = await getAllCountriesFromDb();
  res.send(result);
};

export { getAllCountries };
