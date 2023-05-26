// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct Review {
    address reviewer;
    string country;
    string city;
    string restaurantName;
    uint rating;
    string comment;
}