import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("RestaurantReview", () => {
  const deployRestaurantReview = async () => {
    const accounts = await ethers.getSigners();

    const RestaurantReview = await ethers.getContractFactory(
      "RestaurantReview"
    );
    const restaurantReview = await RestaurantReview.deploy(1, 5);

    return { restaurantReview, accounts };
  };

  describe("Constructor", () => {
    it("Should set the right minRating", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.minRating()).to.equal(1);
    });

    it("Should set the right maxRating", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.maxRating()).to.equal(5);
    });

    it("Should have no restaurants", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
    });

    it("Should have no reviews", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);
      expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
    });
  });

  describe("Create City", () => {
    it("Should create a city", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);

      await expect(restaurantReview.createCity("Philippines", "Manila"))
        .to.emit(restaurantReview, "CityCreated")
        .withArgs(0, "Philippines", "Manila");

      expect(await restaurantReview.getNumberOfCities()).to.equal(1);

      const city = await restaurantReview.getCityById(0);
      expect(city.countryName).to.equal("Philippines");
      expect(city.cityName).to.equal("Manila");
    });

    describe("Validation", () => {
      it("Should not create a city with an empty countryName", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await expect(
          restaurantReview.createCity("", "Manila")
        ).to.be.revertedWithCustomError(restaurantReview, "MissingCountryName");
      });

      it("Should not create a city with an empty city name", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await expect(
          restaurantReview.createCity("Philippines", "")
        ).to.be.revertedWithCustomError(restaurantReview, "MissingCityName");
      });
    });
  });

  describe("Retrieve City", () => {
    describe("Get Number of Cities", () => {
      it("Should return the correct number of cities if no cities exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        expect(await restaurantReview.getNumberOfCities()).to.equal(0);
      });

      it("Should return the correct number of cities if one city exists", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        await restaurantReview.createCity("Philippines", "Manila");
        expect(await restaurantReview.getNumberOfCities()).to.equal(1);
      });

      it("Should return the correct number of cities if multiple cities exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createCity("Canada", "Vancouver");
        await restaurantReview.createCity("United States", "Philadelphia");
        expect(await restaurantReview.getNumberOfCities()).to.equal(3);
      });
    });

    describe("Get City By Id", () => {
      it("Should not return a city if no cities exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        await expect(
          restaurantReview.getCityById(0)
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidIndex");
      });

      it("Should return the correct city if one city exists", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        await restaurantReview.createCity("Philippines", "Manila");
        const city = await restaurantReview.getCityById(0);
        expect(city.countryName).to.equal("Philippines");
        expect(city.cityName).to.equal("Manila");
      });

      it("Should return the correct city if multiple cities exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createCity("Canada", "Vancouver");
        await restaurantReview.createCity("United States", "Philadelphia");

        const city1 = await restaurantReview.getCityById(0);
        expect(city1.countryName).to.equal("Philippines");
        expect(city1.cityName).to.equal("Manila");

        const city2 = await restaurantReview.getCityById(1);
        expect(city2.countryName).to.equal("Canada");
        expect(city2.cityName).to.equal("Vancouver");

        const city3 = await restaurantReview.getCityById(2);
        expect(city3.countryName).to.equal("United States");
        expect(city3.cityName).to.equal("Philadelphia");
      });
    });
  });

  describe("Create Restaurant", () => {
    it("Should create a restaurant", async () => {
      const { restaurantReview } = await loadFixture(deployRestaurantReview);

      await restaurantReview.createCity("Philippines", "Manila");

      await expect(
        restaurantReview.createRestaurant(0, "Test Address", "Jollibee")
      )
        .to.emit(restaurantReview, "RestaurantCreated")
        .withArgs(0, 0, "Test Address", "Jollibee");

      expect(await restaurantReview.getNumberOfRestaurants()).to.equal(1);

      const restaurant = await restaurantReview.getRestaurantById(0);
      expect(restaurant.cityId).to.equal(0);
      expect(restaurant.restaurantAddress).to.equal("Test Address");
      expect(restaurant.restaurantName).to.equal("Jollibee");
    });

    describe("Validation", () => {
      it("Should not create a restaurant with an missing address", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");

        await expect(
          restaurantReview.createRestaurant(0, "", "Jollibee")
        ).to.be.revertedWithCustomError(
          restaurantReview,
          "MissingRestaurantAddress"
        );
      });

      it("Should not create a restaurant with an missing restaurant name", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");

        await expect(
          restaurantReview.createRestaurant(0, "Test Address", "")
        ).to.be.revertedWithCustomError(
          restaurantReview,
          "MissingRestaurantName"
        );
      });
    });
  });

  describe("Retrieve Restaurants", () => {
    describe("Get Number of Restaurants", () => {
      it("Should return the correct number of restaurants when no restaurants exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
      });

      it("Should return the correct number of restaurants when one restaurant exists", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");

        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");

        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(1);
      });

      it("Should return the correct number of restaurants when multiple restaurants exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createCity("Canada", "Vancouver");
        await restaurantReview.createCity("United States", "Philadelphia");

        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");
        await restaurantReview.createRestaurant(
          1,
          "Test Address 2",
          "Tim Hortons"
        );
        await restaurantReview.createRestaurant(
          2,
          "Test Address 3",
          "Burger King"
        );

        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(3);
      });
    });

    describe("Get Restaurant By Id", () => {
      it("Should not return a restaurant when no restaurants exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        await expect(
          restaurantReview.getRestaurantById(0)
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidIndex");
      });

      it("Should return the correct restaurant when one restaurant exists", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");

        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");

        const restaurant = await restaurantReview.getRestaurantById(0);
        expect(restaurant.cityId).to.equal(0);
        expect(restaurant.restaurantAddress).to.equal("Test Address");
        expect(restaurant.restaurantName).to.equal("Jollibee");

        await expect(
          restaurantReview.getRestaurantById(1)
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidIndex");
      });

      it("Should return the correct restaurant when multiple restaurants exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createCity("Canada", "Vancouver");
        await restaurantReview.createCity("United States", "Philadelphia");

        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");
        await restaurantReview.createRestaurant(
          1,
          "Test Address 2",
          "Tim Hortons"
        );
        await restaurantReview.createRestaurant(
          2,
          "Test Address 3",
          "Burger King"
        );

        const restaurant1 = await restaurantReview.getRestaurantById(0);
        expect(restaurant1.cityId).to.equal(0);
        expect(restaurant1.restaurantAddress).to.equal("Test Address");
        expect(restaurant1.restaurantName).to.equal("Jollibee");

        const restaurant2 = await restaurantReview.getRestaurantById(1);
        expect(restaurant2.cityId).to.equal(1);
        expect(restaurant2.restaurantAddress).to.equal("Test Address 2");
        expect(restaurant2.restaurantName).to.equal("Tim Hortons");

        const restaurant3 = await restaurantReview.getRestaurantById(2);
        expect(restaurant3.cityId).to.equal(2);
        expect(restaurant3.restaurantAddress).to.equal("Test Address 3");
        expect(restaurant3.restaurantName).to.equal("Burger King");

        await expect(
          restaurantReview.getRestaurantById(3)
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidIndex");
      });
    });
  });

  describe("Create Review", () => {
    it("Should create a review", async () => {
      const { restaurantReview, accounts } = await loadFixture(
        deployRestaurantReview
      );

      await restaurantReview.createCity("Philippines", "Manila");
      await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");

      await expect(
        restaurantReview.connect(accounts[1]).createReview(0, 5, "Good food")
      )
        .to.emit(restaurantReview, "ReviewCreated")
        .withArgs(0, accounts[1].address, 0, 5, "Good food");

      expect(await restaurantReview.getNumberOfReviews()).to.equal(1);

      const review = await restaurantReview.getReviewById(0);
      expect(review.rating).to.equal(5);
      expect(review.metadata).to.equal("Good food");
      expect(review.reviewer).to.equal(accounts[1].address);
    });

    describe("Validation", () => {
      it("Should not create a review with an invalid restaurant id", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        await expect(
          restaurantReview.createReview(0, 5, "Good food")
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidIndex");
      });

      it("Should not create a review with a rating less than minRating", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");

        await expect(
          restaurantReview.createReview(0, 0, "Good food")
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidRating");
      });

      it("Should not create a review with a rating greater than maxRating", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");

        await expect(
          restaurantReview.createReview(0, 6, "Good food")
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidRating");
      });

      it("Should create a review with an missing comment", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await restaurantReview.createCity("Philippines", "Manila");

        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");

        await expect(
          restaurantReview.connect(accounts[1]).createReview(0, 5, "")
        )
          .to.emit(restaurantReview, "ReviewCreated")
          .withArgs(0, accounts[1].address, 0, 5, "");
      });
    });
  });

  describe("Retrieve Reviews", async () => {
    describe("Get Number Of Reviews", () => {
      it("Should get the correct number of reviews when no reviews exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should get the correct number of reviews when one review exists", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");
        await restaurantReview.createReview(0, 5, "Good food");
        expect(await restaurantReview.getNumberOfReviews()).to.equal(1);
      });

      it("Should get the correct number of reviews when multiple reviews exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createCity("Canada", "Vancouver");
        await restaurantReview.createCity("USA", "Philadelphia");

        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");
        await restaurantReview.createRestaurant(
          1,
          "Test Address 2",
          "Tim Hortons"
        );
        await restaurantReview.createRestaurant(
          2,
          "Test Address 3",
          "McDonalds"
        );

        await restaurantReview.createReview(0, 5, "Good food");
        await restaurantReview.createReview(1, 4, "Solid");
        await restaurantReview.createReview(2, 3, "Meh");
        expect(await restaurantReview.getNumberOfReviews()).to.equal(3);
      });
    });

    describe("Get Review By Id", () => {
      it("Should not get a review when no reviews exist", async () => {
        const { restaurantReview } = await loadFixture(deployRestaurantReview);
        await expect(
          restaurantReview.getReviewById(0)
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidIndex");
      });

      it("Should get the correct review when one review exists", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");
        await restaurantReview.createReview(0, 5, "Good food");

        const review = await restaurantReview.getReviewById(0);
        expect(review.restaurantId).to.equal(0);
        expect(review.rating).to.equal(5);
        expect(review.metadata).to.equal("Good food");
        expect(review.reviewer).to.equal(accounts[0].address);
      });

      it("Should get the correct review when multiple reviews exist", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await restaurantReview.createCity("Philippines", "Manila");
        await restaurantReview.createCity("Canada", "Vancouver");
        await restaurantReview.createCity("USA", "Philadelphia");

        await restaurantReview.createRestaurant(0, "Test Address", "Jollibee");
        await restaurantReview.createRestaurant(
          1,
          "Test Address 2",
          "Tim Hortons"
        );
        await restaurantReview.createRestaurant(
          2,
          "Test Address 3",
          "McDonalds"
        );

        await restaurantReview.createReview(0, 5, "Good food");
        await restaurantReview.connect(accounts[1]).createReview(1, 4, "Solid");
        await restaurantReview.connect(accounts[2]).createReview(2, 3, "Meh");

        const review1 = await restaurantReview.getReviewById(0);
        expect(review1.restaurantId).to.equal(0);
        expect(review1.rating).to.equal(5);
        expect(review1.metadata).to.equal("Good food");
        expect(review1.reviewer).to.equal(accounts[0].address);

        const review2 = await restaurantReview.getReviewById(1);
        expect(review2.restaurantId).to.equal(1);
        expect(review2.rating).to.equal(4);
        expect(review2.metadata).to.equal("Solid");
        expect(review2.reviewer).to.equal(accounts[1].address);

        const review3 = await restaurantReview.getReviewById(2);
        expect(review3.restaurantId).to.equal(2);
        expect(review3.rating).to.equal(3);
        expect(review3.metadata).to.equal("Meh");
        expect(review3.reviewer).to.equal(accounts[2].address);
      });
    });
  });

  describe("Create Restaurant And Review", () => {
    it("Should create a restaurant and review", async () => {
      const { restaurantReview, accounts } = await loadFixture(
        deployRestaurantReview
      );

      await restaurantReview.createCity("Philippines", "Manila");

      await expect(
        restaurantReview
          .connect(accounts[1])
          .createRestaurantAndReview(
            0,
            "Test Address",
            "Jolibee",
            5,
            "Good food"
          )
      )
        .to.emit(restaurantReview, "RestaurantCreated")
        .withArgs(0, 0, "Test Address", "Jolibee")
        .to.emit(restaurantReview, "ReviewCreated")
        .withArgs(0, accounts[1].address, 0, 5, "Good food");

      expect(await restaurantReview.getNumberOfRestaurants()).to.equal(1);
      expect(await restaurantReview.getNumberOfReviews()).to.equal(1);

      const restaurant = await restaurantReview.getRestaurantById(0);
      expect(restaurant.cityId).to.equal(0);
      expect(restaurant.restaurantAddress).to.equal("Test Address");
      expect(restaurant.restaurantName).to.equal("Jolibee");

      const review = await restaurantReview.getReviewById(0);
      expect(review.restaurantId).to.equal(0);
      expect(review.rating).to.equal(5);
      expect(review.metadata).to.equal("Good food");
      expect(review.reviewer).to.equal(accounts[1].address);
    });

    describe("Validation", () => {
      it("Should not create a restaurant and review with a missing address", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await restaurantReview.createCity("Philippines", "Manila");

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createRestaurantAndReview(0, "", "Jolibee", 5, "Good food")
        ).to.be.revertedWithCustomError(
          restaurantReview,
          "MissingRestaurantAddress"
        );

        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should not create a restaurant and review with a missing name", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await restaurantReview.createCity("Philippines", "Manila");

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createRestaurantAndReview(0, "Test Address", "", 5, "Good food")
        ).to.be.revertedWithCustomError(
          restaurantReview,
          "MissingRestaurantName"
        );

        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should not create a restaurant and review with an invalid rating", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await restaurantReview.createCity("Philippines", "Manila");

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createRestaurantAndReview(
              0,
              "Test Address",
              "Jolibee",
              0,
              "Good food"
            )
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidRating");

        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should create a restaurant and review with missing metadata", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await restaurantReview.createCity("Philippines", "Manila");

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createRestaurantAndReview(0, "Test Address", "Jolibee", 5, "")
        )
          .to.emit(restaurantReview, "RestaurantCreated")
          .withArgs(0, 0, "Test Address", "Jolibee")
          .to.emit(restaurantReview, "ReviewCreated")
          .withArgs(0, accounts[1].address, 0, 5, "");

        const restaurant = await restaurantReview.getRestaurantById(0);
        expect(restaurant.cityId).to.equal(0);
        expect(restaurant.restaurantAddress).to.equal("Test Address");
        expect(restaurant.restaurantName).to.equal("Jolibee");

        const review = await restaurantReview.getReviewById(0);
        expect(review.restaurantId).to.equal(0);
        expect(review.rating).to.equal(5);
        expect(review.metadata).to.equal("");
        expect(review.reviewer).to.equal(accounts[1].address);
      });
    });
  });

  describe("Create City, Restaurant And Review", () => {
    it("Should create a city, restaurant and review", async () => {
      const { restaurantReview, accounts } = await loadFixture(
        deployRestaurantReview
      );

      await expect(
        restaurantReview
          .connect(accounts[1])
          .createCityRestaurantAndReview(
            "Philippines",
            "Manila",
            "Test Address",
            "Jolibee",
            5,
            "Good food"
          )
      )
        .to.emit(restaurantReview, "CityCreated")
        .withArgs(0, "Philippines", "Manila")
        .to.emit(restaurantReview, "RestaurantCreated")
        .withArgs(0, 0, "Test Address", "Jolibee")
        .to.emit(restaurantReview, "ReviewCreated")
        .withArgs(0, accounts[1].address, 0, 5, "Good food");

      expect(await restaurantReview.getNumberOfCities()).to.equal(1);
      expect(await restaurantReview.getNumberOfRestaurants()).to.equal(1);
      expect(await restaurantReview.getNumberOfReviews()).to.equal(1);

      const city = await restaurantReview.getCityById(0);
      expect(city.countryName).to.equal("Philippines");
      expect(city.cityName).to.equal("Manila");

      const restaurant = await restaurantReview.getRestaurantById(0);
      expect(restaurant.cityId).to.equal(0);
      expect(restaurant.restaurantAddress).to.equal("Test Address");
      expect(restaurant.restaurantName).to.equal("Jolibee");

      const review = await restaurantReview.getReviewById(0);
      expect(review.restaurantId).to.equal(0);
      expect(review.rating).to.equal(5);
      expect(review.metadata).to.equal("Good food");
      expect(review.reviewer).to.equal(accounts[1].address);
    });

    describe("Validation", () => {
      it("Should not create a city, restaurant and review with a missing countryName", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createCityRestaurantAndReview(
              "",
              "Manila",
              "Test Address",
              "Jolibee",
              5,
              "Good food"
            )
        ).to.be.revertedWithCustomError(restaurantReview, "MissingCountryName");

        expect(await restaurantReview.getNumberOfCities()).to.equal(0);
        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should not create a city, restaurant and review with a missing city", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createCityRestaurantAndReview(
              "Philippines",
              "",
              "Test Address",
              "Jolibee",
              5,
              "Good food"
            )
        ).to.be.revertedWithCustomError(restaurantReview, "MissingCityName");

        expect(await restaurantReview.getNumberOfCities()).to.equal(0);
        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should not create a city, restaurant and review with a missing address", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createCityRestaurantAndReview(
              "Philippines",
              "Manila",
              "",
              "Jolibee",
              5,
              "Good food"
            )
        ).to.be.revertedWithCustomError(
          restaurantReview,
          "MissingRestaurantAddress"
        );

        expect(await restaurantReview.getNumberOfCities()).to.equal(0);
        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should not create a city, restaurant and review with a missing name", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createCityRestaurantAndReview(
              "Philippines",
              "Manila",
              "Test Address",
              "",
              5,
              "Good food"
            )
        ).to.be.revertedWithCustomError(
          restaurantReview,
          "MissingRestaurantName"
        );

        expect(await restaurantReview.getNumberOfCities()).to.equal(0);
        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should not create a city, restaurant and review with an invalid rating", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createCityRestaurantAndReview(
              "Philippines",
              "Manila",
              "Test Address",
              "Jolibee",
              0,
              "Good food"
            )
        ).to.be.revertedWithCustomError(restaurantReview, "InvalidRating");

        expect(await restaurantReview.getNumberOfCities()).to.equal(0);
        expect(await restaurantReview.getNumberOfRestaurants()).to.equal(0);
        expect(await restaurantReview.getNumberOfReviews()).to.equal(0);
      });

      it("Should create a city, restaurant and review with Missing metadata", async () => {
        const { restaurantReview, accounts } = await loadFixture(
          deployRestaurantReview
        );

        await expect(
          restaurantReview
            .connect(accounts[1])
            .createCityRestaurantAndReview(
              "Philippines",
              "Manila",
              "Test Address",
              "Jolibee",
              5,
              ""
            )
        )
          .to.emit(restaurantReview, "CityCreated")
          .withArgs(0, "Philippines", "Manila")
          .to.emit(restaurantReview, "RestaurantCreated")
          .withArgs(0, 0, "Test Address", "Jolibee")
          .to.emit(restaurantReview, "ReviewCreated")
          .withArgs(0, accounts[1].address, 0, 5, "");

        const city = await restaurantReview.getCityById(0);
        expect(city.countryName).to.equal("Philippines");
        expect(city.cityName).to.equal("Manila");

        const restaurant = await restaurantReview.getRestaurantById(0);
        expect(restaurant.cityId).to.equal(0);
        expect(restaurant.restaurantAddress).to.equal("Test Address");
        expect(restaurant.restaurantName).to.equal("Jolibee");

        const review = await restaurantReview.getReviewById(0);
        expect(review.restaurantId).to.equal(0);
        expect(review.rating).to.equal(5);
        expect(review.metadata).to.equal("");
        expect(review.reviewer).to.equal(accounts[1].address);
      });
    });
  });
});
