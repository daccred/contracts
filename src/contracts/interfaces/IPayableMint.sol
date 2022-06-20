// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
* @title Payable mint interface.
* @author Anthony (fps) https://github.com/fps8k.
* @dev 
* This Extension enable users to charge for mints in the Native token of the Network where the token is being issued.
* The minters pay to mint.
*/


interface IPayableMint {

    // ===== E V E N T S =====

    /// @dev Emitted when the token is minted.
    event Minted(address indexed _address, uint256 indexed tokenId);
    /// @dev Thrown when the minting fails, because of insufficient eth or otherwise.
    error MintError(address _address, uint256 tokenId, bytes32);

    // ===== E V E N T S =====

    /**
    * @dev Allows the user to pay some ETH to mint the token.
    *
    * @param tokenId, tokenId to be minted.
    *
    * @return bool, true if minted and false if otherwise.
    */
    function mint(uint256 tokenId) external payable returns(bool);

    /**
    * @dev Whenever users want to withdraw funds from a payable credentials,
    * We also get paid as well. The markup can be 10% for free accounts.
    */
    function withdraw() external payable;
}