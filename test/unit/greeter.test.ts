import { expect } from "chai";
import {
  ethers,
  deployments,
  network,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { developmentChains } from "../../helper-hardhat-config";

import { Greeter } from "../../typechain-types/contracts/Greeter";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Greeter", function () {
      let greeter: Greeter;

      beforeEach(async function () {
        greeter = await loadFixture(deployGreeterFixture);
      });

      async function deployGreeterFixture() {
        await deployments.fixture(["greeter"]);
        const greeter = await ethers.getContract("Greeter");
        return greeter;
      }

      describe("constructor", function () {
        it("Should set the right owner", async () => {
          const { deployer } = await getNamedAccounts();
          await expect(await greeter.owner()).to.be.eq(deployer);
        });
      });

      describe("setGreeting", function () {
        it("Should return the new greeting once it's changed", async function () {
          expect(await greeter.greet()).to.equal("Hello from Loop");
          await greeter.setGreeting("Im the owner");
          expect(await greeter.greet()).to.equal("Im the owner");
        });

        it("Should revert if not owner", async () => {
          let user = await ethers.getSigner((await getUnnamedAccounts())[0]);
          await expect(
            greeter.connect(user).setGreeting("Im the owner")
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });
      });
    });
