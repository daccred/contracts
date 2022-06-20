// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/// @dev This library will be used for the proofs.
// import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


/**
* @title IWithMerkleProof Interface.
* @author Anthony (fps) https://github.com/fps8k.
* @dev Verifies a leaf as part of a Merkle tree.
*/


interface IWithMerkleProof {
    /**
    * @dev Returns true if a `leaf` can be proved to be a part of a Merkle tree defined by `root`.
    * For this, a `proof` must be provided, containing sibling hashes on the branch from the leaf to the root of the tree.
    * Each pair of leaves and each pair of pre-images are assumed to be sorted.
    *
    * @param leaf, root and proof.
    */
    function verifyMerkleProof(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) external returns(bool);
}

