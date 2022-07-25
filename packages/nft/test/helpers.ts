const { ethers } = require("hardhat");
import { BN } from 'bn.js'

export const deployContract = async function (contractName: string, constructorArgs: any) {
  let factory;
  try {
    factory = await ethers.getContractFactory(contractName);
  } catch (e) {
    factory = await ethers.getContractFactory(contractName + 'UpgradeableWithInit');
  }
  let contract = await factory.deploy(...(constructorArgs || []));
  await contract.deployed();
  return contract;
};


export const constants = {
  ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
  ZERO_BYTES32: '0x0000000000000000000000000000000000000000000000000000000000000000',
  MAX_UINT256: new BN('2').pow(new BN('256')).sub(new BN('1')),
  MAX_INT256: new BN('2').pow(new BN('255')).sub(new BN('1')),
  MIN_INT256: new BN('2').pow(new BN('255')).mul(new BN('-1')),
};
