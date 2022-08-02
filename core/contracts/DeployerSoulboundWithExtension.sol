// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____    
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.8;

import {Pausable} from "./Pausable.sol";

import {SoulboundWithSignature} from "../../packages/soulbound/contracts/SoulboundWithSignature.sol";
import {SoulboundRedeemable} from "../../packages/soulbound/contracts/SoulboundRedeemable.sol";

/**
* @title Daccred DeployerSoulboundWithExtension.
* @author Daccred.
* @dev  This contracts imports and provides functions
*       that deploys each imported contract.
*/
contract DeployerSoulboundWithExtension is Pausable {
    /// @dev Locked for re-entrancy.
    bool private locked;

    /**
     * @dev Protect against Re-Entrancy.
    */
    modifier nonReentrant() {
        require(!locked);
        locked = true;
        _;
        locked = false;
    }

    /**
    * @dev  Deploys the SoulboundRedeemable Contract with its constructor
    *       parameters.
    *
    * @param _name              Name of token.
    * @param _symbol            Desired symbol.
    * @param _allowlistOwner    Desired owner of the contrat for sigs.
    * @param _totalSupply       Desired total supply.
    * @param _priceLimit        Desired price limit.
    * @param _tokenPrice        Desired token price.
    *
    * @return contractAddress Deployed address.
    */
    function deploySoulboundRedeemable(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply,
        uint256 _priceLimit,
        uint256 _tokenPrice
    )
    public
    nonReentrant
    whenNotPaused
    returns(address contractAddress)
    {
        /// @dev Deploy SoulboundRedeemable contract.
        SoulboundRedeemable _soulboundRedeemable = new SoulboundRedeemable(
            _name, 
            _symbol,
            _allowlistOwner,
            _totalSupply,
            _priceLimit,
            _tokenPrice
        );
        /// @dev Return address.
        contractAddress = address(_soulboundRedeemable);
    }

    /**
    * @dev  Deploys the SoulboundWithSignature Contract with its constructor
    *       parameters.
    *
    * @param _name              Name of token.
    * @param _symbol            Desired symbol.
    * @param _allowlistOwner    Desired owner of the contrat for sigs.
    * @param _totalSupply       Desired total supply.
    *
    * @return contractAddress Deployed address.
    */
    function deploySoulboundWithSignature(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    )
    public
    nonReentrant
    whenNotPaused
    returns(address contractAddress)
    {
        /// @dev Deploy SoulboundWthSignature contract.
        SoulboundWithSignature _soulboundWithSignature = new SoulboundWithSignature(
            _name, 
            _symbol,
            _allowlistOwner,
            _totalSupply
        );
        /// @dev Return address.
        contractAddress = address(_soulboundWithSignature);
    }
}