// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct Review {
    address reviewer;
    uint restaurantId;
    uint rating;
    string metadata;
}