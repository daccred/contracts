// SPDX-License-Identifier: GPL-3.0

/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;
import "erc721a/contracts/ERC721A.sol";

/**
* @title Soulbound Token Contract.
* @author Daccred.
* @dev  Soulbound Token Base Template.
*       This contract was inspired by
*       https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol
*       This contract is inherited by any contract to implement the Soulbound
*       template.
*       Soulbound tokens are tokens that cannot be transferred when 
*       minted to a particular address.
*/
contract Soulbound is ERC721A {
    /// @dev Allows the deployer to set a name and a symbol for the token.
    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}

    /// @dev Emitted when a token is minted to an address.
    event MintSoulboundToken(
        address indexed from, 
        address indexed to, 
        uint256 indexed quantity
    );
    /// @dev Emitted when a token is burnt.
    event BurnSoulboundToken(
        uint256 indexed tokenId
    );

    /**
    * @dev Mints `quantity` of the soulbound token to `to`.
    *
    * @param to         Receiver of the tokens.
    * @param quantity   Amount to be minted, GT 0.
    */
    function mintSoulboundToken(address to, uint256 quantity) internal {
        /// @dev Require the address receiving is not a zero address.
        require(to != address(0), "ERC721: Mint to zero address.");
        /// @dev Requires that the quantity is GT 0.
        require(quantity > 0, "ERC721: Mint of zero tokens.");
        /// @dev Safemint to the `to` address.
        _safeMint(to, quantity);
        /// @dev Emit the {MintSoulboundToken} event.
        emit MintSoulboundToken(address(this), to, quantity);
    }

    /**
    * @dev  Soulbound tokens are tokens that stick with the owner for life.
    *       They cannot be transferred to another owner.
    *       This function override the ERC721A functions for transfers, 
    *       rejecting the transfers.
    *       Emits the {MintSoulboundToken} event.
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

    /**
    * @dev  Burns a soulbound token, on the condition that
    *       the token exists.
    *       Emits the {BurnSoulboundToken} event.
    *
    * @param tokenId Token to be burnt.
    */
    function burnSoulboundToken(uint256 tokenId) internal {
        /// @dev Checks that the token actually exists.
        require(_exists(tokenId), "ERC721:: Burn of inexistent token");
        /// @dev Burn the token.
        _burn(tokenId);
        /// @dev Emit the {BurnSoulboundToken} event.
        emit BurnSoulboundToken(tokenId);
    }
}
