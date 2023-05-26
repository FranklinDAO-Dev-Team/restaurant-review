// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Review.sol";

interface IRestaurantReview {
    function createReview(string memory _country, string memory _city, string memory _restaurantName, uint _rating, string memory _comment) external;
    function getNumberOfReviews() external view returns (uint);
    function getReviewById(uint _id) external view returns (Review memory);
}