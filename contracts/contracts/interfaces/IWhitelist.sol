// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 
                                                        
pragma solidity ^0.8.7;

/**
 * @title Whitelist Limitation Interface.
 * @author Daccred.
 * @dev For contracts that will implement this interface, storage fixed arrays cannot be created from a function
 * (only memory can, and will be wiped out when the function is done).
 * But this interface seeks to control a dynamic array's max length using a storage uint256 variable.
 * This ensures that the length of the array cannot be GT the value of the max length.
 * Contracts to implement this interface must specify a control uint on the contract storage.
 *
 * [USABILITY]
 * In future in the WhitelistFactory, the entire Whitelist actions will be controlled depending on the users payment plan (free or paid).
 * When the WhitelistFactory is deployed, a whitelist max length is automatically created via
 * setting a default max length value for the address
 * the whitelist can now be created to memory by uint256[max_length] whitelist = new uint256[](max_length)
 * and functions that adds, extends and sets new length for whitelist will be handled from the Factory, the actions
 * will be dependent on the users payment plan.
 *
 * [WARNING]
 * This max length value can only be incremented.
 */

interface IWhitelist {
    // ========== E V E N T S ==========

    /// @dev Emitted when a new whitelist length is set.
    event SetWhitelistLength(uint256);

    /// @dev Emitted when the max length of the array is extended.
    event ExtendWhitelistLength(uint256);

    // ========== E V E N T S ==========


    /**
     * @dev Returns the current length of the array, (number of elements housed by the array).
     */
    function getWhitelistLength() external returns (uint256);

    /**
     * @dev Returns the current value of the max length of the array.
     */
    function getWhitelistMaxLength() external returns (uint256);

    /**
     * @dev Set the new `_length` to  the max length of the array.
     * This cannot be reduced, only increased.
     * (An array with a current max length of 5, can only accept values GT 5 for a new max length value).
     *
     * [CONDITIONS]
     * new `_length` must be > than the `max length`.
     *
     * Emits the {SetWhitelistLength} event.
     *
     * @param _length, The new value for the max length of the array.
     *
     * @return bool.
     */
    function setWhitelistLength(uint256 _length) external returns (bool);

    /**
     * @dev Adds a value of `_length` to the current max length.
     * (Calling this function on the max length with a value of 5, sets the new max length value to: 5 + `_length`).
     * Returns the new max length value.
     *
     * [CONDITIONS]
     * `_length` must be GT 0.
     *
     * Emits the {ExtendWhitelistLength} event.
     *
     * @param _length, The desired length by which the max value will be extended.
     *
     * @return bool.
     */
    function extendWhitelistLength(uint256 _length) external returns (bool);

    // ========== I N T E R F A C E S ==========
}

