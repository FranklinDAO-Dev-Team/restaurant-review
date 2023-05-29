import { getDb } from "../utils/database";

interface Restaurant {
  id: number;
  cityId: number;
  restaurantAddress: string;
  restaurantName: string;
  averageRating?: string;
}

const createRestaurantInDb = async (restaurant: Restaurant) => {
  const query = `
INSERT OR IGNORE INTO restaurants (id, cityId, restaurantAddress, restaurantName)
VALUES (?, ?, ?, ?)
    `;
  const result = await getDb().run(query, [
    restaurant.id,
    restaurant.cityId,
    restaurant.restaurantAddress,
    restaurant.restaurantName,
  ]);
  return result.lastID;
};

const getRestaurantsByCityIdFromDb = async (cityId: number) => {
  const query = `
SELECT restaurants.id, restaurants.cityId, restaurants.restaurantAddress, restaurants.restaurantName, AVG(reviews.rating) as averageRating
FROM restaurants
INNER JOIN reviews ON restaurants.id = reviews.restaurantId
WHERE restaurants.cityId = ?
GROUP BY restaurants.id
    `;
  const result = await getDb().all(query, [cityId]);
  return result as Restaurant[];
};

export { Restaurant, createRestaurantInDb, getRestaurantsByCityIdFromDb };
