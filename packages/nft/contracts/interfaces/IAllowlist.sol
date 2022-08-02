// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.4;

/**
 * @title IAllowlist Interface.
 * @author Daccred.
 * @dev
 * Whitelist or Allowlists are popular gating mechanisms when minting NFTs.
 * It allows NFTs to be minted by or to some specific addresses that have been "Whitelisted".
 * To make sure that the minting addresses are verified, there are some validation methods put in place.
 * The one to be used here is the Public Signature Mechanics Method (ECDSA).
 * [Ref:: https://medium.com/donkeverse/hardcore-gas-savings-in-nft-minting-part-2-signatures-vs-merkle-trees-917c43c59b07].
 * This interface contains functions that verifies that the caller [contract] has signed the whitelisted address.
 * This is more gas efficient. [Ref:: Link above].
 */

interface IAllowlist {
    // ===== E V E N T S =====

    /// @dev Emitted when an address is signed.
    event Signed(address indexed _address);
    /// @dev Emitted when the address passed to the verify function returns true.
    event Verified(address indexed _address);
    /// @dev Thrown when the address passed to the verify function is not signed.
    error Unsigned(address _address);

    // ===== E V E N T S =====

    /**
     * @dev Verifies that the public key that signed `_signature` is the caller of the function.
     * Emits the {Verified} event.
     * In error cases, throw the {Unsigned} error.
     *
     * @param
     * _hash, hash of the address signed off-chain.
     * _signature, signature to verify.
     *
     * @return bool, true if the signer is the contract and false if otherwise.
     */
    function verifySignature(bytes32 _hash, bytes memory _signature) external returns (bool);

    /**
     * @dev Verifies that the public key that signed `_signature` is the `_signer`.
     * Emits the {Verified} event.
     * In error cases, throw the {Unsigned} error.
     *
     * @param
     * _signer, address to be verified.
     * _hash, hash of the address signed off-chain.
     * _signature, signature to verify.
     *
     * @return bool, true if the signer is the contract and false if otherwise.
     */
    function verifySigner(
        address _signer,
        bytes32 _hash,
        bytes memory _signature
    ) external returns (bool);
}
