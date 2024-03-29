// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____    
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.8;

import {Pausable} from "./Pausable.sol";

import {Soulbound} from "../../../packages/soulbound/contracts/Soulbound.sol";
import {SoulboundCore} from "../../../packages/soulbound/contracts/SoulboundCore.sol";

/**
* @title Daccred DeployerSoulbound.
* @author Daccred.
* @dev  This contracts imports and provides functions
*       that deploys each imported contract.
*/
contract DeployerSoulbound is Pausable {
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
    * @dev  Deploys the Soulbound Contract with a set name
    *       and symbol.
    *
    * @param _name      Name of token.
    * @param _symbol    Desired symbol.
    *
    * @return contractAddress Deployed address.
    */
    function deploySoulbound(string memory _name, string memory _symbol)
    external
    nonReentrant
    whenNotPaused
    returns(address contractAddress)
    {
        /// @dev Deploy Soulbound contract.
        Soulbound _soulbound = new Soulbound(_name, _symbol);
        /// @dev Return address.
        contractAddress = address(_soulbound);
    }

    /**
    * @dev  Deploys the SoulboundCore Contract with its constructor
    *       parameters.
    *
    * @param _name              Name of token.
    * @param _symbol            Desired symbol.
    * @param _allowlistOwner    Desired owner of the contrat for sigs.
    * @param _totalSupply       Desired total supply.
    *
    * @return contractAddress Deployed address.
    */
    function deploySoulboundCore(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    )
    external
    nonReentrant
    whenNotPaused
    returns(address contractAddress)
    {
        /// @dev Deploy SoulboundCore contract.
        SoulboundCore _soulboundCore = new SoulboundCore(
            _name, 
            _symbol,
            _allowlistOwner,
            _totalSupply
        );
        /// @dev Return address.
        contractAddress = address(_soulboundCore);
    }
}