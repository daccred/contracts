// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
* @title: Whitelist Limitation Interface.
* @author: Anthony (fps) https://github.com/fps8k.
* @dev:
* For contracts that will implement this interface, storage fixed arrays cannot be created from a function...
* ...(only memory can, and will be wiped out when the function is done).
* But this interface seeks to control a dynamic array's max length using a storage uint256 variable.
* This ensures that the length of the array cannot be > the value of the max length.
* Contracts to implement this interface must specify a control uint on the contract storage.
*
* [WARNING]
* This max length value can only be incremented.
*/

interface IWhitelist
{
    // ========== E V E N T S ==========

    // Emitted when a new whitelist length is set.
    // (uint256) => Value of the max length.
    event SetLength(uint256);

    // Emitted when the max length of the array is extended.
    // (uint256) => Value by which the max length has been extended.
    event ExtendLength(uint256);

    // ========== E V E N T S ==========


    // ========== I N T E R F A C E S ==========

    /*
    * @dev:
    * Returns the current length of the array, (number of elements housed by the array).
    */
    function getLength() external returns(uint256);


    /*
    * @dev:
    * Returns the current value of the max length of the array.
    */
    function getMaxLength() external returns(uint256);


    /*
    * @dev:
    * Set the new `_length` to  the max length of the array.
    * This cannot be reduced, only increased.
    * (An array with a current max length of 5, can only accept values >= 6 for a new max length value).
    *
    * [CONDITIONS]
    * new `_length` must be > than the `max length`.
    *
    * Emits the {SetLength} event.
    *
    * @param:
    * uint256 _length => The new value for the max length of the array.
    *
    * @return:
    * bool.
    */
    function setLength(uint256 _length) external returns(bool);


    /*
    * @dev:
    * Adds a value of `_length` to the current max length.
    * (Calling this function on the max length with a value of 5, sets the new max length value to: 5 + `_length`).
    * Returns the new max length value.
    *
    * [CONDITIONS]
    * `_length` must be > 0.
    *
    * Emits the {ExtendLength} event.
    *
    * @param:
    * uint256 _length => The desired length by which the max value will be extended.
    *
    * @return:
    * uint256 => The new max length value.
    */
    function extendLength(uint256 _length) external returns(uint256);

    // ========== I N T E R F A C E S ==========
}