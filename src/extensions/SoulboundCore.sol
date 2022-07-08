// SPDX-License-Identifier: GPL-3.0

/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;
import "./Soulbound.sol";
import "./Ownable.sol";
import "./Allowlist.sol";

/**
* @title Soulbound Core Contract.
* @author Daccred.
* @dev  
*/

contract SoulboundCore is Ownable, Soulbound, Allowlist {
    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner
    )
    Soulbound(name, symbol)
    Allowlist(_allowlistOwner) {}
}
