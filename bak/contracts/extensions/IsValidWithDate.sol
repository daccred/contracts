// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____    
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.0;

/**
* @title IsValidWithDate contract.
* @author Daccred.
* @dev Controls time for minted tokens till expiry.
*/
contract IsValidWithDate {
    /// @dev Mapping individual tokens to their expiry dates.
    mapping(uint256 => uint256) internal tokenExpiryDate;

    /// @dev Emitted when a token is extended by redemption.
    event Extended(uint256 tokenId, uint256 time);

    /**
    * @dev  On every successful redemption or mint of token the
    *       expiry of the token is extended by the duration passed
    *       in the contract.
    *       This should be called on expired tokens.
    *
    * @notice   This function is expected to be called by the
    *           SoulboundRedeemable on every mint.
    *
    * @param tokenId    Token to extend its expiry.
    * @param time       Length of time to extend it with.
    */
    function extendExpiry(uint256 tokenId, uint256 time) 
    public
    {
        /// @dev Set expiry to new time.
        tokenExpiryDate[tokenId] = block.timestamp + time;
        /// @dev Emit the {Extended} event.
        emit Extended(tokenId, time);
    }

    /**
    * @dev Returns the expiry date of `tokenId`.
    *
    * @notice Callable by anyone.
    *
    * @param tokenId Token to get its expiry.
    *
    * @return time of expiry.
    */
    function getExpiryDate(uint256 tokenId) public view returns(uint256) {
        return tokenExpiryDate[tokenId];
    }

    /**
    * @dev Return true if the token is expired or false if otherwise.
    *
    * @notice Callable by anyone.
    *
    * @param tokenId Token to check if expired.
    *
    * @return bool true or false.
    */
    function isValid(uint256 tokenId) public view returns(bool) {
        return block.timestamp <= getExpiryDate(tokenId);
    }

    /**
    * @dev Returns the time left for a token to expire.
    *
    * @notice Callable by anyone.
    *
    * @param tokenId Token to get its expiry.
    *
    * @return time left till expiry.
    */
    function getTimeLeft(uint256 tokenId) public view returns(uint256) {
        /// @dev    If the current time has passed the mapped expiry 
        ///         time of token.
        if (block.timestamp > getExpiryDate(tokenId)) {
            /// @dev Return 0.
            return 0;
        } else {
            /// @dev    Else,
            ///         Return time left.
            return getExpiryDate(tokenId) - block.timestamp;
        }
    }
}
