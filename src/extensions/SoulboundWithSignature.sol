// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;
import "./SoulboundCore.sol";

/**
* @title SoulboundWithSignature.
* @author Anthony (fps) https://github.com/fps8k.
* @dev 
*
*/
contract SoulboundWithSignature is SoulboundCore {
    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner,
        uint256 totalSupply
    )
    SoulboundCore(
        name, 
        symbol, 
        _allowlistOwner, 
        totalSupply
    ) {}

    /**
    * @dev Ref SoulboundCore.sol issueWithSignature
    *       This function grants the access to only the
    *       deployer of the contract, unlike the core
    *       that allows the function for anyone who has a
    *       signature signed by the allowlistOwner.
    */
    function ownerIssueWithSignature(
        address addr,
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyOwner
    {
        /// @dev Ensure that the supply is not crossed.
        require(supply <= TOTAL_SUPPLY, "Issue Cap Reached.");
        /// @dev Issue With Signature.
        issueWithSignature(
            addr,
            hash,
            sig,
            tokenId,
            tokenURI
        );
    }

    /**
    * @dev Ref SoulboundCore.sol revokeWithSignature
    *       This function grants the access to only the
    *       deployer of the contract, unlike the core
    *       that allows the function for anyone who has a
    *       signature signed by the allowlistOwner.
    */
    function ownerRevokeWithSignature(
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId
    ) public onlyOwner
    {
        /// @dev    If the supply control is not 0,
        ///         decrement the supply.
        if (supply != 0) {
            supply--;
        }

        /// @dev Revoke With Signature.
        revokeWithSignature(
            hash,
            sig,
            tokenId
        );
    }
}