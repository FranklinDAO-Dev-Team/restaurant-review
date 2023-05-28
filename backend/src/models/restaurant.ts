import { getDb } from "../utils/database";

interface Restaurant {
  id: number;
  country: string;
  city: string;
  address: string;
  name: string;
  averageRating?: string;
}

const createRestaurantInDb = async (restaurant: Restaurant) => {
  const query = `
INSERT OR IGNORE INTO restaurants (id, country, city, address, name)
VALUES (?, ?, ?, ?, ?)
    `;
  const result = await getDb().run(query, [
    restaurant.id,
    restaurant.country,
    restaurant.city,
    restaurant.address,
    restaurant.name,
  ]);
  return result.lastID;
};

const getTopRestaurantsFromDb = async () => {
  const query = `
  SELECT restaurants.id, restaurants.country, restaurants.city, restaurants.address, restaurants.name, AVG(reviews.rating) as averageRating
  FROM restaurants
  INNER JOIN reviews ON restaurants.id = reviews.restaurantId
  GROUP BY restaurants.id
  ORDER BY averageRating DESC
  LIMIT 10
  `;
  const result = await getDb().all(query);
  return result as Restaurant[];
};

const getTopRestaurantsByCountryAndCityFromDb = async (
  country: string,
  city: string
) => {
  const query = `
SELECT restaurants.id, restaurants.country, restaurants.city, restaurants.address, restaurants.name, AVG(reviews.rating) as averageRating
FROM restaurants
INNER JOIN reviews ON restaurants.id = reviews.restaurantId
WHERE restaurants.country = ? AND restaurants.city = ?
GROUP BY restaurants.id
ORDER BY averageRating DESC
    `;
  const result = await getDb().all(query, [country, city]);
  return result as Restaurant[];
};

export {
  Restaurant,
  createRestaurantInDb,
  getTopRestaurantsFromDb,
  getTopRestaurantsByCountryAndCityFromDb,
};
