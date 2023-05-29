import { Router } from "express";
import { getAllCountries } from "../controllers/country";

const countryRouter = Router();

countryRouter.get("/", getAllCountries);

export { countryRouter };
