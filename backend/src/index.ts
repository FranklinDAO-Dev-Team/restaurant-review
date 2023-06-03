import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routers/router";
import { sync } from "./utils/sync";

const main = async () => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }

  const port = process.env.PORT || 4000;

  await sync();

  const app = express();

  app.use(cors());

  app.use("/api", router);

  app.listen(port, () => {
    console.log(`Server listening to http://localhost:${port}`);
  });
};

main();
