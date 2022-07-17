// SPDX-License-Identifier: GPL-3.0

/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.8;
import "../contracts/interfaces/ISoulbound.sol";
import "../eips/ERC-4973.sol";

/**
* @title Soulbound Token Contract.
* @author Daccred.
* @dev  Soulbound Token Base Template.
*       This contract was inspired by
*       https://github.com/ethereum/EIPs/blob/master/assets/eip-4973/ERC-4973.sol
*       This contract is inherited by any contract to implement the Soulbound
*       template.
*       Soulbound tokens  cannot be transferred when minted to a particular address.
*       This is the base instance of the contract,
*       it includes minting functions and revoke functions.
*       Inheriting functions can wrap around the specified functions.
*       Also, this base contract instance does not include a capped supply.
*/
contract Soulbound is ERC4973 {
    /** 
    * @dev  Stores the base URI on cases when the user wants to mint a token,
    *       it automatically generates a string casted tokenURI using the
    *       generateTokenURI function. This variable can only be modified by
    *       the allowlist owner.
    */
    string private baseURI;

    /// @dev Mapping of speific addresses to tokenIds and boolean for mint records.
    mapping(address => mapping(uint256 => bool)) private mints;

    /// @dev Allows the deployer to set a name and a symbol for the token.
    constructor(string memory name, string memory symbol) ERC4973(name, symbol) {}

    /**
    * @dev  Mints a new token `_tokenId` to `_to`, giving to ownership of token `_tokenId`.
    *       This function will be used hand in hand with ERC721's _mint() function.
    *       Emits the {Attest} event.
    *       `_to` cannot transfer the token.
    *       `_to` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *       This does not evaluate total supply of tokens before minting.
    *
    * @notice Callable by anyone.
    *
    * @param _to        Address to which token `_tokenId` is minted.
    * @param _tokenId   Token to mint.
    * @param tokenURI   Auto generated or user passed URI for minted token.
    *
    * @return bool true or false.
    */
    function issue(
        address _to, 
        uint256 _tokenId, 
        string memory tokenURI
    ) internal returns(bool)
    {
        /// @dev Mint Soulbound token to `_to` using ERC4973 _mint().
        mintSoulboundToken(
            _to, 
            _tokenId, 
            tokenURI
        );
        /// @dev Return true.
        return true;
    }

    /**
    * @dev  Withdraws ownership of token `_tokenId` from `_From`.
    *       This will be done when the ERC721's _burn() function is called.
    *       Emits the {Revoke} event.
    *       `_from` must own the token.
    *       `_from` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *       The function can only be called by the issuer of the token.
    *       This modifier onlyIssuer will be implemented in the contract.
    *       [Modifiers cannot be made in interfaces].
    *       This does not evaluate total supply of tokens before minting.
    *
    * @notice Callable by this or inheriting contract.
    *
    * @param _from      Address which owns token `_tokenId`.
    * @param _tokenId   Token to revoke.
    *
    * @return bool true or false.
    */
    function revoke(address _from, uint256 _tokenId) internal returns(bool) {
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
    *       This function returns the address that minted token `_tokenId` to `_to`,
    *       otherwise this contract.
    *       `_to` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *       Owner of _tokenId must be _to.
    *
    * @notice Callable by anyone.
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
    *       `_to` must not be a 0 address.
    *       `_tokenId` must be an existent token.
    *
    * @notice Callable by anyone.
    *
    * @param _to        Address to which token `_tokenId` is minted.
    * @param _tokenId   Token minted.
    *
    * @return bool true or false.
    */
    function isMinted(
        address _to, 
        uint256 _tokenId
    ) public view returns(bool) {
        return mints[_to][_tokenId];
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
        /// @dev    Mint to the `to` address.
        ///         ERC4973 runs check for existent token.
        _mint(to, tokenId, tokenURI);
        /// @dev Set record of owner to true;
        mints[to][tokenId] = true;
    }

    /**
    * @dev  Burns a soulbound token, on the condition that
    *       the token exists.
    *
    * @param tokenId Token to be burnt.
    */
    function burnSoulboundToken(uint256 tokenId) private {
        /// @dev Checks that the token actually exists.
        require(_exists(tokenId), "Burn of inexistent token");
        /// @dev Get owner of token tokenId.
        address _tokenOwner = ownerOf(tokenId);
        /// @dev Burn the token.
        _burn(tokenId);
        /// @dev Set record of owner to false.
        mints[_tokenOwner][tokenId] = false;
    }

    /**
    * @dev Sets the baseURI to `_baseURI`.
    *
    * @notice Callable by this or inheriting contract.
    *
    * @param _baseURI String URI.
    */
    function _setBaseURI(string memory _baseURI) internal {
        /// @dev Ensure that the word length is 0.
        require(bytes(_baseURI).length != 0, "Invalid length");
        /// @dev Set baseURI.
        baseURI = _baseURI;
    }

    /**
    * @dev Returns already set baseURI if it exists.
    *
    * @notice Callable by anyone.
    *
    * @return _baseURI baseURI set.
    */
    function _getBaseURI() public view returns(string memory _baseURI) {
        /// @dev Require baseURI length is not 0.
        require(bytes(baseURI).length != 0, "Empty baseURI");
        /// @dev Return baseURI.
        _baseURI = baseURI;
    }
}
