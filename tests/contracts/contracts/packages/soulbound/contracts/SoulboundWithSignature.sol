// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

import "./SoulboundCore.sol";

/**
 * @title SoulboundWithSignature.
 * @author Daccred.
 * @dev  SoulboundWithSignature contract template allows freedom of
 *       issuing and revoking tokens with Signature while controlling
 *       the totalSupply of the token.
 */
contract SoulboundWithSignature is SoulboundCore {
    /// @dev Deploys inherited contract and sub contracts.
    constructor(
        string memory name,
        string memory symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    ) SoulboundCore(name, symbol, _allowlistOwner, _totalSupply) {}

    /**
     * @dev Ref SoulboundCore.sol issueWithSignature
     *       This function grants the access to only the
     *       deployer of the contract, unlike the core
     *       that allows the function for anyone who has a
     *       signature signed by the allowlistOwner.
     *       This contract can be called by the deployer of the
     *       contract [DaccredDeployer] but is also protected
     *       as to the allowlistOwner must be the signer of the `sig.`
     *
     * @notice Callable by the deployer of this contract [DaccredDeployer].
     *
     * @param addr       Address to be minted to.
     * @param hash       Hash of message signed.
     * @param sig        Signature.
     * @param tokenId    TokenId to be issued.
     * @param tokenURI   URI of token to be issued.
     */
    function ownerIssueWithSignature(
        address addr,
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyOwner {
        /// @dev Ensure that the supply is not crossed.
        /// @dev    Should all soulbound tokens need to be limited,
        ///         copy this code and paste in Soulboundcore.sol
        ///         issueWithSignature function.
        require(supply < totalSupply, "Issue Cap Reached.");
        /// @dev Issue With Signature.
        issueWithSignature(addr, hash, sig, tokenId, tokenURI);
        /// @dev Incrememt supply on successful issue.
        supply++;
    }

    /**
     * @dev Ref SoulboundCore.sol revokeWithSignature
     *       This function grants the access to only the
     *       deployer of the contract, unlike the core
     *       that allows the function for anyone who has a
     *       signature signed by the allowlistOwner.
     *       This contract can be called by the deployer of the
     *       contract [DaccredDeployer] but is also protected
     *       as to the allowlistOwner must be the signer of the `sig.`
     *
     * @notice Callable by the deployer of this contract [DaccredDeployer].
     *
     * @param hash       Hash of message signed.
     * @param sig        Signature.
     * @param tokenId    TokenId to be issued.
     */
    function ownerRevokeWithSignature(
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId
    ) public onlyOwner {
        /// @dev    If the supply control is not 0,
        ///         decrement the supply.
        ///         Should all soulbound tokens need to be limited,
        ///         copy this code and paste in Soulboundcore.sol
        ///         revokeWithSignature function.
        if (supply != 0) {
            /// @dev Decrement supply.
            supply--;
        } else {
            /// @dev Throw error if 0 is reached.
            revert("Lowest limit reached.");
        }

        /// @dev Revoke With Signature.
        revokeWithSignature(hash, sig, tokenId);
    }
}
