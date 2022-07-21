// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.0;

/// @dev This library will be used for the proofs.
// import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title IWithMerkleProof Interface.
 * @author Daccred.
 * @dev Verifies a leaf as part of a Merkle tree.
 */

interface IWithMerkleProof {
    /**
     * @dev Allows caller to set merkle root.
     */
    function setMerkleRoot(bytes32 _root) external;

    /**
     * @dev Returns the merkle root, if it is set.
     *
     * @return _root which is the merkle root.
     */
    function getMerkleRoot() external returns (bytes32 _root);

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
    ) external returns (bool);
}
