// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.8;

import "./Soulbound.sol";
import "../../common/Allowlist.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Soulbound Core Contract.
 * @author Daccred.
 * @dev  Soulbound Core template. This contract aims at a soulbound token with
 *       capped supply, set by the deployer or defaulted to 1000000.
 *       Mints and burns affect the current supply of tokens respectively.
 */
contract SoulboundCore is Ownable, Soulbound, Allowlist {
    /// @dev Total supply limit set by deployer or defaulted to 1000000.
    uint256 internal totalSupply;
    /// @dev    With every issue and revoke, this value
    ///         increases and reduces.
    ///         It cannot be GT the TOTAL_SUPPLY.
    uint256 internal supply;

    /// @dev Emitted when a token is minted from Signature.
    event IssueWithSignature(address indexed to, uint256 indexed tokenId);
    /// @dev Emitted when a token is revoked with Signature.
    event RevokeWithSignature(uint256 indexed tokenId);

    /**
     * @dev  Security check to require that the address calling a particular
     *       function is the allowlistOwner.
     *
     * @param _caller Address.
     */
    modifier onlyAllowlistOwner(address _caller) {
        require(_caller == getAllowlistOwner(), "Not Allowlist Owner!");
        _;
    }

    /// @dev Deploys the 3 contracts inherited by the SoulboundCore.
    constructor(
        string memory name,
        string memory symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    ) Soulbound(name, symbol) Allowlist(_allowlistOwner) {
        if (_totalSupply == 0) {
            totalSupply = 1e6;
        } else {
            totalSupply = _totalSupply;
        }
    }

    /**
     * @dev  Mints a particular quantity of tokens to `to`,
     *       on the condition that the address has been
     *       signed by the allowlistOwner off-chain.
     *       This will emit the {MintSoulboundToken} event
     *       from the Soulbound.sol.
     *
     * @notice Callable by anyone.
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
    ) public {
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
     * @notice Callable by anyone.
     *
     * @param hash       Hashed message by the allowlistOwner.
     * @param sig        Signature, signed by the allowlistOwner.
     * @param tokenId    Id of the token to revoke.
     */
    function revokeWithSignature(
        bytes32 hash,
        bytes memory sig,
        uint256 tokenId
    ) public {
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

    /**
     * @dev  Allows the `caller` (allowlistOwner) to set the baseURI.
     *       This is really important when the caller wants to mint
     *       Multiple tokens with the same base URI.
     *
     * @notice   Callable by the deployer of this contract [DaccredDeployer]
     *           and the allowlistOwner.
     */
    function setBaseURI(address caller, string memory _baseURI)
        public
        onlyOwner
        onlyAllowlistOwner(caller)
    {
        /// @dev Set baseURI.
        _setBaseURI(_baseURI);
    }

    /**
     * @dev  Using the `tokenId` passed, it generates a `stringified` tokenURI,
     *       packing the baseURI and the current tokenId.
     *       Makes use of OpenZeppelin's uint to string function.
     *
     * @notice Callable by anyone.
     *
     * @param tokenId ID of token whose tokenURI is desired.
     *
     * @return _tokenURI TokenURI of the passed tokenId.
     */
    function generateTokenURI(uint256 tokenId)
        public
        view
        returns (string memory _tokenURI)
    {
        /// @dev Require baseURI length is not currently 0.
        require(bytes(_getBaseURI()).length != 0, "Empty baseURI");
        /// @dev Return a packed tokenURI string.
        _tokenURI = string(abi.encodePacked(_getBaseURI(), toString(tokenId)));
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     *      Copied from OpenZeppelin.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
