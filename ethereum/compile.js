const solc = require("solc");
const fs = require("fs-extra");
const path = require("path");

// busco el directior build y lo borro todo
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

//busco el path de los contratos y los compilo
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
console.log(source);
const output = solc.compile(source, 1).contracts;
// vuelvo a crear build con los outputs compilados
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
