// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;

/**
* @title IWithSignature Interface.
* @author Daccred.
* @dev 
*/


interface IWithSignature {

    // ===== E V E N T S =====

    /// @dev Emitted when the token is minted.
    event IssueWithSignature(address indexed _address, uint256 indexed tokenId);
    /// @dev Thrown when the minting fails, because of insufficient eth or otherwise.
    error IssueWithSignatureError(address _address, uint256 tokenId, bytes32);
    /// @dev Emitted when the token is revoked.
    event RevokeWithSignature(address indexed _address, uint256 indexed tokenId);

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
    * @dev  Mints `quantity` number of tokens to `to`.
    *       On the condition that the hash of `to`, has 
    *       been verified with Signature.
    * Emits the {IssueWithSignature} event.
    *
    * @param to         Address of receiver.
    * @param quantity   Amount to mint to `to`.
    */
    function issueWithSignature(address to, uint256 quantity) external;

    /**
    * @dev Revokes the user's token ownership by burning.
    *
    * @param tokenId, token to be minted.
    */
    function revokeWithSignature(uint256 tokenId) external;
}

