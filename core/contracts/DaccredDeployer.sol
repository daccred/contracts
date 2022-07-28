// SPDX-License-Identifier: GPL-3.0

///  _____     ______     ______     ______     ______     ______     _____    
/// /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
/// \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
///  \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
///   \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.8;

import {Pausable} from "./Pausable.sol";

import {Soulbound} from "../../packages/soulbound/contracts/Soulbound.sol";
import {SoulboundCore} from "../../packages/soulbound/contracts/SoulboundCore.sol";
import {SoulboundWithSignature} from "../../packages/soulbound/contracts/SoulboundWithSignature.sol";
import {SoulboundRedeemable} from "../../packages/soulbound/contracts/SoulboundRedeemable.sol";

import {ERC721ExtensionCore}  from "../../packages/nft/contracts/ERC721ExtensionCore.sol";
import {ERC721ExtensionSignature}  from "../../packages/nft/contracts/ERC721ExtensionSignature.sol";

/**
* @title Daccred Deployer.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This contracts imports and provides functions
*       that deploys each imported contract.
*/
contract DaccredDeployer is Pausable {
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
    public
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
    public
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
        /// @dev Deploy SoulboundWthSignature contract using Create2 random sat.
        SoulboundWithSignature _soulboundWithSignature = new SoulboundWithSignature(
            _name, 
            _symbol,
            _allowlistOwner,
            _totalSupply
        );
        /// @dev Return address.
        contractAddress = address(_soulboundWithSignature);
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
    public
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
    * @dev  Deploys the ERC721ExtensionSignature with a set name
    *       and symbol.
    *
    * @param _name      Name of token.
    * @param _symbol    Desired symbol.
    *
    * @return contractAddress Deployed address.
    */
    function deployERC721ExtensionSignature(
        string memory _name, 
        string memory _symbol,
        uint256 _cappedSupply,
        address _devWallet
    )
    public
    nonReentrant
    whenNotPaused
    returns(address contractAddress)
    {
        /// @dev Deploy ERC721ExtensionSignature contract.
        ERC721ExtensionSignature _erc721ExtensionSignature = new ERC721ExtensionSignature(
            _name, 
            _symbol,
            _cappedSupply,
            _devWallet
        );
        /// @dev Return address.
        contractAddress = address(_erc721ExtensionSignature);
    }
}