var Migrations = artifacts.require("./Migrations.sol");
var Will = artifacts.require("./Will.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Will, 4, 20, 2069, 'Dank', 'Meme', 69);
};
