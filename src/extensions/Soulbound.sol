// SPDX-License-Identifier: GPL-3.0

/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.8;
import "https://github.com/ethereum/EIPs/blob/master/assets/eip-4973/ERC-4973.sol";

/**
* @title Soulbound Token Contract.
* @author Daccred.
* @dev  Soulbound Token Base Template.
*       This contract was inspired by
*       https://github.com/ethereum/EIPs/blob/master/assets/eip-4973/ERC-4973.sol
*       This contract is inherited by any contract to implement the Soulbound
*       template.
*       Soulbound tokens are tokens that cannot be transferred when 
*       minted to a particular address.
*/
contract Soulbound is ERC4973 {
    /// @dev Allows the deployer to set a name and a symbol for the token.
    constructor(string memory name, string memory symbol) ERC4973(name, symbol) {}

    /// @dev Emitted when a token is minted to an address.
    event MintSoulboundToken(
        address indexed from, 
        address indexed to, 
        uint256 indexed tokenId
    );
    /// @dev Emitted when a token is burnt.
    event BurnSoulboundToken(
        uint256 indexed tokenId
    );

    /**
    * @dev Mints `tokenId` of the soulbound token to `to`.
    *
    * @param to         Receiver of the tokens.
    * @param tokenId    Amount to be minted, GT 0.
    * @param tokenURI   URI of token minted.
    */
    function mintSoulboundToken(
        address to, 
        uint256 tokenId, 
        string memory tokenURI
    ) internal 
    {
        /// @dev Require the address receiving is not a zero address.
        require(to != address(0), "Mint to zero address.");
        /// @dev Mint to the `to` address.
        _mint(to, tokenId, tokenURI);
        /// @dev Emit the {MintSoulboundToken} event.
        emit MintSoulboundToken(address(this), to, tokenId);
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
        require(_exists(tokenId), "Burn of inexistent token");
        /// @dev Burn the token.
        _burn(tokenId);
        /// @dev Emit the {BurnSoulboundToken} event.
        emit BurnSoulboundToken(tokenId);
    }
}
