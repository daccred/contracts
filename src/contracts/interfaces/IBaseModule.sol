// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

interface IBaseModule {
    /**
     * @dev Returns the token collection name.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the token collection symbol.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);

    /**
     * @dev Returns the expiryDate for a token, measured in blocktime.
     */
    function expiryDate(uint256 tokenId) external view returns (uint256);
}
