// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;
import "./SoulboundWithSignature.sol";

/**
* @title Soulbound Redeemable.
* @author Daccred.
* @dev 
*
Aster, AST, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 5
*/
contract SoulboundRedeemable is SoulboundWithSignature {
    /// @dev    Constructor deploys the SoulboundCore and
    ///         sets a totalSupply.
    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner,
        uint256 currentSupply
    )
    SoulboundWithSignature(
        name, 
        symbol, 
        _allowlistOwner, 
        currentSupply
    ) {}
}
