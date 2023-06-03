import axios from "axios";
import { BASE_SERVER_URL } from "../utils/env";

const getAllCitiesByCountryName = async (countryName: string) => {
  const result = await axios.get(
    `${BASE_SERVER_URL}/api/cities/${countryName}`
  );
  return result.data;
};

const getCityByCountryNameAndCityName = async (
  countryName: string,
  cityName: string
) => {
  const result = await axios.get(
    `${BASE_SERVER_URL}/api/cities/${countryName}/${cityName}`
  );
  return result.data;
};

export { getAllCitiesByCountryName, getCityByCountryNameAndCityName };
