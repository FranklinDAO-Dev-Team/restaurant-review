// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/RestaurantReview.sol";

contract RestaurantReviewTest is Test {
    RestaurantReview public restaurantReview;

    event ReviewCreated(address indexed _from, string _country, string _city, string _restaurantName, uint _rating, string _comment);

    function assertReviewsEq(Review memory expected, Review memory actual) internal {
        assertEq(expected.reviewer, actual.reviewer);
        assertEq(expected.country, actual.country);
        assertEq(expected.city, actual.city);
        assertEq(expected.restaurantName, actual.restaurantName);
        assertEq(expected.rating, actual.rating);
        assertEq(expected.comment, actual.comment);
    }


    function setUp() public {
        uint minRating = 1;
        uint maxRating = 5;
        restaurantReview = new RestaurantReview(minRating, maxRating);
    }

    function testCreateReviewWhenMissingountry() public {
        Review memory expected = Review(
            address(0),
            "",
            "Philadelphia", 
            "Burger King",
            3,
            "Tastes ok..."
        );

        vm.expectRevert(EmptyCountry.selector);
        vm.prank(expected.reviewer);
        restaurantReview.createReview(expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);
    }

    function testCreateReviewWhenMissingCity() public {
        Review memory expected = Review(
            address(0),
            "USA",
            "", 
            "Burger King",
            3,
            "Tastes ok..."
        );

        vm.expectRevert(EmptyCity.selector);
        vm.prank(expected.reviewer);
        restaurantReview.createReview(expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);
    }

    function testCreateReviewWhenMissingRestaurantName() public {
        Review memory expected = Review(
            address(0),
            "USA",
            "Philadelphia", 
            "",
            3,
            "Tastes ok..."
        );

        vm.expectRevert(EmptyRestaurantName.selector);
        vm.prank(expected.reviewer);
        restaurantReview.createReview(expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);
    }

    function testCreateReviewWhenInvalidRating() public {
        Review memory expected = Review(
            address(0),
            "USA",
            "Philadelphia", 
            "Burger King",
            0,
            "Tastes ok..."
        );

        vm.expectRevert(RatingOutOfRange.selector);
        vm.prank(expected.reviewer);
        restaurantReview.createReview(expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);
    }

    function testCreateReviewWhenValid() public {
        Review memory expected = Review(
            address(0),
            "USA",
            "Philadelphia", 
            "Burger King",
            3,
            "Tastes ok..."
        );

        vm.expectEmit(true, false, false, true);
        emit ReviewCreated(expected.reviewer, expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);

        vm.prank(expected.reviewer);
        restaurantReview.createReview(expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);

        assertEq(1, restaurantReview.getNumberOfReviews());
        Review memory actual = restaurantReview.getReviewById(0);
        assertReviewsEq(expected, actual);
    }

    function testGetNumberOfReviewsWhenEmpty() public {
        assertEq(0, restaurantReview.getNumberOfReviews());
    }

    function testGetNumberOfReviewsWhenOne() public {
        Review memory expected = Review(
            address(0),
            "USA",
            "Philadelphia", 
            "Burger King",
            3,
            "Tastes ok..."
        );
        vm.prank(expected.reviewer);
        restaurantReview.createReview(expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);

        assertEq(1, restaurantReview.getNumberOfReviews());
    }

    function testGetNumberOfReviewsWhenMany() public {
        Review memory expected1 = Review(
            address(0),
            "USA",
            "Philadelphia", 
            "Burger King",
            3,
            "Tastes ok..."
        );
        vm.prank(expected1.reviewer);
        restaurantReview.createReview(expected1.country, expected1.city, expected1.restaurantName, expected1.rating, expected1.comment);

        Review memory expected2 = Review(
            address(1),
            "Canada",
            "Vancouver", 
            "Tim Hortons",
            4,
            "Great!"
        );
        vm.prank(expected2.reviewer);
        restaurantReview.createReview(expected2.country, expected2.city, expected2.restaurantName, expected2.rating, expected2.comment);

        Review memory expected3 = Review(
            address(2),
            "Philippines",
            "Manila", 
            "Jolibee",
            5,
            "Yummy!"
        );
        vm.prank(expected3.reviewer);
        restaurantReview.createReview(expected3.country, expected3.city, expected3.restaurantName, expected3.rating, expected3.comment);

        assertEq(3, restaurantReview.getNumberOfReviews());
    }

    function testGetReviewByIdWhenEmpty() public {
        vm.expectRevert(ReviewIdOutOfRange.selector);
        restaurantReview.getReviewById(0);
    }

    function testGetReviewByIdWhenOne() public {
        Review memory expected = Review(
            address(0),
            "USA",
            "Philadelphia", 
            "Burger King",
            3,
            "Tastes ok..."
        );
        vm.prank(expected.reviewer);
        restaurantReview.createReview(expected.country, expected.city, expected.restaurantName, expected.rating, expected.comment);

        Review memory actual = restaurantReview.getReviewById(0);
        assertReviewsEq(expected, actual);
    }

    function testGetReviewByIdWhenMany() public {
        Review memory expected1 = Review(
            address(0),
            "USA",
            "Philadelphia", 
            "Burger King",
            3,
            "Tastes ok..."
        );
        vm.prank(expected1.reviewer);
        restaurantReview.createReview(expected1.country, expected1.city, expected1.restaurantName, expected1.rating, expected1.comment);

        Review memory expected2 = Review(
            address(1),
            "Canada",
            "Vancouver", 
            "Tim Hortons",
            4,
            "Great!"
        );
        vm.prank(expected2.reviewer);
        restaurantReview.createReview(expected2.country, expected2.city, expected2.restaurantName, expected2.rating, expected2.comment);

        Review memory expected3 = Review(
            address(2),
            "Philippines",
            "Manila", 
            "Jolibee",
            5,
            "Yummy!"
        );
        vm.prank(expected3.reviewer);
        restaurantReview.createReview(expected3.country, expected3.city, expected3.restaurantName, expected3.rating, expected3.comment);

        Review memory actual = restaurantReview.getReviewById(0);
        assertReviewsEq(expected1, actual);


        actual = restaurantReview.getReviewById(1);
        assertReviewsEq(expected2, actual);

        actual = restaurantReview.getReviewById(2);
        assertReviewsEq(expected3, actual);
    }
}
