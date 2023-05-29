import { Router } from "express";
import { getAllCitiesByCountryName } from "../controllers/city";

const cityRouter = Router();

cityRouter.get("/:country", getAllCitiesByCountryName);

export { cityRouter };
