import { run } from "hardhat";

export async function verify(contractAddress: string, args: any) {
  console.log("Verifying contract ..");
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
}
