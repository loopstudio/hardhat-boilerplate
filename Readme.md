<br/>
<p align="center">
  <img src="./hardhat.png" width="225" alt="Hardhat logo">
  <div align="center"> Created and maintained with ❤️ by
    <a href="[https://loopstudio.dev/](https://loopstudio.dev/)">LoopStudio</a>
    <img src="./loop.png" width="15" alt="Hardhat logo">

  </div>

  </p>
<br/>

# Hardhat Boilerplate

Hardhat development boilerplate that enables to:

- Deploy to multiple networks
- Run tests with `hardhat-chai-matchers` against local and test networks
- Analyze coverage and gas ussage of our contracts
- Verify contracts source code on etherscan
- Use typescript on contract instances

# Technical Details

## Stack

- Solidity
- Hardhat
  - hardhat-deploy
  - hardhat-toolbox
    - hardhat-ethers
    - hardhat-etherscan
    - hardhat-chai-matchers
    - hardhat-network-helpers
    - solidity-gas-reporter
    - typechain
    - solidity-coverage
- Openzeppelin Contracts
- Typescript

## Project Structure

```
.
├── contracts/
├── deploy/
├── deployments
├── tasks
├── typechain-types
├── utils
├── test
├── hardhat.config.ts
├── helper-hardhat-config.ts
```

### What does each folder represents?

- contracts: where contracts are placed
- deploy: `hardhat-deploy` scripts to deploy to localhost, testnet and mainnet. The scripts also verifies contract source code to `etherscan`
- deployment: information about old deploys and ABI, generated by `hardhat-deploy`
- tasks: hardhat tasks to interact with the example contracts after its deployed to a network
- typechain-types: types definitions for each contract generated by `typechain`
- utils: verify sourcecode against `etherscan`
- test: unit and staging tests.
- hardhat.config.ts: hardhat configuration file. Currenlty supports `ethereum` and `polygon` networks configuration.
- helper-hardhat-config.ts: helper file containing information per network, like # of confirmations, Chainlink smart contract addresses and subscriptions.



## Getting started

## Config

1. Copy `.env.example` to `.env`
2. Fullfil the following properties:

```
GOERLI_URL=[INFURA OR ALCHEMY RPC URL]
MUAMBAI_URL=[INFURA OR ALCHEMY RPC URL] // Optional: for polygon deployment
PRIVATE_KEY=[DEPLOYER_PRIVATE_KEY]
PRIVATE_KEY_2=[ANOTHER_ACCOUNT_PRIVATE_KEY] // Optional
REPORT_GAS=true
ETHERSCAN_API_KEY=[YOUR_ETHERSCAN_API_KEY]
VERIFY_CONTRACT=false
COINMARKETCAP_API_KEY=[YOUR_COINMARKETCAP_API_KEY] // Optional: only needed by hardhat-gas-reporter.
```

## Instalation

- `yarn install` (we recommend using yarn over npm because resolves the `ethers` dependency correctly when using `hardhat-deploy`)

## Deploy

- Deploy to localhost `yarn run deploy`
- Deploy to ethereum testnet `yarn run deploy-goerli`
- Deploy to polygon testnet `yarn run deploy-muambai`

## Test

Tests are separated between `unit` and `staging` tests.

`unit` tests are for testing contracts public API on hardhat network; meanwhile `staging` tests are for running on testnet. The staging example provided also deploys the contract on each test suite execution.

- Unit: `yarn run test`
- Staging: `yarn run test-staging`
- Coverage: `yarn run coverage`

## Types

This boilerplate uses `typechain` capabilties to prevent errors and ensure correct behaviour, therefore types should be generated:

- `yarn run types`

## Prettier and linter

- `yarn run format`
- `yarn run lint`

## Example tasks

Boilerplate comes with some example tasks:

- Get balance of an address: `npx hardhat balance-of --tokenaddress 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 --account 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --network localhost`

- Transfer tokens: `npx hardhat transfer --tokenaddress 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 --account 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 --amount 0.1 --network localhost`

In order to run them, a contract deploy must be done. Open two consoles and:

1. Run `yarn hardhat node` on first one
2. Run `yarn hardhat deploy --network localhost` on the second one

You can execute tasks on the second terminal and see the transactions on the first one.

## Continuous integration

Each PR made to gitflow standard branches will execute the unit tests using Github Actions.

Configuration can be found at `.github/workflows/tests.yml`

# Contributing

Contributions are always welcome. Please open a PR or an issue.
