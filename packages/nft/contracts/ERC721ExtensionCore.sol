// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.4;

import "./ERC721A.sol";
import "./interfaces/IERC721ExtensionCore.sol";
import "./Guard.sol";

contract ERC721ExtensionCore is ERC721A, Guarded, IERC721ExtensionCore {
    // using Strings for uint256;

    // This mapping enables us to use custom token URI from the daccred client
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override(ERC721A, IERC721Metadata) returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        return bytes(base).length != 0 ? string(abi.encodePacked(base, _tokenURI)) : _tokenURI;
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        if (bytes(_tokenURI).length != 0) revert SetURICannotBeEmpty("empty tokenURI");
        if (bytes(_tokenURIs[tokenId]).length != 0) revert URIRequestForExistentToken();
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev Mints token to use based on tokenURI.
     *
     * Requirements:
     *
     * - `tokenURI` must be supplied.
     */
    function mint(string memory _tokenURI) external payable virtual guarded returns (uint256) {
        require(msg.value == 0, "[Core.mint] value to be 0");

        /// @dev we do not regard the principle of quantity,
        /// @dev    everyone mints only one token
        _mint(msg.sender, 1);

        uint256 newTokenId = _currentIndex;

        /// @dev we can now set the tokenURI of the token we just minted
        _setTokenURI(newTokenId, _tokenURI);

        // /// @dev emit transfer event
        // emit Transfer(address(0), msg.sender, newTokenId);
        return newTokenId;
    }

    /**
     * @dev Burns `tokenId`. See {ERC721A-_burn}.
     *
     * Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function burn(uint256 tokenId) public virtual override {
        _burn(tokenId, true);
    }
}
