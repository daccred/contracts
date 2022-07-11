// SPDX-License-Identifier: GPL-3.0

/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;
import "./Soulbound.sol";
import "./Ownable.sol";
import "./Allowlist.sol";

/**
* @title Soulbound Core Contract.
* @author Daccred.
* @dev Soulbound Core template.
*/
contract SoulboundCore is Ownable, Soulbound, Allowlist {
    uint256 internal TOTAL_SUPPLY;
    /// @dev    With every issue and revoke, this value
    ///         increases and reduces.
    ///         It cannot be GT the TOTAL_SUPPLY.
    uint256 internal supply;
    /// @dev Deploys the 3 contracts inherited by the SoulboundCore.
    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner,
        uint256 totalSupply
    )
    Soulbound(name, symbol)
    Allowlist(_allowlistOwner) {
        if (totalSupply == 0) {
            TOTAL_SUPPLY = 1e6;
        } else {
            TOTAL_SUPPLY = totalSupply;
        }
    }

    /// @dev Emitted when a token is minted from Signature.
    event IssueWithSignature(address indexed to, uint256 indexed tokenId);
    /// @dev Emitted when a token is revoked with Signature.
    event RevokeWithSignature(uint256 indexed tokenId);

    /**
    * @dev  Mints a particular quantity of tokens to `to`, 
    *       on the condition that the address has been 
    *       signed by the allowlistOwner off-chain.
    *       This will emit the {MintSoulboundToken} event
    *       from the Soulbound.sol.
    *
    * @param addr       Address to mint tokens to.
    * @param hash       Hashed message by the allowlistOwner.
    * @param sig        Signature, signed by the allowlistOwner.
    * @param tokenId    Id of the tokens to mint to the `addr`.
    * @param tokenURI   URI of the token to be minted.
    */
    function issueWithSignature(
        address addr,
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId,
        string memory tokenURI
    ) public
    {
        /// @dev Require that the address is not a zero address.
        require(addr != address(0), "Mint to zero address.");
        /// @dev    Require that the hash is actually 32 [64 characters]
        ///         in length.
        require(hash.length == 32, "Invalid hash.");
        /// @dev Require the length of the signature is 65.
        require(sig.length == 65, "Invalid signature length");
        /// @dev    Verifies that the address was actually signed by the
        ///         allowlistOwner.
        require(verifySignature(hash, sig), "Hash not signed by owner.");
        /// @dev    Mint the tokens to address.
        ///         [Ref Soulbound.sol].
        issue(addr, tokenId, tokenURI);
        /// @dev Emit the IssueWithSignature event.
        emit IssueWithSignature(addr, tokenId);
    }

    /**
    * @dev  Revokes the ownership of `tokenId` from the owner.
    *       The token must exist and the signature must be signed the
    *       allowlistOwner.
    *       This emits the {RevokeWithSignature} event.
    *
    * @param hash       Hashed message by the allowlistOwner.
    * @param sig        Signature, signed by the allowlistOwner.
    * @param tokenId    Id of the token to revoke.
    */
    function revokeWithSignature(
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId
    ) public
    {
        /// @dev Require that the token exists.
        require(_exists(tokenId), "Revoke of inexistent token.");
        /// @dev    Require that the hash is actually 32 [64 characters]
        ///         in length.
        require(hash.length == 32, "Invalid hash.");
        /// @dev Require the length of the signature is 65.
        require(sig.length == 65, "Invalid signature length");
        /// @dev    Verifies that the address was actually signed by the
        ///         allowlistOwner.
        require(verifySignature(hash, sig), "Hash not signed by owner.");
        /// @dev    Mint the tokens to address.
        ///         [Ref Soulbound.sol].
        revoke(ownerOf(tokenId), tokenId);
        /// @dev Emit the RevokeWithSignature event.
        emit RevokeWithSignature(tokenId);
    }
}
