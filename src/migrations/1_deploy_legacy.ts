const Badge = artifacts.require("Badge")

module.exports = function (deployer) {
  /* Deploy the daccred contract, ERC name and symbol */
  deployer.deploy(Badge, "NFT School Class of 2020", "NSC20");
} as Truffle.Migration;
