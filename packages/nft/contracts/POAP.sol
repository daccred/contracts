// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____    
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.8;

import {IPOAP} from "./interfaces/IPOAP.sol";
import {ERC721A} from "./ERC721A.sol";

/**
 * @title POAP [Proof Of Attendance Protocol] Interface.
 * @author Daccred.
 * @dev
 * POAPs are a type of NFTs minted to addresses, showing that they attended a particular event or activity.
 * These NFTs are minted on a POAP minting smart contract, then transferred free to the attenders of the events.
 * [Ref: https://www.fool.com/investing/stock-market/market-sectors/financials/non-fungible-tokens/poap-nfts/].
 * This unique type of NFT is a free digital gift from the organizers of an event to the attendees.
 * Sample Metadata: https://poap.xyz/events/jsons/28.json.
*/
abstract contract POAP is IPOAP, ERC721A {
    /// @dev Constructor.
    constructor(string memory _name, string memory _symbol)
    ERC721A(_name, _symbol) {}

    /**
     * @dev Mints token `_tokenQuantity` for a particular event to `_eventId`.
     * Emits the {EventToken} event.
     * On calling this function, all tokens are minted to the caller.
     * Then it can be transferred to attendees via transferToken.
     *
     * @param
     * _eventId => The event for which the token was minted.
     * _tokenQuantity => Token to be minted.
    */
    function mint(address _eventId, uint256 _tokenQuantity) public {
        _safeMint(_eventId, _tokenQuantity);
        emit EventToken(_eventId, _tokenQuantity);
    }

    /**
     * @dev Transfers the POAP token `_tokenQuantity` to `_receiver`.
     *
     * @param
     * _eventId => The event for which the token was minted.
     * _receiver => Address receiving the token.
     * _tokenQuantity => Token to be minted.
    */
    function transferToken(
        address _eventId,
        address _receiver,
        uint256 _tokenId
    ) public 
    {
        
        require(_eventId == address(this), "invalid event");

        safeTransferFrom(
            msg.sender,
            _receiver,
            _tokenId
        );
    }
}