import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x303533a242DC2117731B2F5E33816D83D09b0fe9'
);

export default instance;
