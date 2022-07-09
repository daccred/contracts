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
    /// @dev Deploys the 3 contracts inherited by the SoulboundCore.
    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner
    )
    Soulbound(name, symbol)
    Allowlist(_allowlistOwner) {}

    /// @dev Emitted when a token is minted from Signature.
    event IssueWithSignature(address indexed to, uint256 indexed quantity);
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
    * @param quantity   Quantity of the tokens to mint to the `addr`.
    */
    function issueWithSignature(
        address addr,
        bytes32 hash,
        bytes memory sig,
        uint256 quantity
    ) public onlyOwner
    {
        /// @dev Require that the address is not a zero address.
        require(addr != address(0), "ERC721:: Mint to zero address.");
        /// @dev    Require that the hash is actually 32 [64 characters]
        ///         in length.
        require(hash.length == 32, "ERC721:: Invalid hash.");
        /// @dev Require the length of the signature is 65.
        require(sig.length == 65, "ERC721:: Invalid signature length");
        /// @dev Require that the quantity is GT 0.
        require(quantity != 0, "ERC721:: Mint of zero tokens.");
        /// @dev    Verifies that the address was actually signed by the
        ///         allowlistOwner.
        require(verifySignature(hash, sig), "ERC721:: Hash not signed by owner.");
        /// @dev    Mint the tokens to address.
        ///         [Ref Soulbound.sol].
        mintSoulboundToken(addr, quantity);
        /// @dev Emit the IssueWithSignature event.
        emit IssueWithSignature(addr, quantity);
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
    ) public onlyOwner
    {
        /// @dev Require that the token exists.
        require(_exists(tokenId), "ERC721:: Revoke of inexistent token.");
        /// @dev    Require that the hash is actually 32 [64 characters]
        ///         in length.
        require(hash.length == 32, "ERC721:: Invalid hash.");
        /// @dev Require the length of the signature is 65.
        require(sig.length == 65, "ERC721:: Invalid signature length");
        /// @dev    Verifies that the address was actually signed by the
        ///         allowlistOwner.
        require(verifySignature(hash, sig), "ERC721:: Hash not signed by owner.");
        /// @dev    Mint the tokens to address.
        ///         [Ref Soulbound.sol].
        burnSoulboundToken(tokenId);
        /// @dev Emit the RevokeWithSignature event.
        emit RevokeWithSignature(tokenId);
    }
}
