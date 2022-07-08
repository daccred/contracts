// SPDX-License-Identifier: GPL-3.0

/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;
import "erc721a/contracts/ERC721A.sol";
import "../contracts/interfaces/ISoulbound.sol";

/**
* @title Soulbound Token Contract.
* @author Daccred.
* @dev  Soulbound Token Base Template.
*       This contract is inherited by any contract to implement the Soulbound
*       template.
*       It also inherits the ISoulbound interface, once a contract inheits this,
*       It is set to be soulbound, and other conditions can be built around it.
*/

contract Soulbound is ERC721A {

    /// @dev Allows the deployer to set a name and a symbol for the token.
    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}

    /**
    * @dev Mints `quantity` of the soulbound token to `to`.
    *
    * @param to         Receiver of the tokens.
    * @param quantity   Amount to be minted, GT 0.
    */
    function mintSoulboundToken(address to, uint256 quantity) public {
        require(to != address(0), "ERC721: Mint to zero address.");
        require(quantity > 0, "ERC721: Mint of invalid quantity.");
        _safeMint(to, quantity);
    }

    /**
    * @dev  Soulbound tokens are tokens that stick with the owner for life.
    *       They cannot be transferred to another owner.
    *       This function override the ERC721A functions for transfers, 
    *       rejecting the transfers.
    *
    * @param from       Address of token owner.
    * @param to         Address of token receiver.
    * @param tokenId    Id of token to be transferred.
    *
    * @notice This function will fail.
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override 
    {
        revert("ERC721:: Token is Soulbound.");
    }

    /**
    * @dev  Soulbound tokens are tokens that stick with the owner for life.
    *       They cannot be transferred to another owner.
    *       This function override the ERC721A functions for transfers, 
    *       rejecting the transfers.
    *
    * @param from       Address of token owner.
    * @param to         Address of token receiver.
    * @param tokenId    Id of token to be transferred.
    *
    * @notice This function will fail.
    */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override 
    {
       revert("ERC721:: Token is Soulbound.");
    }

    /**
    * @dev  Soulbound tokens are tokens that stick with the owner for life.
    *       They cannot be transferred to another owner.
    *       This function override the ERC721A functions for transfers, 
    *       rejecting the transfers.
    *
    * @param from       Address of token owner.
    * @param to         Address of token receiver.
    * @param tokenId    Id of token to be transferred.
    *
    * @notice This function will fail.
    */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override 
    {
        revert("ERC721:: Token is Soulbound.");
    }
}