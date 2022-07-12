// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;
import "./SoulboundWithSignature.sol";
import "./IsValidWithDate.sol";

/**
* @title Soulbound Redeemable.
* @author Daccred.
* @dev 
*
Aster, AST, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 5
*/
contract SoulboundRedeemable is IsValidWithDate, SoulboundWithSignature {
    /// @dev    Constructor deploys the SoulboundCore and
    ///         sets a totalSupply.
    uint256 public extensionTime;

    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner,
        uint256 currentSupply
    )
    SoulboundWithSignature(
        name, 
        symbol, 
        _allowlistOwner, 
        currentSupply
    ) {}

    function withPaidRedemption(address tokenOwner, uint256 tokenId) public payable {
        require(_exists(tokenId), "Redemption for inexistent token.");
        require(ownerOf(tokenId) == tokenOwner, "Redemption for unowned token");
        extendExpiry(tokenId, extensionTime);
    }

    function redeemWithSignature(
        address tokenOwner,
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId
    ) public payable onlyOwner
    {
        require(_exists(tokenId), "Redemption for inexistent token.");
        require(ownerOf(tokenId) == tokenOwner, "Redemption for unowned token");
        require(verifySignature(hash, sig), "Unsigned signature");
        extendExpiry(tokenId, extensionTime);
    }

    function issueTokenWthExpiry(
        uint256 tokenId,
        address tokenOwner,
        string memory tokenURI,
        uint256 expiryDate
    ) public
    {
        require(!_exists(tokenId), "Mint of existent token.");

        if (expiryDate == 0) {
            extendExpiry(tokenId, 36500 days);
        } else {
            extendExpiry(tokenId, expiryDate);
        }
        
        issue(
            addr, 
            tokenId, 
            tokenURI
        );
    }
}
