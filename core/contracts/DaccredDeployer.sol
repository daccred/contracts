// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____    
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.0;

import {Pausable} from "./Pausable.sol";
import {Soulbound} from "../../packages/soulbound/contracts/Soulbound.sol";
import {SoulboundCore} from "../../packages/soulbound/contracts/SoulboundCore.sol";
import {SoulboundWithSignature} from "../../packages/soulbound/contracts/SoulboundWithSignature.sol";
import {SoulboundRedeemable} from "../../packages/soulbound/contracts/SoulboundRedeemable.sol";

/**
* @title Daccred Deployer.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This contracts imports and provides functions
*       that deploys each imported contract.
*/