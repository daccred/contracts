// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import { BEP20 } from "../overrides/BEP20Pausable.sol";

// USDT Faucet impl
contract TetherUSDT is BEP20 {
    constructor() payable BEP20("Tether USDT", "USDT", 9) {
        _mint(msg.sender, 103550);
    }
}
