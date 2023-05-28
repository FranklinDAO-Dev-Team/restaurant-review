"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const config = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 1337,
        },
    },
};
exports.default = config;
