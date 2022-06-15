// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface CoreFunctionalities {

    /**
     * @dev event that is triggered whenever a transfer occurs.
     */
    event Transfer(address sender, address reciever, uint256 tokenId);

    /**
     * @dev function makes a transfer from a contract to another address.
     */
    function transfer(
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev function makes a transfer from an address to another, given the spender has some allowance.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev function that mints an NFT to an address.
     */
    function mint(
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     */
    function approve(address to, uint256 tokenId) external;


    /**
     * @dev @dev Returns the owner of the `tokenId` token.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the account approved for `tokenId` token.
    */
    function getApproved(uint256 tokenId) external view returns (address approved);
}