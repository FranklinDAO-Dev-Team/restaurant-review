import { ethers } from "hardhat";

async function main() {
  const MIN_RATING = 1;
  const MAX_RATING = 5;

  const RestaurantReview = await ethers.getContractFactory("RestaurantReview");
  const restaurantReview = await RestaurantReview.deploy(
    MIN_RATING,
    MAX_RATING
  );

  await restaurantReview.deployed();

  console.log(`RestaurantReview deployed to ${restaurantReview.address}`);

  await restaurantReview.add
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
