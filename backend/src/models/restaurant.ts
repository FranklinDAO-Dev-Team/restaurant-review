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

const getRestaurantsByCountryAndCityNameFromDb = async (
  countryName: string,
  cityName: string
) => {
  const query = `
SELECT restaurants.id, restaurants.cityId, restaurants.restaurantAddress, restaurants.restaurantName, AVG(reviews.rating) as averageRating
FROM restaurants
JOIN reviews ON restaurants.id = reviews.restaurantId
JOIN cities ON restaurants.cityId = cities.id
WHERE cities.countryName = ? AND cities.cityName = ?
GROUP BY restaurants.id
    `;
  const result = await getDb().all(query, [countryName, cityName]);
  return result as Restaurant[];
};

export {
  Restaurant,
  createRestaurantInDb,
  getRestaurantsByCountryAndCityNameFromDb,
};
