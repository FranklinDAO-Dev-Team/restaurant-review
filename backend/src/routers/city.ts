import { Router } from "express";
import { getAllCitiesByCountryName } from "../controllers/city";

const cityRouter = Router();

cityRouter.get("/:countryName", getAllCitiesByCountryName);

export { cityRouter };
