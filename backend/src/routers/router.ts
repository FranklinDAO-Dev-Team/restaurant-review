import { Router } from "express";
import { restaurantRouter } from "./restaurant";
import { reviewRouter } from "./review";

const router = Router();

router.use("/restaurant", restaurantRouter);
router.use("/review", reviewRouter);

export { router };
