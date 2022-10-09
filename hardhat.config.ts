import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-gas-reporter";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.15" }, { version: "0.6.6" }],
  },
  networks: {
    /*
    hardhat: {
      mining: {
        auto: false,
        interval: 5000,
      },
    },
    */
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 5,
    },
    muambai: {
      url: process.env.MUAMBAI_URL || "",
      accounts: [process.env.PRIVATE_KEY!, process.env.PRIVATE_KEY_2!],
      chainId: 80001,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    // outputFile: "gas-report.txt",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY!,
    token: "ETH",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;
