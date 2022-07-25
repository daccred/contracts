// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.4;

import "./ERC721ABurnableMock.sol";
import "./StartTokenIdHelper.sol";

contract ERC721ABurnableStartTokenIdMock is StartTokenIdHelper, ERC721ABurnableMock {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 startTokenId_
    ) StartTokenIdHelper(startTokenId_) ERC721ABurnableMock(name_, symbol_) {}

    function _startTokenId() internal view override returns (uint256) {
        return startTokenId;
    }
}
