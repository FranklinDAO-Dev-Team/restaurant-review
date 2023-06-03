import { Router } from "express";
import { getAllCitiesByCountryName, getCityById } from "../controllers/city";

const cityRouter = Router();

cityRouter.get("/:countryName", getAllCitiesByCountryName);

cityRouter.get("/:countryName/:cityName", getCityById);

export { cityRouter };
