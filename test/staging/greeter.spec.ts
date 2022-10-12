import { expect } from "chai";
import { ethers, deployments, network } from "hardhat";
import { networkConfig } from "../../helper-hardhat-config";

import { Greeter } from "../../typechain-types/contracts/Greeter";

const HARDHAT_NETWORK_ID = 31337;

describe("Greeter", function () {
  let greeter: Greeter;

  let chainId = network.config.chainId || HARDHAT_NETWORK_ID;
  let currentNetworkConfig = networkConfig[chainId];

  before(async function () {
    await deployments.fixture(["greeter"]);
    greeter = await ethers.getContract("Greeter");
  });

  describe("setGreeting", function () {
    it("Should return the new greeting once it's changed", async function () {
      expect(await greeter.greet()).to.equal("Hello from Loop");
      const tx = await greeter.setGreeting("Im the owner");
      await tx.wait(currentNetworkConfig.confirmations);
      expect(await greeter.greet()).to.equal("Im the owner");
    });
  });
});
