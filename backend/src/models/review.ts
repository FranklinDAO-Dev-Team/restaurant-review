import { getDb } from "../utils/database";

interface Review {
  id: number;
  reviewer: string;
  restaurantId: number;
  rating: number;
  metadata: string;
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

export { Review, createReviewInDb, getReviewsByRestaurantIdFromDb };
