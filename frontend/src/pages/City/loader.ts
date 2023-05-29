import { LoaderFunctionArgs } from "react-router-dom";
import { getRestaurantsByCountryAndCityName } from "../../routes/restaurants";

export interface Restaurant {
  id: number;
  cityId: number;
  restaurantAddress: string;
  restaurantName: string;
  averageRating?: string;
}

export interface CityParams {
  countryName: string;
  cityName: string;
  restaurants?: Restaurant[];
}

const cityLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<CityParams> => {
  const { countryName, cityName } = params;
  const restaurants = await getRestaurantsByCountryAndCityName(
    countryName || "",
    cityName || ""
  );
  return {
    countryName: countryName || "",
    cityName: cityName || "",
    restaurants: restaurants,
  };
};

export { cityLoader };
