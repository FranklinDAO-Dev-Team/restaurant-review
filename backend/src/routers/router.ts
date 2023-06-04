import { Router } from "express";
import { restaurantRouter } from "./restaurant";
import { reviewRouter } from "./review";
import { countryRouter } from "./country";
import { cityRouter } from "./city";

const router = Router();

router.use("/countries", countryRouter);
router.use("/cities", cityRouter);
router.use("/restaurants", restaurantRouter);
router.use("/reviews", reviewRouter);
router.use("/", (req, res) => {
  res.send("Restaurant Review API");
});

export { router };
