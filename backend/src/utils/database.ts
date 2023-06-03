import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

const DB_SOURCE = process.env.DB_SOURCE || "db.sqlite";

const createDbConnection = (source: string) =>
  open({
    filename: source,
    driver: sqlite3.Database,
  });

let db: Database;

const main = async () => {
  db = await createDbConnection(DB_SOURCE);

  const cityQuery = `
CREATE TABLE IF NOT EXISTS cities (
  id INTEGER PRIMARY KEY,
  countryName text NOT NULL,
  cityName text NOT NULL,
  longitude REAL,
  latitude REAL
)
  `;
  await db.run(cityQuery);

  const restaurantQuery = `
CREATE TABLE IF NOT EXISTS restaurants (
  id INTEGER PRIMARY KEY,
  cityId INTEGER NOT NULL,
  restaurantAddress text NOT NULL,
  restaurantName text NOT NULL,
  longitude REAL NOT NULL,
  latitude REAL NOT NULL,
  FOREIGN KEY (cityId) REFERENCES cities(id)
)
`;
  await db.run(restaurantQuery);

  const reviewQuery = `
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY,
  restaurantId INTEGER NOT NULL,
  reviewer text NOT NULL,
  rating INTEGER NOT NULL,
  metadata text,
  FOREIGN KEY (restaurantId) REFERENCES restaurants(id)
)
`;
  await db.run(reviewQuery);
};

main();

const getDb = () => db;

export { getDb };
