// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
* @title POAP [Proof Of Attendance Protocol] Interface.
* @author Anthony (fps) https://github.com/fps8k.
* @dev
* POAPs are a type of NFTs minted to addresses, showing that they attended a particular event or activity.
* These NFTs are minted on a POAP minting smart contract, then transferred free to the attenders of the events.
* [Ref: https://www.fool.com/investing/stock-market/market-sectors/financials/non-fungible-tokens/poap-nfts/].
* This unique type of NFT is a free digital gift from the organizers of an event to the attendees.
* Sample Metadata: https://poap.xyz/events/jsons/28.json.
*/


/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 */
interface IERC721Metadata{
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


/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}


interface IPOAP is IERC721, IERC721Metadata
{
    // ========== E V E N T S ==========

    /// @dev Emitted when a token is minted for an event.
    event EventToken(uint256 eventId, uint256 tokenId);

    // ========== E V E N T S ==========


    /**
    * @dev Mints token `_tokenId` for a particular event `_eventId`.
    * Emits the {EventToken} event.
    * On calling this function, all tokens are minted to the caller.
    * Then it can be transferred to attendees via transferToken.
    *
    * @param
    * _eventId => The event for which the token was minted.
    * _tokenId => Token to be minted.
    */
    function mintToken(uint256 _eventId, uint256 _tokenId) external;


    /**
    * @dev Mints the POAP token `_tokenId` to `_receiver`.
    *
    * @param
    * _eventId => The event for which the token was minted.
    * _receiver => Address receiving the token.
    * _tokenId => Token to be minted.
    */
    function transferToken(uint256 _eventId, address _receiver, uint256 _tokenId) external;
}

