import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    node: {
      chainId: 1337,
      url: "http://node:8545",
    },
  },
};

export default config;
