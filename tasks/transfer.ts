import { utils } from "ethers";
import { task } from "hardhat/config";

task("transfer", "Transfers a given amount to a specific address")
  .addParam("tokenaddress", "The contract's address")
  .addParam("account", "The account's address")
  .addParam("amount", "The given amount")
  .setAction(async (taskArgs, hre) => {
    const LoopToken = await hre.ethers.getContractFactory("LoopToken");
    const loopToken = LoopToken.attach(taskArgs.tokenaddress);
    const amount = utils.parseEther(taskArgs.amount);

    const transfer = await loopToken.transfer(taskArgs.account, amount);
    if (transfer) {
      console.log("Transaction completed:");
      console.log("Transferred:", taskArgs.amount, "LT to:", taskArgs.account);
    }
  });
