import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const RestaurantReview = await ethers.getContractFactory("RestaurantReview");
  const restaurantReview = RestaurantReview.attach(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  console.log(`Connected to RestaurantReview at ${restaurantReview.address}`);

  await restaurantReview
    .connect(accounts[0])
    .createCityRestaurantAndReview(
      "Philippines",
      "Cebu",
      "Test Address 4",
      "Mang Inasal",
      5,
      "Sarap!"
    );

  await restaurantReview
    .connect(accounts[1])
    .createCityRestaurantAndReview(
      "Canada",
      "Toronto",
      "Test Address 2",
      "Pizza Pizza",
      4,
      "Doesn't cut corners"
    );

  await restaurantReview
    .connect(accounts[2])
    .createCityRestaurantAndReview(
      "USA",
      "San Francisco",
      "Test Address 6",
      "McDonalds",
      3,
      "Terrible"
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
