// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./City.sol";
import "./Restaurant.sol";
import "./Review.sol";

interface IRestaurantReview {
    function createCity(string memory _countryName, string memory _cityName) external returns (uint);
    function getNumberOfCities() external view returns (uint);
    function getCityById(uint _id) external view returns (City memory);
    function createRestaurant(uint _cityId, string memory _restaurantAddress, string memory _restaurantName) external returns (uint);
    function getNumberOfRestaurants() external view returns (uint);
    function getRestaurantById(uint _id) external view returns (Restaurant memory);
    function createReview(uint _restaurantId, uint _rating, string memory _metadata) external returns (uint);
    function getNumberOfReviews() external view returns (uint);
    function getReviewById(uint _id) external view returns (Review memory);
    function createRestaurantAndReview(uint _cityId, string memory _restaurantAddress, string memory _restaurantName, uint _rating, string memory _metadata) external returns (uint, uint);
    function createCityRestaurantAndReview(string memory _countryName, string memory _cityName, string memory _restaurantAddress, string memory _restaurantName, uint _rating, string memory _metadata) external returns (uint, uint, uint);
}