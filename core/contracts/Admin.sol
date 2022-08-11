// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Admin contract.
* @author Daccred.
* @dev  The admin contract aims at taking all the deployer contracts
*       and mapping all the deployer function selectors to the respective 
*       addresses, then in turn, calling the selectors via delegatecall
*       whenever the relevant deployment is needed.
*
*       In turn, whenever a new change is made to a contract, we can
*       easily, redeploy and remap.
*/  
contract Admin {
    /// @dev Owner address.
    address private owner;
    /// @dev Mapping of all function signatures to the addresses.
    mapping(bytes4 => address) private deployerSelectors;

    /// @dev Making sure only the owner can call these functions.
    modifier onlyOwner() {
        /// @dev Require that the sender is the owner.
        require(msg.sender == owner, "Not Owner.");
        _;
    }

    /// @dev Constructor.
    constructor() {
        /// @dev Set owner.
        owner = msg.sender;
    }

    /**
    * @dev  This function adds a new selector or replaces a particular
    *       selector from the selector map.
    *
    * @param _facet     Facet address containing the function we need.
    * @param _selector  Selector of the function desired.
    */
    function addDeployerSelector(address _facet, bytes4 _selector) 
    public
    onlyOwner
    {
        /// @dev Make sure facet is not a zero address.
        require(_facet != address(0), "Facet Set To Zero Address.");
        /// @dev Add selector to map.
        deployerSelectors[_selector] = _facet;
    }

    /**
    * @dev  Deploys the ERC721ExtensionCore with a set name
    *       and symbol using delegatecall to its facet.
    *
    * @param _name      Name of token.
    * @param _symbol    Desired symbol.
    *
    * @return address
    */
    function deployERC721ExtensionCore(string memory _name, string memory _symbol)
    public
    returns(address)
    {
        /// @dev Get selector.
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deployERC721ExtensionCore(string,string)"
            )
        );
        /// @dev Require that the selector for the function exists.
        require(exists(_selector), "Selector Inexistent.");
        /// @dev Get the address of the facet mapped to the selector.
        address _delegate = deployerSelectors[_selector];
        /// @dev Delegate call to the facet using the parameters passed.
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol
            )
        );
        /// @dev Require the call was sent.
        require(sent, "Delegatecall Failed!");
        /// @dev Decode returned address from delegatecall.
        address _deployedAddress = abi.decode(data, (address));
        /// @dev Return address.
        return _deployedAddress;
    }

    /**
    * @dev  Deploys the ERC721ExtensionSignature with its constructor
    *       parameters using delegatecall to its facet.
    *
    * @param _name      Name of token.
    * @param _symbol    Desired symbol.
    *
    * @return address
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
    public
    returns(address)
    {
        /// @dev Get selector.
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deployERC721ExtensionSignature(string,string,address,uint256,uint256,uint256,uint256)"
            )
        );
        /// @dev Require that the selector for the function exists.
        require(exists(_selector), "Selector Inexistent.");
        /// @dev Get the address of the facet mapped to the selector.
        address _delegate = deployerSelectors[_selector];
        /// @dev Delegate call to the facet using the parameters passed.
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name, 
                _symbol,
                _comissioner,
                _maxSupply,
                _commissions,
                _cappedSupply,
                _redemptionTariff
            )
        );
        /// @dev Require the call was sent.
        require(sent, "Delegatecall Failed!");
        /// @dev Decode returned address from delegatecall.
        address _deployedAddress = abi.decode(data, (address));
        /// @dev Return address.
        return _deployedAddress;
    }

    /**
    * @dev  Deploys the Soulbound Contract with a set name
    *       and symbol using delegatecall to its facet.
    *
    * @param _name      Name of token.
    * @param _symbol    Desired symbol.
    *
    * @return address
    */
    function deploySoulbound(string memory _name, string memory _symbol)
    public
    returns(address)
    {
        /// @dev Get selector.
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulbound(string,string)"
            )
        );
        /// @dev Require that the selector for the function exists.
        require(exists(_selector), "Selector Inexistent.");
        /// @dev Get the address of the facet mapped to the selector.
        address _delegate = deployerSelectors[_selector];
        /// @dev Delegate call to the facet using the parameters passed.
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol
            )
        );
        /// @dev Require the call was sent.
        require(sent, "Delegatecall Failed!");
        /// @dev Decode returned address from delegatecall.
        address _deployedAddress = abi.decode(data, (address));
        /// @dev Return address.
        return _deployedAddress;
    }

    /**
    * @dev  Deploys the SoulboundCore Contract with its constructor
    *       parameters using delegatecall to its facet.
    *
    * @param _name              Name of token.
    * @param _symbol            Desired symbol.
    * @param _allowlistOwner    Desired owner of the contrat for sigs.
    * @param _totalSupply       Desired total supply.
    *
    * @return address
    */
    function deploySoulboundCore(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    )
    public
    returns(address)
    {
        /// @dev Get selector.
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulboundCore(string,string,address,uint256)"
            )
        );
        /// @dev Require that the selector for the function exists.
        require(exists(_selector), "Selector Inexistent.");
        /// @dev Get the address of the facet mapped to the selector.
        address _delegate = deployerSelectors[_selector];
        /// @dev Delegate call to the facet using the parameters passed.
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol,
                _allowlistOwner,
                _totalSupply
            )
        );
        /// @dev Require the call was sent.
        require(sent, "Delegatecall Failed!");
        /// @dev Decode returned address from delegatecall.
        address _deployedAddress = abi.decode(data, (address));
        /// @dev Return address.
        return _deployedAddress;
    }

    /**
    * @dev  Deploys the SoulboundRedeemable Contract with its constructor
    *       parameters using delegatecall to its facet.
    *
    * @param _name              Name of token.
    * @param _symbol            Desired symbol.
    * @param _allowlistOwner    Desired owner of the contrat for sigs.
    * @param _totalSupply       Desired total supply.
    * @param _priceLimit        Desired price limit.
    * @param _tokenPrice        Desired token price.
    *
    * @return address
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
    returns(address)
    {
        /// @dev Get selector.
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulboundRedeemable(string,string,address,uint256,uint256,uint256)"
            )
        );
        /// @dev Require that the selector for the function exists.
        require(exists(_selector), "Selector Inexistent.");
        /// @dev Get the address of the facet mapped to the selector.
        address _delegate = deployerSelectors[_selector];
        /// @dev Delegate call to the facet using the parameters passed.
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol,
                _allowlistOwner,
                _totalSupply,
                _priceLimit,
                _tokenPrice
            )
        );
        /// @dev Require the call was sent.
        require(sent, "Delegatecall Failed!");
        /// @dev Decode returned address from delegatecall.
        address _deployedAddress = abi.decode(data, (address));
        /// @dev Return address.
        return _deployedAddress;
    }

    /**
    * @dev  Deploys the SoulboundWithSignature Contract with its constructor
    *       parameters using delegatecall to its facet.
    *
    * @param _name              Name of token.
    * @param _symbol            Desired symbol.
    * @param _allowlistOwner    Desired owner of the contrat for sigs.
    * @param _totalSupply       Desired total supply.
    *
    * @return address
    */
    function deploySoulboundWithSignature(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    )
    public
    returns(address)
    {
        /// @dev Get selector.
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulboundRedeemable(string,string,address,uint256)"
            )
        );
        /// @dev Require that the selector for the function exists.
        require(exists(_selector), "Selector Inexistent.");
        /// @dev Get the address of the facet mapped to the selector.
        address _delegate = deployerSelectors[_selector];
        /// @dev Delegate call to the facet using the parameters passed.
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol,
                _allowlistOwner,
                _totalSupply
            )
        );
        /// @dev Require the call was sent.
        require(sent, "Delegatecall Failed!");
        /// @dev Decode returned address from delegatecall.
        address _deployedAddress = abi.decode(data, (address));
        /// @dev Return address.
        return _deployedAddress;
    }

    /**
    * @dev  Returns true if a selector `_s` is mapped to a valid
    *       address in the deployerSelector mapping.
    *
    * @param _s Function selector.
    *
    * @return bool
    */
    function exists(bytes4 _s) private view returns(bool) {
        /// @dev    Return true if it is mapped to a valid address.
        ///         OR Return true if it is not mapped to a zero 
        ///         address.
        return deployerSelectors[_s] != address(0);
    }
}
