import { ethers } from "ethers";
import fs from "fs";
import { createRestaurantInDb } from "../models/restaurant";
import { createReviewInDb } from "../models/review";
import { createCityInDb } from "../models/city";

let restaurantReviewContract: ethers.Contract;

const setup = () => {
  const provider = new ethers.JsonRpcProvider(
    process.env.RPC_URL || "http://localhost:8545"
  );

  const restaurantReviewArtifactFile = fs.readFileSync(
    process.env.CONTRACT_ARTIFACT_PATH ||
      "../contracts/artifacts/contracts/RestaurantReview.sol/RestaurantReview.json",
    "utf8"
  );

  const restaurantReviewArtifact = JSON.parse(restaurantReviewArtifactFile);

  const restaurantReviewAbi = restaurantReviewArtifact.abi;

  const restaurantReviewAddress = process.env.CONTRACT_ADDRESS || "";

  restaurantReviewContract = new ethers.Contract(
    restaurantReviewAddress,
    restaurantReviewAbi,
    provider
  );
};

const loadCity = async (id: number) => {
  const city = await restaurantReviewContract.getCityById(id);
  console.log(`Loading city ${id}: ${city[0]}, ${city[1]}`);
  createCityInDb({
    id: id,
    countryName: city[0],
    cityName: city[1],
  });
};

const loadRestaurant = async (id: number) => {
  const restaurant = await restaurantReviewContract.getRestaurantById(id);
  console.log(
    `Loading restaurant ${id}: City #${restaurant[0]}, ${restaurant[1]}, ${restaurant[2]}`
  );
  createRestaurantInDb({
    id: id,
    cityId: restaurant[0],
    restaurantAddress: restaurant[1],
    restaurantName: restaurant[2],
  });
};

const loadReview = async (id: number) => {
  const review = await restaurantReviewContract.getReviewById(id);
  console.log(
    `Loading review ${id}: Restaurant #${review[0]}, ${review[1]}, ${review[2]}`
  );
  createReviewInDb({
    id: id,
    reviewer: review[0],
    restaurantId: review[1],
    rating: review[2],
    metadata: review[3],
  });
};

const loadExistingData = async () => {
  console.log(
    `Loading existing data from ${await restaurantReviewContract.getAddress()}`
  );

  const numCitiesRaw: bigint =
    await restaurantReviewContract.getNumberOfCities();
  const numCities = Number(numCitiesRaw);
  console.log(`Number of cities: ${numCities}`);

  await Promise.all(Array.from({ length: numCities }, (_, i) => loadCity(i)));

  const numRestaurantsRaw: bigint =
    await restaurantReviewContract.getNumberOfRestaurants();
  const numRestaurants = Number(numRestaurantsRaw);
  console.log(`Number of restaurants: ${numRestaurants}`);

  await Promise.all(
    Array.from({ length: numRestaurants }, (_, i) => loadRestaurant(i))
  );

  const numReviewsRaw = await restaurantReviewContract.getNumberOfReviews();
  const numReviews = Number(numReviewsRaw);
  console.log(`Number of reviews: ${numReviews}`);

  await Promise.all(
    Array.from({ length: numRestaurants }, (_, i) => loadReview(i))
  );
};

const listenToNewData = async () => {
  console.log("Listening to new data");

  restaurantReviewContract.on(
    "CityCreated",
    (id: number, countryName: string, cityName: string) => {
      console.log(`Received new city ${id}: ${countryName}, ${cityName}`);
      createCityInDb({
        id: id,
        countryName: countryName,
        cityName: cityName,
      });
    }
  );

  restaurantReviewContract.on(
    "RestaurantCreated",
    (
      id: number,
      cityId: number,
      restaurantAddress: string,
      restaurantName: string
    ) => {
      console.log(
        `Received new restaurant ${id}: City #${cityId}, ${restaurantAddress}, ${restaurantName}`
      );
      createRestaurantInDb({
        id: id,
        cityId: cityId,
        restaurantAddress: restaurantAddress,
        restaurantName: restaurantName,
      });
    }
  );

  restaurantReviewContract.on(
    "ReviewCreated",
    (
      id: number,
      reviewer: string,
      restaurantId: number,
      rating: number,
      metadata: string
    ) => {
      console.log(
        `Received new review ${id}: Restaurant #${restaurantId}, ${reviewer}, ${rating}, ${metadata}`
      );
      createReviewInDb({
        id: id,
        reviewer: reviewer,
        restaurantId: restaurantId,
        rating: rating,
        metadata: metadata,
      });
    }
  );
};

const sync = async () => {
  setup();
  await loadExistingData();
  listenToNewData();
};

export { sync };
