import { getDb } from "../utils/database";

interface City {
  id: number;
  countryName: string;
  cityName: string;
}

const createCityInDb = async (city: City) => {
  const query = `
INSERT OR IGNORE INTO cities (id, countryName, cityName)
VALUES (?, ?, ?)
    `;
  const result = await getDb().run(query, [
    city.id,
    city.countryName,
    city.cityName,
  ]);
  return result.lastID;
};

const getAllCountriesFromDb = async () => {
  const query = `
SELECT DISTINCT countryName
FROM cities
ORDER BY countryName ASC
    `;
  const result = await getDb().all(query);
  return result.map((row) => row.countryName);
};

const getAllCitiesByCountryNameFromDb = async (countryName: string) => {
  const query = `
SELECT DISTINCT cityName
FROM cities
WHERE countryName = ?
ORDER BY cityName ASC
    `;
  const result = await getDb().all(query, [countryName]);
  return result.map((row) => row.cityName);
};

export {
  City,
  createCityInDb,
  getAllCountriesFromDb,
  getAllCitiesByCountryNameFromDb,
};
