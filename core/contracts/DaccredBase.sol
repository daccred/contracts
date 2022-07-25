// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";

/**
 * @title Daccred Base.
 * @author Daccred.
 * @dev  Inspired by https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol.
 *       This contracts implements all the functions in the ERC721A contract.
 */

contract DaccredBase is ERC721A {
    /**
     * @dev  Creates the token for the contract.
     *       This creates the token as stated in the ERC721A contract constructor.
     *
     * @param name   Token name desired.
     * @param symbol Token symbol desired.
     */
    constructor(string memory name, string memory symbol)
        ERC721A(name, symbol)
    {}

    /**
     * @dev  Mints an amount of token to an address.
     *       After token is created, this function mints
     *       `quantity` number of tokens to `tokenReceiver`.
     *       Following the process defined in {ERC721A - _safeMint} function.
     *
     * @param tokenReceiver  Address receiving the token.
     * @param quantity       Quantiy of tokens to be minted to the address.
     */
    function baseMint(address tokenReceiver, uint256 quantity) public {
        require(tokenReceiver != address(0), "Mint to zero address.");
        _safeMint(tokenReceiver, quantity);
    }

    /**
     * @dev  Burns a particular token `tokenId` owned by `tokenOwner`.
     *       Following the process defined in {ERC721A - _burn} function.
     *
     * @param tokenOwner Address receiving the token.
     * @param tokenId    Id of the token to be burnt.
     */
    function baseBurn(address tokenOwner, uint256 tokenId) public {
        require(tokenOwner != address(0), "Burn from zero address.");
        _burn(tokenId);
    }
}
