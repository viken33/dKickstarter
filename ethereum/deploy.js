const HDwalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3"); /// usamos mayusculas porque importamos un constructor
const ganache = require("ganache-cli");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDwalletProvider(
  "",
  "https://rinkeby.infura.io/v3/81251d5cd4c545548641dc3cf8ce2959"
);

const web3 = new Web3(provider);
// const web3 = new Web3(ganache.provider());

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("deployando contracto desde:", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: 1000000 });
  console.log("Address donde quedo el contrato", result.options.address);
};
deploy();

// deployando contracto desde: 0xf1e2Bc6782CE613E4425942c81B8455A6C3d3f83
// Address donde quedo el contrato 0x3aC79D29a1C687B4A20Af08b3fa4Cd3FA46D4241
