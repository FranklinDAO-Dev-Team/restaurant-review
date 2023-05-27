// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Restaurant.sol";
import "./Review.sol";

interface IRestaurantReview {
    function createRestaurant(string memory _country, string memory _city, string memory _restaurantName) external returns (uint);
    function getNumberOfRestaurants() external view returns (uint);
    function getRestaurantById(uint _id) external view returns (Restaurant memory);
    function createReview(uint _restaurantId, uint _rating, string memory _metadata) external returns (uint);
    function getNumberOfReviews() external view returns (uint);
    function getReviewById(uint _id) external view returns (Review memory);
    function createRestaurantAndReview(string memory _country, string memory _city, string memory _restaurantName, uint _rating, string memory _metadata) external returns (uint, uint);
}