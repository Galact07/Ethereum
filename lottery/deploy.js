const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile.js");
const provider = new HDWalletProvider(
  "spatial rubber puppy original bleak rose wild gloom palm exist bird annual",
  "https://goerli.infura.io/v3/e8821f49dabd4c43b702605f3b7bf916"
);

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: "1000000" });

    console.log(interface);
    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (error) {
    console.log(error);
  }
};

deploy();
