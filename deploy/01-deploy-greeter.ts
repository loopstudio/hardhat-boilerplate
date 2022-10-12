import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { network } from "hardhat";

import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId || 31337;
  const currentNetworkConfig = networkConfig[chainId];

  if (!currentNetworkConfig) {
    return log("Network confguration not found");
  }

  const contractToDeploy = "Greeter";
  log(`Starting to deploy ${contractToDeploy}`);
  const constructorArgs = ["Hello from Loop"];

  const greeter = await deploy(contractToDeploy, {
    from: deployer,
    args: constructorArgs,
    log: true,
    waitConfirmations: currentNetworkConfig.confirmations || 6,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY &&
    process.env.VERIFY_CONTRACT === "true"
  ) {
    await verify(greeter.address, constructorArgs);
  }

  log(`${contractToDeploy} deployed successfully`);
};

func.tags = ["all", "greeter"];
export default func;
