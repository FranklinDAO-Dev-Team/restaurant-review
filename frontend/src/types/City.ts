import { Restaurant } from "./Restaurant";

export interface City {
  id: number;
  countryName: string;
  cityName: string;
  longitude: number;
  latitude: number;
  restaurants?: Restaurant[];
}
