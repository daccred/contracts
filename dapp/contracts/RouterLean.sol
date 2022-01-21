// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './impl/IDacredFactory.sol';
import './impl/DacredFactory.sol';

contract RouterLean {
  uint256 public __init_date__;
  /** data access obj for certificate contracts */
  struct Daccred {
    DacredFactory contractAddress;
    address deployer;
    string certificateId;
    uint256 createdAt;
  }

  mapping(address => Daccred) public credentials;
  event NewContractCreated(address contractAddress, uint256 createdAt);

  constructor() {
    __init_date__ = block.timestamp;
  }

  function createContractForClient(string memory name, string memory certId) public returns (address) {
    address deployer = msg.sender;
    uint256 timestamp = block.timestamp;

    /* Generate new credential NFT contract */
    DacredFactory newContract = new DacredFactory(name, certId);

    /* persist to contract store */
    credentials[address(newContract)] = Daccred(newContract, deployer, certId, timestamp);

    emit NewContractCreated(address(newContract), timestamp);
    return address(newContract);
  }
}
