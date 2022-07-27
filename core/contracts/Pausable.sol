// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____    
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.0;

import {Ownable} from "./Ownable.sol";

/**
* @title Pausable Contract.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This contract seeks to grant the inheriting
*       contract the ability to pause actions done
*       on the contract.
*       The choice to pause or unpause the contract
*       is made by the owner or deployer.
*/
contract Pausable is Ownable {
    /// @dev    Boolean to determine when contract is or
    ///         is not paused.
    bool private paused;

    /// @dev Emitted whenever the contract is paused.
    event Paused();
    /// @dev Emitted whenever the contract is unpaused.
    event UnPaused();
    
    /**
    * @dev  Allows for interactions with contract if the
    *       contract is paused.
    */
    modifier whenPaused() {
        /// @dev Require contract is paused.
        require(paused, "Contract Not Paused.");
        _;
    }

    /**
    * @dev  Allows for interactions with contract if the
    *       contract is not paused.
    */
    modifier whenNotPaused() {
        /// @dev Require contract is not paused.
        require(!paused, "Contract Paused.");
        _;
    }

    /**
    * @dev  Pauses the contract. 
    *       This function is callable by the owner or deployer.
    */
    function pause() public onlyOwner {
        /// @dev Require contract is not paused.
        require(!paused, "Contract Paused.");
        /// @dev Set paused to true.
        paused = true;
    }

    /**
    * @dev  Pauses the contract. 
    *       This function is callable by the owner or deployer.
    */
    function unPause() public onlyOwner {
        /// @dev Require contract is paused.
        require(paused, "Contract Not Paused.");
        /// @dev Set paused to false.
        paused = false;
    }

    /**
    * @dev  Returns true or false if the contract is paused. 
    *       This function is callable by anyone.
    *
    * @return bool True or false.
    */
    function isPaused() public view returns(bool) {
        return paused;
    }
}