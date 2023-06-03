import { getDb } from "../utils/database";

interface BaseRestaurant {
  id: number;
  cityId: number;
  restaurantAddress: string;
  restaurantName: string;
  longitude: number;
  latitude: number;
}

interface Restaurant extends BaseRestaurant {
  averageRating: number;
  numberOfReviews: number;
}

const createRestaurantInDb = async (restaurant: BaseRestaurant) => {
  const query = `
INSERT OR IGNORE INTO restaurants (id, cityId, restaurantAddress, restaurantName, longitude, latitude)
VALUES (?, ?, ?, ?, ?, ?)
    `;
  const result = await getDb().run(query, [
    restaurant.id,
    restaurant.cityId,
    restaurant.restaurantAddress,
    restaurant.restaurantName,
    restaurant.longitude,
    restaurant.latitude,
  ]);
  return result.lastID;
};

const getRestaurantsByCountryAndCityNameFromDb = async (
  countryName: string,
  cityName: string
) => {
  const query = `
SELECT restaurants.id, restaurants.cityId, restaurants.restaurantAddress, restaurants.restaurantName, restaurants.longitude, restaurants.latitude, AVG(reviews.rating) as averageRating, COUNT(reviews.rating) as numberOfReviews
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
