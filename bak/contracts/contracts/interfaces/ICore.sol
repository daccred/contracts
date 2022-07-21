// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____    
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.7;

interface ICore {
    /**
     * @dev event that is triggered whenever a transfer occurs.
     */
    event Transfer(address sender, address reciever, uint256 tokenId);

    /**
     * @dev function makes a transfer from a contract to another address.
     */
    function transfer(address to, uint256 tokenId) external;

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
    function mint(address to, uint256 tokenId) external;

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
