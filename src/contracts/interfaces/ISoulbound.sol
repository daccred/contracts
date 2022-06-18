// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

/*
* @title: Soulbound Interface.
*
* @author: Anthony (fps) https://github.com/fps8k.
*
* @dev:
*
*/

interface ISoulbond is IERC165, IERC721Metadata
{
    event Attest(address indexed _to, uint256 indexed _tokenId);
    event Revoke(address indexed _from, uint256 indexed _tokenId);

    function issue(address _to, uint256 _tokenId) external returns(bool);
    function revoke(address _from, uint256 _tokenId) external returns(bool);
    function ownerOfToken(uint256 _tokenId) external returns(address);
    function issuerOf(uint256 _tokenId) external returns(address);
}