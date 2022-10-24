require("dotenv").config();
const config = require("../config.json");
//I think i want the hardhat version of truffles hd wallet provider and the import for it(likely using ethers.js).
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("hardhat");

let web3;

if (!config.PROJECT_SETTINGS.isLocal) {
  const provider = new HDWalletProvider({
    privateKeys: [process.env.PRIVATE_KEY],
    providerOrUrl: `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  });

  web3 = new Web3(provider);
} else {
  web3 = new Web3("ws://127.0.0.1:7545");
}

const IUniswapV2Router02 = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json");
const IUniswapV2Factory = require("@uniswap/v2-core/build/IUniswapV2Factory.json");

const uFactory = new web3.eth.Contract(
  IUniswapV2Factory.abi,
  config.UNISWAP.FACTORY_ADDRESS
); // UNISWAP FACTORY CONTRACT
const uRouter = new web3.eth.Contract(
  IUniswapV2Router02.abi,
  config.UNISWAP.V2_ROUTER_02_ADDRESS
); // UNISWAP ROUTER CONTRACT
const sFactory = new web3.eth.Contract(
  IUniswapV2Factory.abi,
  config.SUSHISWAP.FACTORY_ADDRESS
); // SUSHISWAP FACTORY CONTRACT
const sRouter = new web3.eth.Contract(
  IUniswapV2Router02.abi,
  config.SUSHISWAP.V2_ROUTER_02_ADDRESS
); // SUSHISWAP ROUTER CONTRACT

//Arbitrage.json is an interface, what happens when i comment this network bit out?
const IArbitrage = require("../artifacts/contracts/Arbitrage.sol/Arbitrage.json");
const arbitrage = new web3.eth.Contract(
  IArbitrage.abi
  // IArbitrage.networks[1].address     //This could be a further error when we try to deploy contract and bot together
);

module.exports = {
  uFactory,
  uRouter,
  sFactory,
  sRouter,
  web3,
  arbitrage,
};
