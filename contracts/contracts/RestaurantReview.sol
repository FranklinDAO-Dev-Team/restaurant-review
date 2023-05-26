// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Review.sol";
import "./IRestaurantReview.sol";

error EmptyCountry();
error EmptyCity();
error EmptyRestaurantName();
error InvalidRating();
error InvalidIndex();

contract RestaurantReview is IRestaurantReview {
    Review[] reviews;

    event ReviewCreated(address indexed _from, string _country, string _city, string _restaurantName, uint _rating, string _comment);

    uint public minRating;
    uint public maxRating;

    constructor(uint _minRating, uint _maxRating) {
        minRating = _minRating;
        maxRating = _maxRating;
    } 

    function createReview(string memory _country, string memory _city, string memory _restaurantName, uint _rating, string memory _comment) external {
        if (bytes(_country).length == 0) revert EmptyCountry();
        if (bytes(_city).length == 0) revert EmptyCity();
        if (bytes(_restaurantName).length == 0) revert EmptyRestaurantName();
        if (_rating < minRating || _rating > maxRating) revert InvalidRating();

        reviews.push(Review(msg.sender, _country, _city, _restaurantName, _rating, _comment));
        emit ReviewCreated(msg.sender, _country, _city, _restaurantName, _rating, _comment);
    }

    function getNumberOfReviews() external view returns (uint) {
        return reviews.length;
    }

    function getReviewById(uint _id) external view returns (Review memory) {
        if (_id >= reviews.length) revert InvalidIndex();

        return reviews[_id];
    }
}