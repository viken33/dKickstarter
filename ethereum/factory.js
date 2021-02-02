import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x2F06BC9cF9BE364c9524261764555f6b20DD3983"
  // "0x3aC79D29a1C687B4A20Af08b3fa4Cd3FA46D4241"
);

export default instance;
