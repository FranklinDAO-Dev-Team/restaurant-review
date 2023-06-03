import { ethers } from "hardhat";
import { readFileSync } from "fs";

interface RestaurantAndReview {
  name: string;
  address: string;
  rating: number;
  review: string;
}

async function main() {
  const MIN_RATING = 1;
  const MAX_RATING = 5;

  const accounts = await ethers.getSigners();
  const RestaurantReview = await ethers.getContractFactory("RestaurantReview");
  const restaurantReview = await RestaurantReview.deploy(
    MIN_RATING,
    MAX_RATING
  );

  await restaurantReview.deployed();

  console.log(`RestaurantReview deployed to ${restaurantReview.address}`);

  await restaurantReview.createCity("Philippines", "Manila");
  await restaurantReview.createCity("USA", "Philadelphia");

  const manilaId = Number(await restaurantReview.getNumberOfCities()) - 2;
  const phillyId = Number(await restaurantReview.getNumberOfCities()) - 1;
  console.log(`Manila ID: ${manilaId}`);
  console.log(`Philadelphia ID: ${phillyId}`);

  console.log("Loading Manila restaurants...");
  const manilaRestaurantsFile = readFileSync(
    "scripts/manila-restaurants.json",
    "utf-8"
  );
  const manilaRestaurants = JSON.parse(
    manilaRestaurantsFile
  ) as RestaurantAndReview[];

  await Promise.all(
    manilaRestaurants.map(async (restaurant) => {
      await restaurantReview
        .connect(accounts[0])
        .createRestaurantAndReview(
          manilaId,
          restaurant.address,
          restaurant.name,
          restaurant.rating,
          restaurant.review
        );
    })
  );
  console.log("Loaded Manila restaurants");

  console.log("Loading Philadelphia restaurants...");
  const phillyRestaurantsFile = readFileSync(
    "scripts/philly-restaurants.json",
    "utf-8"
  );
  const phillyRestaurants = JSON.parse(
    phillyRestaurantsFile
  ) as RestaurantAndReview[];

  await Promise.all(
    phillyRestaurants.map(async (restaurant) => {
      await restaurantReview
        .connect(accounts[0])
        .createRestaurantAndReview(
          phillyId,
          restaurant.address,
          restaurant.name,
          restaurant.rating,
          restaurant.review
        );
    })
  );
  console.log("Loaded Philadelphia restaurants");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
