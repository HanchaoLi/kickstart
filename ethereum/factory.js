import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x73B28f86e1314e8bd6079B531933b5150860c9db'
);

export default instance;
