const ShipDAOToken = artifacts.require("ShipDAOToken");

module.exports = function (deployer) {
    deployer.deploy(ShipDAOToken);
} as Truffle.Migration;
