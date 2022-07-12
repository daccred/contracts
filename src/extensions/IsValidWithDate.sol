// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;

/**
* @title IsValidWithTime contract.
* @author Daccred.
* @dev 
*/
contract IsValisWithDate {
    uint256 internal expiryDate;
    /// @dev    Constructor deploys the SoulboundCore and
    ///         sets a totalSupply.
    constructor(uint256 desiredExpiry) {
        if (desiredExpiry != 0) {
            expiryDate = block.timestamp + desiredExpiry;
        } else {
            expiryDate = block.timestamp + 36500 days;
        }
    }

    function getExpiryDate() public view returns(uint256) {
        return expiryDate;
    }

    function isExpired() public view returns(bool) {
        return block.timestamp > expiryDate;
    }

    function getTimeLeft() public view returns(uint256) {
        if (block.timestamp > expiryDate) {
            return 0;
        } else {
            return expiryDate - block.timestamp;
        }
    }
}
