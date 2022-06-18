// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

/*
* @title: Soulbound Interface.
* @author: Anthony (fps) https://github.com/fps8k.
* @dev:
* This interface will work with all tokens aimed at being Soulbound [Ref: https://www.cryptotimes.io/what-are-soulbound-tokens-sbts/].
* There are some quick information to note when implementing this interface.
* In addition to the link above, this interface ensures that a token can only be minted to an address once, minting the same token or...
* ...transferring the same token to another address is not feasible. This is to make sure that, that particular token stays with the address,...
* ...and CANNOT be moved around.
* The address the token is minted to is called the 'Soul Address'.
* However, this token can be revoked by the minter (whoever minted it to the Soul Address), and then, and only then...
* ...can that token be reminted to the Soul Address.
* Also, in cases where the token is lost, the above will also apply.
*/

interface ISoulbond is IERC165, IERC721Metadata
{
    // ========== E V E N T S ==========

    // Emitted when the token is minted to `_to`.
    event Attest(address indexed _to, uint256 indexed _tokenId);
    // Emitted when the ownership of the token is withdrawn from `_from`.
    event Revoke(address indexed _from, uint256 indexed _tokenId);
    
    // ========== E V E N T S ==========


    /*
    * @dev:
    * Mints a new token `_tokenId` to `_to`, giving to ownership of token `_tokenId`.
    * This function will be used hand in hand with ERC721's _mint() function.
    * Emits the Attest event.
    *
    * @notice:
    * `_to` cannot transfer the token.
    *
    * [CONDITIONS]
    * `_to` must not be a 0 address.
    * `_tokenId` must be an existent token.
    *
    * @param:
    * address _to => Address to which token `_tokenId` is minted.
    * uint256 _tokenId => Token to mint.
    *
    * @return:
    * bool.
    */
    function issue(address _to, uint256 _tokenId) external returns(bool);


    /*
    * @dev:
    * Withdraws ownership of token `_tokenId` from `_From`.
    * This will be done when the ERC721's _burn() function is called.
    * Emits the Revoke event.
    *
    * @notice:
    * `_from` must own the token.
    *
    * [CONDITIONS]
    * `_from` must not be a 0 address.
    * `_tokenId` must be an existent token.
    *
    * @param:
    * address _from => Address which owns token `_tokenId`.
    * uint256 _tokenId => Token to revoke.
    *
    * @return:
    * bool.
    */
    function revoke(address _from, uint256 _tokenId) external returns(bool);


    /*
    * @dev:
    * Returns the address that owns token `_tokenId`.
    *
    * [CONDITIONS]
    * `_tokenId` must be an existent token.
    *
    * @param:
    * uint256 _tokenId => Token minted.
    *
    * @return:
    * address.
    */
    function ownerOfToken(uint256 _tokenId) external returns(address);


    /*
    * @dev:
    * Since a token cannnot be minted twice.
    * This function returns the address that minted token `_tokenId` to `_to`.
    *
    * [CONDITIONS]
    * `_to` must not be a 0 address.
    * `_tokenId` must be an existent token.
    *
    * @param:
    * address _to => Address to which token `_tokenId` is minted.
    * uint256 _tokenId => Token minted.
    *
    * @return:
    * address.
    */
    function issuerOf(address _to, uint256 _tokenId) external returns(address);


    /*
    * @dev:
    * Returns true if token `_tokenId` was minted from `_from` to `_to`.
    *
    * [CONDITIONS]
    * `_from` must not be a 0 address.
    * `_to` must not be a 0 address.
    * `_tokenId` must be an existent token.
    *
    * @param:
    * address _from => Address that minted token `_tokenId` to `_to`.
    * address _to => Address to which token `_tokenId` is minted.
    * uint256 _tokenId => Token minted.
    *
    * @return:
    * bool.
    */
    function isMinted(address _from, address _to, uint256 _tokenId) external returns(bool);
}