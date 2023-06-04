import { getDb } from "../utils/database";

interface ReviewMetadata {
  comment: string;
  imageHashes: string[];
}

interface Review {
  id: number;
  reviewer: string;
  restaurantId: number;
  rating: number;
  metadata: string;
  parsedMetadata?: ReviewMetadata;
}

const createReviewInDb = async (review: Review) => {
  const query = `
INSERT OR IGNORE INTO reviews (id, reviewer, restaurantId, rating, metadata)
VALUES (?, ?, ?, ?, ?)
    `;
  const result = await getDb().run(query, [
    review.id,
    review.reviewer,
    review.restaurantId,
    review.rating,
    review.metadata,
  ]);
  return result.lastID;
};

const getReviewsByRestaurantIdFromDb = async (restaurantId: number) => {
  const query = `
SELECT * FROM reviews WHERE restaurantId = ?
    `;
  const result = await getDb().all(query, [restaurantId]);
  return result as Review[];
};

export {
  Review,
  ReviewMetadata,
  createReviewInDb,
  getReviewsByRestaurantIdFromDb,
};
