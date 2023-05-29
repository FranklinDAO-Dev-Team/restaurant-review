// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./City.sol";
import "./Restaurant.sol";
import "./Review.sol";
import "./IRestaurantReview.sol";

error MissingCountryName();
error MissingCityName();
error MissingRestaurantAddress();
error MissingRestaurantName();
error InvalidRating();
error InvalidIndex();

contract RestaurantReview is IRestaurantReview {
    City[] cities;
    Restaurant[] restaurants;
    Review[] reviews;

    uint public minRating;
    uint public maxRating;

    event CityCreated(uint indexed _id, string _countryName, string _cityName);
    event RestaurantCreated(uint indexed _id, uint _cityId, string _restaurantAddress, string _restaurantName);
    event ReviewCreated(uint indexed _id, address indexed _from, uint _restuarantId, uint _rating, string _metadata);

    constructor(uint _minRating, uint _maxRating) {
        minRating = _minRating;
        maxRating = _maxRating;
    }

    function createCity(string memory _countryName, string memory _cityName) public returns (uint) {
        if (bytes(_countryName).length == 0) revert MissingCountryName();
        if (bytes(_cityName).length == 0) revert MissingCityName();

        cities.push(City(_countryName, _cityName));
        emit CityCreated(cities.length - 1, _countryName, _cityName);

        return cities.length - 1;
    }

    function getNumberOfCities() external view override returns (uint) {
        return cities.length;
    }

    function getCityById(uint _id) external view override returns (City memory) {
        if (_id >= cities.length) revert InvalidIndex();

        return cities[_id];
    }

    function createRestaurant(uint _cityId, string memory _restaurantAddress, string memory _restaurantName) public returns (uint) {
        if (_cityId >= cities.length) revert InvalidIndex();
        if (bytes(_restaurantAddress).length == 0) revert MissingRestaurantAddress();
        if (bytes(_restaurantName).length == 0) revert MissingRestaurantName();

        restaurants.push(Restaurant(_cityId, _restaurantAddress, _restaurantName));
        emit RestaurantCreated(restaurants.length - 1, _cityId, _restaurantAddress, _restaurantName);

        return restaurants.length - 1;
    }

    function getNumberOfRestaurants() external view override returns (uint) {
        return restaurants.length;
    }

    function getRestaurantById(uint _id) external view override returns (Restaurant memory) {
        if (_id >= restaurants.length) revert InvalidIndex();

        return restaurants[_id];
    }

    function createReview(uint _restaurantId, uint _rating, string memory _metadata) public returns (uint) {
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

    function createRestaurantAndReview(uint _cityId, string memory _restaurantAddress, string memory _restaurantName, uint _rating, string memory _metadata) public returns (uint, uint) {
        uint restaurantId = createRestaurant(_cityId, _restaurantAddress, _restaurantName);
        uint reviewId = createReview(restaurantId, _rating, _metadata);
        return (restaurantId, reviewId);
    }

    function createCityRestaurantAndReview(string memory _countryName, string memory _cityName, string memory _restaurantAddress, string memory _restaurantName, uint _rating, string memory _metadata) public returns (uint, uint, uint) {
        uint cityId = createCity(_countryName, _cityName);
        (uint restaurantId, uint reviewId) = createRestaurantAndReview(cityId, _restaurantAddress, _restaurantName, _rating, _metadata);
        return (cityId, restaurantId, reviewId);
    }
}