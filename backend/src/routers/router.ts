import { Router } from "express";
import { restaurantRouter } from "./restaurant";
import { reviewRouter } from "./review";
import { countryRouter } from "./country";
import { cityRouter } from "./city";

const router = Router();

router.use("/country", countryRouter);
router.use("/city", cityRouter);
router.use("/restaurant", restaurantRouter);
router.use("/review", reviewRouter);

export { router };
