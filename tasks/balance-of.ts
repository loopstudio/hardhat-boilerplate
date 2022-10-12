import { utils } from "ethers";
import { task } from "hardhat/config";

task("balance-of", "Displays an account's balance")
  .addParam("tokenaddress", "The token address")
  .addParam("account", "The account address")
  .setAction(async (taskArgs, hre) => {
    const LoopToken = await hre.ethers.getContractFactory("LoopToken");
    const loopToken = LoopToken.attach(taskArgs.tokenaddress);
    const balance = await loopToken.balanceOf(taskArgs.account);
    console.log(`Account's balance: ${utils.formatEther(balance)} LT`);
  });
