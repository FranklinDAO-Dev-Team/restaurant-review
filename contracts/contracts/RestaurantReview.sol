// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Restaurant.sol";
import "./Review.sol";
import "./IRestaurantReview.sol";

error MissingCountry();
error MissingCity();
error MissingRestaurantAddress();
error MissingRestaurantName();
error InvalidRating();
error InvalidIndex();

contract RestaurantReview is IRestaurantReview {
    Restaurant[] restaurants;
    Review[] reviews;

    uint public minRating;
    uint public maxRating;

    event RestaurantCreated(uint indexed _id, string _country, string _city, string _restaurantAddress, string _restaurantName);
    event ReviewCreated(uint indexed _id, address indexed _from, uint _restuarantId, uint _rating, string _metadata);

    constructor(uint _minRating, uint _maxRating) {
        minRating = _minRating;
        maxRating = _maxRating;
    }

    function createRestaurant(string memory _country, string memory _city, string memory _restaurantAddress, string memory _restaurantName) public returns (uint) {
        if (bytes(_country).length == 0) revert MissingCountry();
        if (bytes(_city).length == 0) revert MissingCity();
        if (bytes(_restaurantAddress).length == 0) revert MissingRestaurantAddress();
        if (bytes(_restaurantName).length == 0) revert MissingRestaurantName();

        restaurants.push(Restaurant(_country, _city, _restaurantAddress, _restaurantName));
        emit RestaurantCreated(restaurants.length - 1, _country, _city, _restaurantAddress, _restaurantName);
        return restaurants.length - 1;
    }

    function getNumberOfRestaurants() external view override returns (uint) {
        return restaurants.length;
    }

    function getRestaurantById(uint _id) external view override returns (Restaurant memory) {
        if (_id >= restaurants.length) revert InvalidIndex();

        return restaurants[_id];
    }

    function createReview(uint _restaurantId, uint _rating, string memory _metadata) public override returns (uint) {
        if (_restaurantId >= restaurants.length) revert InvalidIndex();
        if (_rating < minRating || _rating > maxRating) revert InvalidRating();

        reviews.push(Review(msg.sender, _restaurantId, _rating, _metadata));
        emit ReviewCreated(reviews.length - 1, msg.sender, _restaurantId, _rating, _metadata);
        return reviews.length - 1;
    }

    function getNumberOfReviews() external view returns (uint) {
        return reviews.length;
    }

    function getReviewById(uint _id) external view returns (Review memory) {
        if (_id >= reviews.length) revert InvalidIndex();

        return reviews[_id];
    }

    function createRestaurantAndReview(string memory _country, string memory _city, string memory _restaurantAddress, string memory _restaurantName, uint _rating, string memory _metadata) external returns (uint, uint) {
        uint restaurantId = createRestaurant(_country, _city, _restaurantAddress, _restaurantName);
        uint reviewId = createReview(restaurantId, _rating, _metadata);
        return (restaurantId, reviewId);   
    }
}