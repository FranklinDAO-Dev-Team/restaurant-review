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

  const restaurantQuery = `
CREATE TABLE IF NOT EXISTS restaurants (
  id INTEGER PRIMARY KEY,
  country text,
  city text,
  address text,
  name text
)
`;
  await db.run(restaurantQuery);

  const reviewQuery = `
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY,
  restaurantId INTEGER,
  rating INTEGER,
  metadata text,
  FOREIGN KEY (restaurantId) REFERENCES restaurants(id)
)
`;
  await db.run(reviewQuery);
};

main();

const getDb = () => db;

export { getDb };
