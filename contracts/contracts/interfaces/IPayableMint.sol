// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____    
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.0;

/**
* @title Payable mint interface.
* @author Daccred.
* @dev 
* This Extension enable users to charge for mints in the Native token of the Network where the token is being issued.
* The minters pay to mint.
*/


interface IWithPaidExtension {

    // ===== E V E N T S =====

    /// @dev Emitted when the token is minted.
    event Minted(
        address indexed _address, 
        uint256 indexed amountPaid,
        uint256 indexed tokenId
    );

    // ===== E V E N T S =====

    /**
    * @dev Allows the setting of the Fees.
    *
    * @param _fee, the price of fee to be set.
    */
    function setFee(uint256 _fee) external;

    /**
    * @dev Allows the setting of the Fees.
    *
    * @return _fee which is the price of fee already set.
    */
    function getFee() external returns(uint256 _fee);

    /**
    * @dev Allows the splitting of payouts.
    */
    function splitPayout() external;

    /**
    * @dev Allows the user to pay some ETH to mint the token.
    *
    * @param tokenId, tokenId to be minted.
    *
    * @return bool, true if minted and false if otherwise.
    */
    function withRedemptionFee(uint256 tokenId) external payable returns(bool);

    /**
    * @dev Whenever users want to withdraw funds from a payable credentials,
    * We also get paid as well. The markup can be 10% for free accounts.
    */
    function withdraw() external payable;
}