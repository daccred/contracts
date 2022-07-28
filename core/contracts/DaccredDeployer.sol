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

/**
* @title Daccred Deployer.
* @author Anthony (fps) https://github.com/0xfps.
* @dev  This contracts imports and provides functions
*       that deploys each imported contract.
*/
contract DaccredDeployer is Pausable {
    /// @dev Enum of all listed contract extensions.
    enum Extensions {
        Soulbound,
        SoulboundCore,
        SoulboundWithSignature,
        SoulboundRedeemable
    }

    /// @dev    Mapping of Extension to uint256 to track which 
    ///         contracts are gettting published the most.
    mapping(Extensions => uint256) private extensionDeployRate;

    /// @dev Emitted when a new contract is deployed.
    event Deployed(Extension indexed _extension, address indexed _deployAddress);

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
    returns(address contractAddress)
    {
        /// @dev Ensure a valid name and symbol.
        require(_isNotEmpty(_name, _symbol), "Valid Name or Symbol Required.");
        /// @dev Random salt.
        uint256 _salt = block.timestamp + block.number;
        /// @dev Deploy Soulbound contract using Create2 random salt.
        Soulbound _soulbound = new Soulbound{
            salt: keccak256(abi.encodePacked(_salt))
        }(_name, _symbol);
        /// @dev Increment Extension Deploy Rate.
        extensionDeployRate[Extensions.Soulbound]++;
        /// @dev Emit the {Deployed} event.
        emit Deployed(Extensions.Soulbound, address(_soulbound));
        /// @dev Return address.
        contractAddress address(_soulbound);
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
    returns(address contractAddress)
    {
        /// @dev Ensure a valid name and symbol.
        require(_isNotEmpty(_name, _symbol), "Valid Name or Symbol Required.");
        /// @dev Ensure allowlistOwner is not a zero address.
        require(_allowlistOwner != address(0), "AllowlistOwner Is Zero Address");
        /// @dev Random salt.
        uint256 _salt = block.timestamp + block.number;
        /// @dev Deploy Soulbound contract using Create2 random salt.
        SoulboundCore _soulboundCore = new SoulboundCore{
            salt: keccak256(abi.encodePacked(_salt))
        }(
            _name, 
            _symbol,
            _allowlistOwner,
            _totalSupply
        );
        /// @dev Increment Extension Deploy Rate.
        extensionDeployRate[Extensions.SoulboundCore]++;
        /// @dev Emit the {Deployed} event.
        emit Deployed(Extensions.SoulboundCore, address(_soulboundCore));
        /// @dev Return address.
        contractAddress address(_soulboundCore);
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
    function deploySoulboundCore(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply,
        uint256 _priceLimit,
        uint256 _tokenPrice
    )
    external
    nonReentrant
    returns(address contractAddress)
    {
        /// @dev Ensure a valid name and symbol.
        require(_isNotEmpty(_name, _symbol), "Valid Name or Symbol Required.");
        /// @dev Ensure allowlistOwner is not a zero address.
        require(_allowlistOwner != address(0), "AllowlistOwner Is Zero Address");
        /// @dev Random salt.
        uint256 _salt = block.timestamp + block.number;
        /// @dev Deploy Soulbound contract using Create2 random salt.
        SoulboundRedeemable _soulboundRedeemable = new SoulboundRedeemable{
            salt: keccak256(abi.encodePacked(_salt))
        }(
            _name, 
            _symbol,
            _allowlistOwner,
            _totalSupply,
            _priceLimit,
            _tokenPrice
        );
        /// @dev Increment Extension Deploy Rate.
        extensionDeployRate[Extensions.SoulboundRedeemable]++;
        /// @dev Emit the {Deployed} event.
        emit Deployed(Extensions.SoulboundRedeemable, address(_soulboundRedeemable));
        /// @dev Return address.
        contractAddress address(_soulboundRedeemable);
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
    function deploySoulboundCore(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    )
    external
    nonReentrant
    returns(address contractAddress)
    {
        /// @dev Ensure a valid name and symbol.
        require(_isNotEmpty(_name, _symbol), "Valid Name or Symbol Required.");
        /// @dev Ensure allowlistOwner is not a zero address.
        require(_allowlistOwner != address(0), "AllowlistOwner Is Zero Address");
        /// @dev Random salt.
        uint256 _salt = block.timestamp + block.number;
        /// @dev Deploy Soulbound contract using Create2 random salt.
        SoulboundWithSignature _soulboundWithSignature = new SoulboundWithSignature{
            salt: keccak256(abi.encodePacked(_salt))
        }(
            _name, 
            _symbol,
            _allowlistOwner,
            _totalSupply
        );
        /// @dev Increment Extension Deploy Rate.
        extensionDeployRate[Extensions.SoulboundWithSignature]++;
        /// @dev Emit the {Deployed} event.
        emit Deployed(Extensions.SoulboundWithSignature, address(_soulboundWithSignature));
        /// @dev Return address.
        contractAddress address(_soulboundWithSignature);
    }

    /**
    * @dev Checks 2 string parameters to ensure that their lengths are not 0.
    *
    * @param _name      Name string passed.
    * @param _symbol    Symbol string passed.
    *
    * @return notEmpty Bool, true or false.
    */
    function _isNotEmpty(string memory _name, string memory _symbol)
    private
    returns(bool notEmpty)
    {
        /// @dev Return true if the length of both are not 0.
        notEmpty = (
            bytes(_name).length != 0 &&
            bytes(_symbol).length != 0
        );
    }
}