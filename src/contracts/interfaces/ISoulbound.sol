// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
* @title Soulbound Interface.
* @author Daccred.
* @dev 
* Drafted from :: EIP-4973 [Ref: https://github.com/TimDaub/EIPs/blob/194f91067b8ef843467c15821ca5a5e3aa129fe6/EIPS/eip-4973.md].
*
* This interface will work with all tokens aimed at being Soulbound [Ref: https://www.cryptotimes.io/what-are-soulbound-tokens-sbts/].
* There are some quick information to note when implementing this interface.
* In addition to the link above, this interface ensures that a token can only be minted to an address once, minting the same token or
* transferring the same token to another address is not feasible. This is to make sure that, that particular token stays with the address,
* and CANNOT be moved around.
* The address the token is minted to is called the 'Soul Address'.
* However, this token can be revoked by the minter (whoever minted it to the Soul Address), and then, and only then
* can that token be reminted to the Soul Address.
* Also, in cases where the token is lost, the above will also apply.
*/


/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Metadata {
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
}


interface ISoulbond is IERC165, IERC721Metadata {
    // ========== E V E N T S ==========

    /// @dev Emitted when the token is minted to `_to`.
    event Attest(address indexed _to, uint256 indexed _tokenId);
    /// @dev Emitted when the ownership of the token is withdrawn from `_from`.
    event Revoke(address indexed _from, uint256 indexed _tokenId);
    
    // ========== E V E N T S ==========


    // ========== E R R O R s ==========

    /// @dev Thrown if address is 0 address.
    error ZeroAddress(address _address);
    /// @dev Thrown if token is not existent.
    error NonExistent(uint256 _tokenId, string _error);
    /// @dev Thrown if token has already been minted.
    error Attested(uint256 tokenId, string _error);

    // ========== E R R O R s ==========


    /**
    * @dev Mints a new token `_tokenId` to `_to`, giving to ownership of token `_tokenId`.
    * This function will be used hand in hand with ERC721's _mint() function.
    * Emits the {Attest} event.
    *
    * @notice `_to` cannot transfer the token.
    *
    * [CONDITIONS]
    * `_to` must not be a 0 address.
    * `_tokenId` must be an existent token.
    *
    * @param
    * _to, Address to which token `_tokenId` is minted.
    * _tokenId, Token to mint.
    *
    * @return bool.
    */
    function issue(address _to, uint256 _tokenId) external returns(bool);


    /**
    * @dev Withdraws ownership of token `_tokenId` from `_From`.
    * This will be done when the ERC721's _burn() function is called.
    * Emits the {Revoke} event.
    *
    * @notice `_from` must own the token.
    *
    * [CONDITIONS]
    * `_from` must not be a 0 address.
    * `_tokenId` must be an existent token.
    * The function can only be called by the issuer of the token.
    * This modifier onlyIssuer will be implemented in the contract. [Modifiers cannot be made in interfaces].
    *
    * @param
    * _from => Address which owns token `_tokenId`.
    * _tokenId => Token to revoke.
    *
    * @return bool.
    */
    function revoke(address _from, uint256 _tokenId) external returns(bool);


    /*
    * @dev Returns the address that owns token `_tokenId`.
    *
    * [CONDITIONS]
    * `_tokenId` must be an existent token.
    *
    * @param _tokenId => Token minted.
    *
    * @return address of owner of `_tokenId`.
    */
    function ownerOf(uint256 _tokenId) external returns(address);


    /**
    * @dev Since a token cannnot be minted twice.
    * This function returns the address that minted token `_tokenId` to `_to`.
    *
    * [CONDITIONS]
    * `_to` must not be a 0 address.
    * `_tokenId` must be an existent token.
    *
    * @param
    * _to => Address to which token `_tokenId` is minted.
    * _tokenId => Token minted.
    *
    * @return address of issuer.
    */
    function issuerOf(address _to, uint256 _tokenId) external returns(address);


    /**
    * @dev Returns true if token `_tokenId` was minted from `_from` to `_to`.
    *
    * [CONDITIONS]
    * `_from` must not be a 0 address.
    * `_to` must not be a 0 address.
    * `_tokenId` must be an existent token.
    *
    * @param
    * _from => Address that minted token `_tokenId` to `_to`.
    * _to => Address to which token `_tokenId` is minted.
    * _tokenId => Token minted.
    *
    * @return bool.
    */
    function isMinted(address _from, address _to, uint256 _tokenId) external returns(bool);


    /**
    * @dev Returns 1 if isMinted returns true and 0 if otherwise.
    *
    * [CONDITIONS]
    * `_owner` must not be a 0 address.
    *
    * @param
    * _owner => Address to evaluate.
    *
    * @return uint256.
    */
    function balanceOf(address _owner) external returns(uint256);
}

