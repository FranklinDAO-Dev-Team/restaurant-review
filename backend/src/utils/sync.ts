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

const getCoordinates = async (address: string): Promise<number[]> => {
  const response = await fetch(
    `${process.env.MAPBOX_URL}/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_TOKEN}`
  );

  const data = await response.json();
  const location = data.features[0].center;
  return location;
};

const loadCity = async (id: number) => {
  const city = await restaurantReviewContract.getCityById(id);
  console.log(`Loading city ${id}: ${city[0]}, ${city[1]}`);
  const location = await getCoordinates(`${city[1]}, ${city[0]}`);
  createCityInDb({
    id: id,
    countryName: city[0],
    cityName: city[1],
    longitude: location[0],
    latitude: location[1],
  });
};

const loadRestaurant = async (id: number) => {
  const restaurant = await restaurantReviewContract.getRestaurantById(id);
  console.log(
    `Loading restaurant ${id}: City #${restaurant[0]}, ${restaurant[1]}, ${restaurant[2]}`
  );
  const location = await getCoordinates(`${restaurant[2]}, ${restaurant[1]}`);
  createRestaurantInDb({
    id: id,
    cityId: Number(restaurant[0]),
    restaurantAddress: restaurant[1],
    restaurantName: restaurant[2],
    longitude: location[0],
    latitude: location[1],
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
    restaurantId: Number(review[1]),
    rating: Number(review[2]),
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
    async (id: bigint, countryName: string, cityName: string) => {
      console.log(`Received new city ${id}: ${countryName}, ${cityName}`);
      const location = await getCoordinates(`${cityName}, ${countryName}`);
      createCityInDb({
        id: Number(id),
        countryName: countryName,
        cityName: cityName,
        longitude: location[0],
        latitude: location[1],
      });
    }
  );

  restaurantReviewContract.on(
    "RestaurantCreated",
    async (
      id: bigint,
      cityId: bigint,
      restaurantAddress: string,
      restaurantName: string
    ) => {
      console.log(
        `Received new restaurant ${id}: City #${cityId}, ${restaurantAddress}, ${restaurantName}`
      );
      const location = await getCoordinates(
        `${restaurantName}, ${restaurantAddress}`
      );
      createRestaurantInDb({
        id: Number(id),
        cityId: Number(cityId),
        restaurantAddress: restaurantAddress,
        restaurantName: restaurantName,
        longitude: location[0],
        latitude: location[1],
      });
    }
  );

  restaurantReviewContract.on(
    "ReviewCreated",
    (
      id: bigint,
      reviewer: string,
      restaurantId: bigint,
      rating: bigint,
      metadata: string
    ) => {
      console.log(
        `Received new review ${id}: Restaurant #${restaurantId}, ${reviewer}, ${rating}, ${metadata}`
      );
      createReviewInDb({
        id: Number(id),
        reviewer: reviewer,
        restaurantId: Number(restaurantId),
        rating: Number(rating),
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
