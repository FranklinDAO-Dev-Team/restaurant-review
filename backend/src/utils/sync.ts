import { ethers } from "ethers";
import fs from "fs";
import { createRestaurantInDb } from "../models/restaurant";
import { createReviewInDb } from "../models/review";

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

const loadRestaurant = async (id: number) => {
  const restaurant = await restaurantReviewContract.getRestaurantById(id);
  createRestaurantInDb({
    id: id,
    country: restaurant[0],
    city: restaurant[1],
    address: restaurant[2],
    name: restaurant[3],
  });
};

const loadReview = async (id: number) => {
  const review = await restaurantReviewContract.getReviewById(id);
  createReviewInDb({
    id: id,
    restaurantId: review[0],
    rating: review[1],
    metadata: review[2],
  });
};

const loadExistingData = async () => {
  console.log(
    `Loading existing data from ${await restaurantReviewContract.getAddress()}`
  );

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
  restaurantReviewContract.on(
    "RestaurantCreated",
    (
      id: number,
      country: string,
      city: string,
      address: string,
      name: string
    ) => {
      createRestaurantInDb({
        id: id,
        country: country,
        city: city,
        address: address,
        name: name,
      });
    }
  );

  restaurantReviewContract.on(
    "ReviewCreated",
    (id: number, restaurantId: number, rating: number, metadata: string) => {
      createReviewInDb({
        id: id,
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
