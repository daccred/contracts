// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./Ownable.sol";
import "../interfaces/IAllowlist.sol";

/**
 * @title Allowlist Contract.
 * @author Daccred.
 * @dev  The allowlist contract serves as a general inheritable
 *       contract that any contract with the need of working with
 *       signatures and signature verifications can inherit and
 *       work with with ease.
 *       Allowlists allow you to ensure that a particular address
 *       has been signed by a particular contract, and is therefore
 *       eligible to receive or be minted a particular token or
 *       partcular sets of tokens.
 *       It will be necessary to state that this contract will be
 *       directly owned by the Daccred.sol [link here], but on
 *       deploy, the address of the wallet deploying the contract
 *       will be stored as the `allowlistOwner`, this address
 *       cannot be changed, and this address will be evaluated for
 *       incoming signature confirmations.
 *       The address must be the signer of the signature.
 *       Changing this address means changing every signature
 *       signed. This is not good.
 *
 *       For clarity:
 *       Contract deployer: Daccred.sol.
 */
contract Allowlist is IAllowlist, Ownable {
    /// @dev    The wallet that initiated the transaction to deploy
    ///         this allowlist contract
    ///         [And other subsequent ones inheriting this],
    ///         passed as msg.sender from the Daccred.sol.
    address private allowlistOwner;

    /// @dev constructor, setting the allowlistOwner.
    constructor(address _allowlistOwner) {
        /// @dev Set the variable name.
        allowlistOwner = _allowlistOwner;
    }

    /// @dev    Emitted when a signature is verified by the
    ///         allowlistOwner.
    event VerifySignature(bytes32 indexed addressHash, bool indexed result);

    /**
     * @dev Return the allowlistOwner.
     *
     * @notice Callable by anyone.
     *
     * @return address of allowlistOwner.
     */
    function getAllowlistOwner() public view returns (address) {
        return allowlistOwner;
    }

    /**
     * @dev  Returns true if the signer of signature `sig` is the `allowlistOwner`.
     *       And false if otherwise.
     *
     * @notice Callable by anyone.
     *
     * @return bool true or false.
     */
    function verifySignature(bytes32 hash, bytes memory sig)
        public
        returns (bool)
    {
        return _verifySignature(hash, sig);
    }

    /**
     * @dev  Evaluate and return that a particular address message
     *       was signed by the allowlistOwner.
     *       In the SoulboundCore.sol, this function will be used
     *       in the {issueWithSignature} function, to verify that
     *       the hash of the address was indeed signed by the
     *       allowlistOwner.
     *       This functin will be called from the Daccred.sol or
     *       DaccredDeployer.sol where the address of the
     *       allowlistOwner will be passed to the function, as
     *       msg.sender. Meaning that only the owner of the
     *       allowlist deployed from the Daccred.sol can call
     *       the function.
     *       Or using the getAllowlistOwner() for validations.
     *
     * @notice Callable by this or inheriting contract.
     *
     * @param hash   Hash of the address.
     * @param sig    Signature of the transaction, made offchain.
     *
     * @return bool true or false.
     */
    function _verifySignature(bytes32 hash, bytes memory sig)
        internal
        onlyOwner
        returns (bool)
    {
        /// @dev    Require that the caller is the owner [deployer]
        ///         of the contract, [the Daccred.sol].
        require(
            _msgSender() == owner(),
            "ERC721:: Call to contract made by non-owner"
        );
        /// @dev Require the length of the signature is 65.
        require(sig.length == 65, "Err:: Invalid signature length");
        /// @dev Use assembly to get the 3 sections of a signature.
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(sig);
        /// @dev    Using ecrecover to get the signer.
        address signer = ecrecover(hash, v, r, s);
        /// @dev Verify that the signer is the allowlistOwner.
        bool signerIsAllowlistOwner = (signer == allowlistOwner);
        /// @dev Emit the {VerifySignature} event.
        emit VerifySignature(hash, signerIsAllowlistOwner);
        /// @dev Return the result.
        return signerIsAllowlistOwner;
    }

    /**
     * @dev Returns true if the signer of `_signature` is `_signer`.
     *
     * @notice Callable by anyone.
     *
     * @return bool true or false.
     */
    function verifySigner(
        address _signer,
        bytes32 _hash,
        bytes memory _signature
    ) public pure returns (bool) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return (_signer == ecrecover(_hash, v, r, s));
    }

    /**
     * @dev  This function makes use of assembly to split the signature
     *       into 3 parts.
     *
     * @param sig The signature to split with Assembly.
     *
     * @return r
     * @return s
     * @return v
     */
    function splitSignature(bytes memory sig)
        private
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        assembly {
            /**
             * @dev  Copied from https://solidity-by-example.org/signature.
             *       First 32 bytes stores the length of the signature
             *       add(sig, 32) = pointer of sig + 32
             *       effectively, skips first 32 bytes of signature
             *       mload(p) loads next 32 bytes starting at the memory
             *       address p into memory.
             */

            /// @dev First 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            /// @dev Second 32 bytes.
            s := mload(add(sig, 64))
            /// @dev Final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
