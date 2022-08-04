// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

/**
* @title Admin contract.
* @author Daccred.
* @dev  The admin contract aims at taking all the deployer contracts
*       and mapping all the deployer function selectors to the respective 
*       addresses, then in turn, calling the selectors whenever the
*       relevant deployment is needed.
*
*       In turn, whenever a new change is made to a contract, we can
*       easily, redeploy and remap.
*/  
contract Admin {
    /// @dev Owner address.
    address private owner;
    /// @dev Mapping of all function signatures to the addresses
    mapping(bytes4 => address) private deployerSelectors;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addDeployerSelector(address _facet, bytes4 _selector) 
    public
    onlyOwner
    {
        require(_facet != address(0), "Facet Set To Zero Address.");
        deployerSelectors[_selector] = _facet;
    }

    function deployERC721ExtensionCore(string memory _name, string memory _symbol)
    public
    returns(address)
    {
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deployERC721ExtensionCore(string,string)"
            )
        );
        require(exists(_selector), "Selector Inexistent.");
        address _delegate = deployerSelectors[_selector];
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol
            )
        );

        require(sent, "Delegatecall Failed!");
        address _deployedAddress = abi.decode(data, (address));
        return _deployedAddress;
    }

    function deployERC721ExtensionSignature(
        string memory _name, 
        string memory _symbol,
        uint256 _cappedSupply,
        address _devWallet
    )
    public
    returns(address)
    {
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deployERC721ExtensionSignature(string,string,uint256,address)"
            )
        );
        require(exists(_selector), "Selector Inexistent.");
        address _delegate = deployerSelectors[_selector];
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol,
                _cappedSupply,
                _devWallet
            )
        );
        
        require(sent, "Delegatecall Failed!");
        address _deployedAddress = abi.decode(data, (address));
        return _deployedAddress;
    }

    function deploySoulbound(string memory _name, string memory _symbol)
    public
    returns(address)
    {
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulbound(string,string)"
            )
        );
        require(exists(_selector), "Selector Inexistent.");
        address _delegate = deployerSelectors[_selector];
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol
            )
        );
        
        require(sent, "Delegatecall Failed!");
        address _deployedAddress = abi.decode(data, (address));
        return _deployedAddress;
    }

    function deploySoulboundCore(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    )
    public
    returns(address)
    {
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulboundCore(string,string,address,uint256)"
            )
        );
        require(exists(_selector), "Selector Inexistent.");
        address _delegate = deployerSelectors[_selector];
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol,
                _allowlistOwner,
                _totalSupply
            )
        );
        
        require(sent, "Delegatecall Failed!");
        address _deployedAddress = abi.decode(data, (address));
        return _deployedAddress;
    }

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
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulboundRedeemable(string,string,address,uint256,uint256,uint256)"
            )
        );
        require(exists(_selector), "Selector Inexistent.");
        address _delegate = deployerSelectors[_selector];
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
        
        require(sent, "Delegatecall Failed!");
        address _deployedAddress = abi.decode(data, (address));
        return _deployedAddress;
    }

    function deploySoulboundWithSignature(
        string memory _name, 
        string memory _symbol,
        address _allowlistOwner,
        uint256 _totalSupply
    )
    public
    returns(address)
    {
        bytes4 _selector = bytes4(
            abi.encodeWithSignature(
                "deploySoulboundRedeemable(string,string,address,uint256)"
            )
        );
        require(exists(_selector), "Selector Inexistent.");
        address _delegate = deployerSelectors[_selector];
        (bool sent, bytes memory data) = _delegate.delegatecall(
            abi.encodeWithSelector(
                _selector,
                _name,
                _symbol,
                _allowlistOwner,
                _totalSupply
            )
        );
        
        require(sent, "Delegatecall Failed!");
        address _deployedAddress = abi.decode(data, (address));
        return _deployedAddress;
    }

    function exists(bytes4 _s) private view returns(bool) {
        return deployerSelectors[_s] != address(0);
    }
}