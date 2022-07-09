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
    uint256 internal immutable CAP;
    /// @dev    With every issue and revoke, this value
    ///         increases and reduces.
    ///         It cannot be GT the cap.
    uint256 internal capControl;

    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner,
        uint256 cap
    )
    SoulboundCore(name, symbol, _allowlistOwner) {
        CAP = cap;
    }

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
        /// @dev Ensure that the cap is not crossed.
        require(capControl <= CAP, "Issue Cap Reached.");
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
        /// @dev    If the cap control is not 0,
        ///         decrement the capControl.
        if (capControl != 0) {
            capControl--;
        }

        /// @dev Revoke With Signature.
        revokeWithSignature(
            hash,
            sig,
            tokenId
        );
    }
}