// SPDX-License-Identifier: GPL-3.0

/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.8;
import "../contracts/interfaces/ISoulbound.sol";
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

    mapping(address => mapping(address => mapping(uint256 => bool))) private mints;

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
    * @dev  Mints a new token `_tokenId` to `_to`, giving to ownership of token `_tokenId`.
    *       This function will be used hand in hand with ERC721's _mint() function.
    *       Emits the {Attest} event.
    *       `_to` cannot transfer the token.
    *       [CONDITIONS]
    *       `_to` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *
    * @param _to        Address to which token `_tokenId` is minted.
    * @param _tokenId   Token to mint.
    *
    * @return bool.
    */
    function issue(
        address _to, 
        uint256 _tokenId, 
        string memory tokenURI
    ) public returns(bool)
    {
        mintSoulboundToken(
            _to, 
            _tokenId, 
            tokenURI
        );
        return true;
    }

    /**
    * @dev Withdraws ownership of token `_tokenId` from `_From`.
    *       This will be done when the ERC721's _burn() function is called.
    *       Emits the {Revoke} event.
    *       `_from` must own the token.
    *       [CONDITIONS]
    *       `_from` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *       The function can only be called by the issuer of the token.
    *       This modifier onlyIssuer will be implemented in the contract. [Modifiers cannot be made in interfaces].
    *
    * @param _from      Address which owns token `_tokenId`.
    * @param _tokenId   Token to revoke.
    *
    * @return bool.
    */
    function revoke(address _from, uint256 _tokenId) public returns(bool) {
        /// @dev Require token exists.
        require(_exists(_tokenId), "Non-existent token.");
        /// @dev Require _tokenId is owned by _from.
        require(ownerOf(_tokenId) == _from, "Token not owned by address");
        /// @dev Burn the token.
        burnSoulboundToken(_tokenId);
        /// @dev Return true.
        return true;
    }

    /**
    * @dev  Since a token cannnot be minted twice.
    *       This function returns the address that minted token `_tokenId` to `_to`.
    *       [CONDITIONS]
    *       `_to` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *
    * @param _to        Address to which token `_tokenId` is minted.
    * @param _tokenId   Token minted.
    *
    * @return address of issuer.
    */
    function issuerOf(address _to, uint256 _tokenId) public view returns(address) {
        /// @dev Require _to is not a zero address.
        require(_to != address(0), "Query for zero address.");
        /// @dev Require token exists.
        require(_exists(_tokenId), "Non-existent token.");
        /// @dev Require _tokenId is owned by _to.
        require(ownerOf(_tokenId) == _to, "Token not owned by address");
        /// @dev Returns this address.
        return address(this);
    }

    /**
    * @dev  Returns true if token `_tokenId` was minted from this contract to `_to`.
    *       [CONDITIONS]
    *       `_to` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *
    * @param _to        Address to which token `_tokenId` is minted.
    * @param _tokenId   Token minted.
    *
    * @return bool.
    */
    function isMinted(
        address _to, 
        uint256 _tokenId
    ) public view returns(bool) {
        return mints[msg.sender][_to][_tokenId];
    }

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
    ) private 
    {
        /// @dev Require the address receiving is not a zero address.
        require(to != address(0), "Mint to zero address.");
        /// @dev Mint to the `to` address.
        _mint(to, tokenId, tokenURI);
        mints[msg.sender][to][tokenId] = true;
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
    function burnSoulboundToken(uint256 tokenId) private {
        /// @dev Checks that the token actually exists.
        require(_exists(tokenId), "Burn of inexistent token");
        /// @dev Burn the token.
        _burn(tokenId);
        /// @dev Emit the {BurnSoulboundToken} event.
        emit BurnSoulboundToken(tokenId);
    }
}
