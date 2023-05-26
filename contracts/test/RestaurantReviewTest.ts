import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import exp from "constants";

describe("RestaurantReview", () => {
  const deployRestaurantReview = async () => {
    // Contracts are deployed using the first signer/account by default
    const accounts = await ethers.getSigners();

    const RestaurantReview = await ethers.getContractFactory("RestaurantReview");
    const restaurantReview = await RestaurantReview.deploy(1, 5);

    return { restaurantReview, accounts };
  }

  describe("Constructor", () => {
    it("Should set the right minRating", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.minRating()).to.equal(1);
    });

    it("Should set the right maxRating", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.maxRating()).to.equal(5);
    });

    it("Should have no reviews", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
    });
  });

  describe("Create Review", () => {
    it("Should create a review", async () => {
      const { restaurantReview, accounts } = await loadFixture(deployRestaurantReview);
      await restaurantReview.createReview("Philippines", "Manila", "Jollibee", 5, "Good food");
      expect(await restaurantReview.getNumberOfReviews()).to.equal(1);
      const review = await restaurantReview.getReviewById(0);
      expect(review.country).to.equal("Philippines");
      expect(review.city).to.equal("Manila");
      expect(review.restaurantName).to.equal("Jollibee");
      expect(review.rating).to.equal(5);
      expect(review.comment).to.equal("Good food");
      expect(review.reviewer).to.equal(accounts[0].address);
    });
  });

  describe("Validation", () => {
    it("Should not create a review with an empty country", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await expect(restaurantReview.createReview("", "Manila", "Jollibee", 5, "Good food")).to.be.revertedWithCustomError(restaurantReview, "EmptyCountry");
    });

    it("Should not create a review with an empty city", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await expect(restaurantReview.createReview("Philippines", "", "Jollibee", 5, "Good food")).to.be.revertedWithCustomError(restaurantReview, "EmptyCity");
    });

    it("Should not create a review with an empty restaurant name", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await expect(restaurantReview.createReview("Philippines", "Manila", "", 5, "Good food")).to.be.revertedWithCustomError(restaurantReview, "EmptyRestaurantName");
    });

    it("Should not create a review with a rating less than minRating", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await expect(restaurantReview.createReview("Philippines", "Manila", "Jollibee", 0, "Good food")).to.be.revertedWithCustomError(restaurantReview, "InvalidRating");
    });

    it("Should not create a review with a rating greater than maxRating", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await expect(restaurantReview.createReview("Philippines", "Manila", "Jollibee", 6, "Good food")).to.be.revertedWithCustomError(restaurantReview, "InvalidRating");
    });

    it("Should create a review with an empty comment", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await restaurantReview.createReview("Philippines", "Manila", "Jollibee", 5, "");
      expect(await restaurantReview.getNumberOfReviews()).to.equal(1);
      const review = await restaurantReview.getReviewById(0);
      expect(review.comment).to.equal("");
    });
  });

  describe("Retrieval", async () => {
    it("Should get the correct number of reviews when no reviews exist", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
    });

    it("Should get the correct number of reviews when one review exists", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await restaurantReview.createReview("Philippines", "Manila", "Jollibee", 5, "Good food");
      expect(await restaurantReview.getNumberOfReviews()).to.equal(1);
    });

    it("Should get the correct number of reviews when multiple reviews exist", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await restaurantReview.createReview("Philippines", "Manila", "Jollibee", 5, "Good food");
      await restaurantReview.createReview("Canada", "Vancouver", "Tim Hortons", 4, "Solid");
      await restaurantReview.createReview("USA", "New York", "McDonalds", 3, "Meh");
      expect(await restaurantReview.getNumberOfReviews()).to.equal(3);
    });

    it("Should not get a review when invalid index specified", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      await restaurantReview.createReview("Philippines", "Manila", "Jollibee", 5, "Good food");
      await restaurantReview.createReview("Canada", "Vancouver", "Tim Hortons", 4, "Solid");
      await restaurantReview.createReview("USA", "New York", "McDonalds", 3, "Meh");
      await expect(restaurantReview.getReviewById(3)).to.be.revertedWithCustomError(restaurantReview, "InvalidIndex");
    });

    it("Should get the correct review when one review exists", async () => {
      const { restaurantReview, accounts } = await loadFixture(deployRestaurantReview);
      await restaurantReview.createReview("Philippines", "Manila", "Jollibee", 5, "Good food");
      const review = await restaurantReview.getReviewById(0);
      expect(review.country).to.equal("Philippines");
      expect(review.city).to.equal("Manila");
      expect(review.restaurantName).to.equal("Jollibee");
      expect(review.rating).to.equal(5);
      expect(review.comment).to.equal("Good food");
      expect(review.reviewer).to.equal(accounts[0].address);
    });

    it("Should get the correct review when multiple reviews exist", async () => {
      const { restaurantReview, accounts } = await loadFixture(deployRestaurantReview);
      await restaurantReview.createReview("Philippines", "Manila", "Jollibee", 5, "Good food", { from: accounts[0].address });
      await restaurantReview.connect(accounts[1]).createReview("Canada", "Vancouver", "Tim Hortons", 4, "Solid");
      await restaurantReview.connect(accounts[2]).createReview("USA", "New York", "McDonalds", 3, "Meh");

      const review1 = await restaurantReview.getReviewById(0);
      expect(review1.country).to.equal("Philippines");
      expect(review1.city).to.equal("Manila");
      expect(review1.restaurantName).to.equal("Jollibee");
      expect(review1.rating).to.equal(5);
      expect(review1.comment).to.equal("Good food");
      expect(review1.reviewer).to.equal(accounts[0].address);

      const review2 = await restaurantReview.getReviewById(1);
      expect(review2.country).to.equal("Canada");
      expect(review2.city).to.equal("Vancouver");
      expect(review2.restaurantName).to.equal("Tim Hortons");
      expect(review2.rating).to.equal(4);
      expect(review2.comment).to.equal("Solid");
      expect(review2.reviewer).to.equal(accounts[1].address);

      const review3 = await restaurantReview.getReviewById(2);
      expect(review3.country).to.equal("USA");
      expect(review3.city).to.equal("New York");
      expect(review3.restaurantName).to.equal("McDonalds");
      expect(review3.rating).to.equal(3);
      expect(review3.comment).to.equal("Meh");
      expect(review3.reviewer).to.equal(accounts[2].address);
    });
  });
});
