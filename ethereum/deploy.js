const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'crazy fix reflect honey very stadium hair jazz pact keen thunder click',
  'https://rinkeby.infura.io/PXz2GqPsqv3fYJIA3m1I'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  // .deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] })
  .deploy({ data: '0x' + compiledFactory.bytecode})
  .send({ gas: '1000000',from: accounts[0]});


  console.log('Contract deployed to', result.options.address);
};
deploy();
