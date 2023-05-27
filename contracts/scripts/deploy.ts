import { ethers } from "hardhat";

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

  await restaurantReview
    .connect(accounts[0])
    .createRestaurantAndReview(
      "Philippines",
      "Manila",
      "Test Address",
      "Jollibee",
      5,
      "Yummy!"
    );

  await restaurantReview
    .connect(accounts[1])
    .createRestaurantAndReview(
      "Canada",
      "Toronto",
      "Test Address 2",
      "Tim Hortons",
      4,
      "Good food"
    );

  await restaurantReview
    .connect(accounts[2])
    .createRestaurantAndReview(
      "USA",
      "New York",
      "Test Address 3",
      "McDonalds",
      3,
      "Meh"
    );

  const numRestaurants = await restaurantReview.getNumberOfRestaurants();
  console.log(`Number of restaurants: ${numRestaurants}`);

  const restaurant1 = await restaurantReview.getRestaurantById(0);
  console.log(`Restaurant 1: ${restaurant1}`);

  const restaurant2 = await restaurantReview.getRestaurantById(1);
  console.log(`Restaurant 2: ${restaurant2}`);

  const restaurant3 = await restaurantReview.getRestaurantById(2);
  console.log(`Restaurant 3: ${restaurant3}`);

  const numReviews = await restaurantReview.getNumberOfReviews();
  console.log(`Number of reviews: ${numReviews}`);

  const review1 = await restaurantReview.getReviewById(0);
  console.log(`Review 1: ${review1}`);

  const review2 = await restaurantReview.getReviewById(1);
  console.log(`Review 2: ${review2}`);

  const review3 = await restaurantReview.getReviewById(2);
  console.log(`Review 3: ${review3}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
