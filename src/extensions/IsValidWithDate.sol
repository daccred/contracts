// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;

/**
* @title IsValidWithDate contract.
* @author Daccred.
* @dev 
*/
contract IsValidWithDate {
    mapping(uint256 => uint256) internal tokenExpiryDate;
    /// @dev    Constructor deploys the SoulboundCore and
    ///         sets a totalSupply.

    function extendExpiry(uint256 tokenId, uint256 newExpiryDate) 
    public
    {
        tokenExpiryDate[tokenId] = block.timestamp + newExpiryDate;
    }

    function getExpiryDate(uint256 tokenId) public view returns(uint256) {
        return tokenExpiryDate[tokenId];
    }

    function isValid(uint256 tokenId) public view returns(bool) {
        return block.timestamp <= getExpiryDate(tokenId);
    }

    function getTimeLeft(uint256 tokenId) public view returns(uint256) {
        if (block.timestamp > getExpiryDate(tokenId)) {
            return 0;
        } else {
            return getExpiryDate(tokenId) - block.timestamp;
        }
    }
}
