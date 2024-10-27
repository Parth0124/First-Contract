const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  "auction unusual stage promote hour trade apart bring shift knock cradle country",
  "https://sepolia.infura.io/v3/1bd2d3e45a0643cf8c28f07dfd758068"
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log("Account going to be used",accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments: ["The message for deployed contract"]})
    .send({gas: '1000000', from: accounts[0]});

    console.log("Contract deployed to: ", result.options.address);
    provider.engine.stop()
}

deploy();