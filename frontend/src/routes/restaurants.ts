import axios from "axios";
import { BASE_SERVER_URL } from "../utils/env";

export const getRestaurantsByCountryAndCityName = async (
  countryName: string,
  cityName: string
) => {
  const result = await axios.get(
    `${BASE_SERVER_URL}/api/restaurants/all/${countryName}/${cityName}`
  );
  return result.data;
};

export const getRestaurantById = async (id: number) => {
  const result = await axios.get(`${BASE_SERVER_URL}/api/restaurants/${id}`);
  return result.data;
};
