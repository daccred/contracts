// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____    
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.8;

import {Pausable} from "./Pausable.sol";

import {ERC721ExtensionCore}  from "../../../packages/nft/contracts/ERC721ExtensionCore.sol";
import {ERC721ExtensionSignature}  from "../../../packages/nft/contracts/ERC721ExtensionSignature.sol";

/**
* @title Daccred Deployer.
* @author Daccred.
* @dev  This contracts imports and provides functions
*       that deploys each imported contract.
*/
contract DeployerERC721 is Pausable {
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
    * @dev  Deploys the ERC721ExtensionCore with a set name
    *       and symbol.
    *
    * @param _name      Name of token.
    * @param _symbol    Desired symbol.
    *
    * @return contractAddress Deployed address.
    */
    function deployERC721ExtensionCore(string memory _name, string memory _symbol)
    external
    nonReentrant
    whenNotPaused
    returns(address contractAddress)
    {
        /// @dev Deploy ERC721ExtensionCore contract.
        ERC721ExtensionCore _erc721ExtensionCore = new ERC721ExtensionCore(_name, _symbol);
        /// @dev Return address.
        contractAddress = address(_erc721ExtensionCore);
    }

    /**
    * @dev  Deploys the ERC721ExtensionSignature with its constructor
    *       parameters.
    *
    * @param _name      Name of token.
    * @param _symbol    Desired symbol.
    *
    * @return contractAddress Deployed address.
    */
    function deployERC721ExtensionSignature(
        string memory _name, 
        string memory _symbol,
        address _comissioner,
        uint256 _maxSupply,
        uint256 _commissions,
        uint256 _cappedSupply,
        uint256 _redemptionTariff
    )
    external
    nonReentrant
    whenNotPaused
    returns(address contractAddress)
    {
        /// @dev Deploy ERC721ExtensionSignature contract.
        ERC721ExtensionSignature _erc721ExtensionSignature = new ERC721ExtensionSignature(
            _name, 
            _symbol,
            _comissioner,
            _maxSupply,
            _commissions,
            _cappedSupply,
            _redemptionTariff
        );
        /// @dev Return address.
        contractAddress = address(_erc721ExtensionSignature);
    }
}