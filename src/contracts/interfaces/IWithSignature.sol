// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
* @title IWithSignature Interface.
* @author Anthony (fps) https://github.com/fps8k.
* @dev 
*/


interface IWithSignature {

    // ===== E V E N T S =====

    /// @dev Emitted when the token is minted.
    event Minted(address indexed _address, uint256 indexed tokenId);
    /// @dev Thrown when the minting fails, because of insufficient eth or otherwise.
    error MintError(address _address, uint256 tokenId, bytes32);
    /// @dev Emitted when `tokenId` token is transferred from `from` to `to`.
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 indexed tokenId
    );

    // ===== E V E N T S =====

    /**
    * @dev Verifies that an address is part of the Allowlist.
    * By verifying that the public key that signed `_signature` is the caller of the function.
    * Emits the {Verified} event.
    * In error cases, throw the {Unsigned} error.
    *
    * @param
    * _hash, hash of the address signed off-chain.
    * _signature, signature to verify.
    *
    * @return bool, true if the signer is the contract and false if otherwise.
    */
    function verifySignature(bytes32 _hash, bytes memory _signature) external returns(bool);

    /**
    * @dev Mints a token on behalf of the user.
    * The user interacts with this function.
    * The function mints the token to itself.
    * Then transfers to the user.
    * Emits the {Minted} and {Transfer} event.
    *
    * @param tokenId, token to be minted.
    */
    function mintOnBehalf(uint256 tokenId) external;
}

