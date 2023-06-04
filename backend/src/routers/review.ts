import { Router } from "express";
import multer from "multer";
import {
  createReviewMetadata,
  getReviewImageByIpfsHash,
  getReviewsByRestaurantId,
} from "../controllers/review";

const upload = multer();

const reviewRouter = Router();

reviewRouter.post("/metadata", upload.array("files"), createReviewMetadata);

reviewRouter.get("/images/:ipfsHash", getReviewImageByIpfsHash);

reviewRouter.get("/:restaurantId", getReviewsByRestaurantId);

export { reviewRouter };
