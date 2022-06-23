// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;

/// @dev Import the IERC721 Interface as well.
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
* @title Daccred Base.
* @author Anthony (fps) https://github.com/fps8k.
* @dev  Inspired by https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol.
*       This contract allows the caller the ability to mint multiple Tokens at the gas cost of one token.
*       Large number of tokens minted using the OpenZeppelin contracts are minted one at a time, compounding gas.
*       Minters also have to go through the hassle of verifying if a tokenId is already minted or in some cases don't.
*       But in this case, the token Ids are already generated.
*       Starting from 0, they are automatically minted to the caller based on quantity desired.
*       Also, mappings are not updated but are validated through a method referenced in the {ownerOf} function.
*       Burning tokens sends them to a DEAD address.
*
*       [NOTICE]
*       Every important function that moves tokens to and from addresses require the first parameter to be the owner of this contract.
*       This is to be passed from the Factory.
*
*       EXTENSIVE COMMENTS ARE STILL COMING.
* 
*       FUNCTIONS LEFT:
*       baseBurn
*       baseBurnFrom
*       baseTransfer
*       baseTransferFrom
*       baseApprove
*       baseApproveFrom
*
*       THIS CONTRACT IS UNFINISHED.
*/


contract DaccredBase {
    /// @dev Token name.
    string private tokenName;
    /// @dev Token symbol.
    string private tokenSymbol;
    /// @dev Owner of the tokens.
    address private owner;
    /// @dev Stores the number of tokens minted.
    /// @dev Starts from 0 and is incremented per mint based on quantity minted.
    uint256 private tokensMinted;
    /// @dev Stores the number of tokens burned.
    uint256 private tokensBurned;
    /// @dev Mapping of minted tokens.
    mapping(uint256 => address) private tokens;
    /// @dev Individual mappings of token minters and tokensOwned.
    mapping(address => uint256) private tokenBalances;
    /// @dev Mapping of tokens to approvals.
    mapping(uint256 => address) private tokenApprovals;
    /// @dev Mapping from owner to operator approvals.
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    /// @dev DEAD address for burning tokens.
    address private constant DEAD = 0x000000000000000000000000000000000000dEaD;

    // Test
    // Token, TKN, 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

    /// @dev Emitted when user mints a token.
    event BaseMint(address indexed from, address indexed to);
    /// @dev Thrown when tokens are minted by a 0 address.
    // error BaseMintToZeroAddress(string);

    /// @dev Constructor that deploys your own tokens.
    constructor(string memory _name, string memory _symbol, address _owner) {
        /// @dev Assign name.
        tokenName = _name;
        /// @dev Assign symbol.
        tokenSymbol = _symbol;
        /// @dev Assign owner of this token for security purposes when integrated with the Factory.
        /// @dev This will allow some functions to be only called by the deployer from the Factory.
        owner = _owner;
    }

    /**
    * @dev Returns the name of the Token.
    *
    * @return Token name.
    */
    function name() public view returns(string memory) {
        /// @dev Returns the name of the token.
        return tokenName;
    }

    /**
    * @dev Returns the symbol of the Token.
    *
    * @return Token symbol.
    */
    function symbol() public view returns(string memory) {
        /// @dev Returns the symbol of the token.
        return tokenSymbol;
    }

    /**
    * @dev Returns the total supply of tokens in this network.
    *
    * @return Token total supply.
    */
    function totalSupply() public view returns(uint256) {
        /// @dev Returns the value of the number of tokens minted - the number of tokens burned.
        return (tokensMinted - tokensBurned);
    }

    /**
    * @dev Returns the absolute total count of minted tokens (including those burned).
    *
    * @return uint256 absolute token total.
    */
    function getTotalMints() public view returns(uint256) {
        /// @dev Returns the absolute token total.
        return tokensMinted;
    }

    /**
    * @dev  See {IERC165-supportsInterface}.
    *       Copied from https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol.
    */
    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        // The interface IDs are constants representing the first 4 bytes of the XOR of
        // all function selectors in the interface. See: https://eips.ethereum.org/EIPS/eip-165
        // e.g. `bytes4(i.functionA.selector ^ i.functionB.selector ^ ...)`
        return
            interfaceId == 0x01ffc9a7 || // ERC165 interface ID for ERC165.
            interfaceId == 0x80ac58cd || // ERC165 interface ID for ERC721.
            interfaceId == 0x5b5e139f; // ERC165 interface ID for ERC721Metadata.
    }

    /**
    * @dev  Returns the owner of a particular token.
    *       There are a bit of functions that shall be made clear here.
    *
    * @param _tokenId :: The token Id to return the owner.
    */
    function ownerOf(uint256 _tokenId) public view returns(address ownerOfToken) {
        require(exists(_tokenId), "Query for non-existent token");
        address addressToFind;
        /// @dev Assign the _tokenId to an index.
        uint256 tokenIndex = _tokenId;

        /// @dev Starting from that index, it will track back until it lands on a token mapped to an address that is not a Zero or DEAD address.
        for (uint i = tokenIndex; i >= 1; i--) {
            /// @dev If the token is mapped to an address that is not DEAD and not Zero, then stop and break.
            if ((tokens[i] != DEAD) && (tokens[i] != address(0))) {
                /// @dev Assign that address to the address to be found.
                addressToFind = tokens[i];
                /// @dev Break.
                break;
            }else {
                /// @dev Else:
                /// @dev Skip that address map.
                continue;
            }
        }

        /// @dev Return the found address.
        ownerOfToken = addressToFind;
    }

    /**
    * @dev  Mints tokens to caller.
    *       _address must be the owner.
    *
    * @param quantity :: Number of tokens to be minted.
    */
    function baseMint(address _address, uint256 quantity) public {
        /// @dev Ensure caller is not 0 address.
        require(msg.sender != address(0), "Mint by 0 Address");
        /// @dev Ensure address is the owner.
        require(_address == owner, "!Owner");
        /// @dev From Solidity versions GT 0.8, the compiler automatically checks for overflows.
        /// @dev Mint `quantity` amount of tokens to caller.
        _baseMint(owner, quantity);
    }

    /**
    * @dev  Mints tokens to `_address`.
    *       _address must be the owner.
    *
    * @param _address   Owner.
    * @param _to        Expected owner of tokenId.
    * @param quantity   Number of tokens to be minted.
    */
    function baseMintTo(
        address _address, 
        address _to, 
        uint256 quantity
    ) public 
    {
        /// @dev Ensure caller is not 0 address.
        require(msg.sender != address(0), "Sent from 0 Address");
        /// @dev Ensure address is the owner.
        require(_address == owner, "!Owner");
        /// @dev Ensure receiver is not 0 address.
        require(_to != address(0), "Mint to 0 Address");
        /// @dev From Solidity versions GT 0.8, the compiler automatically checks for overflows.
        /// @dev Mint `quantity` amount of tokens to caller.
        _baseMint(_to, quantity);
    }

    /**
    * @dev Returns true if the address is approved by the owner of the token.
    * 
    * @param tokenId    to be checked.
    * @param _address   to be checked.
    *
    * @return bool.
    */
    function isApproved(uint256 tokenId, address _address) public view returns(bool) {
        /// @dev Makes sure that the tokenId is exisent.
        require(exists(tokenId), "Query for non-existent token.");
        /// @dev Returns true if the _address is approved by the token owner.
        bool isApprovedByTokenOwner = (tokenApprovals[tokenId] == _address);
        /// @dev Evaluate and return.
        return isApprovedByTokenOwner;
    }

    /**
    * @dev  Returns true if the address is approved by the operator for all tokens not owned by the owner of the token.
    * 
    * @param _address   to be checked.
    *
    * @return bool.
    */
    function isApprovedForAll(address _address) public view returns(bool) {
        /// @dev Returns true if the owner of the token has approved him to send all.
        bool isApprovedByOperator = (_operatorApprovals[owner][_address]);
        /// @dev Evaluate and return.
        return isApprovedByOperator;
    }

    /**
    * @dev  Returns True if the token in question is owned by the owner of the contract.
    *
    * @param tokenId    to search for.
    *
    * @return bool.
    */
    function isOwnedByOwner(uint256 tokenId) public view returns(bool) {
        /// @dev Evaluate that the owner of the tokenId is the owner of the contract.
        return (ownerOf(tokenId) == owner);
    }

    /**
    * @dev Returns true if the `tokenId` passed exists.
    *
    * @param tokenId    Token to valdate.
    *
    * @return uint256   true or false.
    */
    function exists(uint256 tokenId) private view returns(bool) {
        /// @dev Require that the tokenId passed is less than the number of tokens minted.
        bool isValidTokenNumber = (tokenId > 0) && (tokenId <= tokensMinted);
        /// @dev Require that the address owning the tokenId is not a DEAD address, meaning that the token was burnt and doesn't exist.
        bool isAlive = tokens[tokenId] != DEAD;
        /// @dev All checks passed.
        return isValidTokenNumber && isAlive;
    }

    /**
    * @dev  Mints tokens to caller.
    * 
    * @param _to        Address to mint to.
    * @param _quantity  to be minted.
    */
    function _baseMint(address _to, uint256 _quantity) private {
        /// @dev Get the current next number to be minted.
        uint256 currentMint = getTotalMints() + 1;
        /// @dev Assign it to the `_to` address.
        tokens[currentMint] = _to;
        /// @dev Increment the tokensMinted and add the `_quantity` minted.
        tokensMinted += _quantity;
        /// @dev Increment the callers totalBalance of tokens.
        tokenBalances[msg.sender] += _quantity;
        /// @dev Emit the {Mint} event.
        emit BaseMint(address(0), _to);
    }
}

