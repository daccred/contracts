// SPDX-License-Identifier: GPL-3.0
  
/// ██████╗  █████╗  ██████╗ ██████╗██████╗ ███████╗██████╗ 
/// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗
/// ██║  ██║███████║██║     ██║     ██████╔╝█████╗  ██║  ██║
/// ██║  ██║██╔══██║██║     ██║     ██╔══██╗██╔══╝  ██║  ██║
/// ██████╔╝██║  ██║╚██████╗╚██████╗██║  ██║███████╗██████╔╝
/// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═════╝ 

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
* @title Daccred Base.
* @author Daccred.
* @dev  Inspired by https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol.
*       This contract allows the caller the ability to mint multiple Tokens
*       at the gas cost of one token.
*       Large number of tokens minted using the OpenZeppelin contracts are 
*       minted one at a time, compounding gas.
*       Minters also have to go through the hassle of verifying if a tokenId 
*       is already minted or in some cases don't.
*       But in this case, the token Ids are already generated.
*       Starting from 0, they are automatically minted to the caller based on 
*       quantity desired.
*       Also, mappings are not updated but are validated through a method 
*       referenced in the {ownerOf} function.
*       Burning tokens sends them to a DEAD address.
*       This contract implements all of the IERC721 interface but with a 
*       different code structure.
*
* @notice   Every important function that moves tokens to and from addresses 
*           require the first parameter to be the owner of this contract.
*           This is to be passed from the Factory.
*
* THIS CONTRACT IS UNFINISHED.
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
    /// @dev Individual mappings of token minters to number of tokensOwned.
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
    /// @dev Emitted when user burns a token.
    event BaseBurn(address indexed from, address indexed to);
    /// @dev Emitted when a token is transferred from an address to another address.
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 tokenId
    );
    /// @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
    event Approval(
        address indexed owner, 
        address indexed approved, 
        uint256 indexed tokenId
    );

    /// @dev    Validates that the address allowed to access the function is the
    ///         of the contract. Functions marked with this modifier can only
    ///         be called by the owner of the contract.
    modifier onlyOwner(address _address) {
        /// @dev Ensure address is the owner.
        require(_address == owner, "!Owner");
        /// @dev Continue.
        _;
    }

    /**
    * @dev  When deployed from the Factory, the three params passed are
    *       the token name, the symbol and the address of the owner of
    *       the token. 
    *       Owner is assigned to the address deploying the contract.
    *       Example: `DaccredBase _base = new DaccredBase(a, b, msg.sender);`
    *       As a result of this constructor implementation and for security,
    *       all functions called to an instance of this contract from the
    *       Factory, and is necessary to move, send or burn tokens, will
    *       be accompanied by a mandatory `owner` argument.
    *       This will be validated on this side of the contract to ensure that
    *       the owner or an address in the `tokenApprovals` or `_operatorApprovals`
    *       and can be liable to make token transfers or mints.
    *
    * @param _name      The name of the token e.g "My Token".
    * @param _symbol    The symbol of the token desired to be minted e.g "MTK".
    * @param _owner     Address to own the token, from the Factory, it should be the
    *                   msg.sender.
    */
    constructor(
        string memory _name, 
        string memory _symbol, 
        address _owner
    )
    {
        /// @dev Assign name.
        tokenName = _name;
        /// @dev Assign symbol.
        tokenSymbol = _symbol;
        /// @dev    Assign owner of this token for security purposes whenintegrated
        ///         with the Factory.
        ///         This will allow some functions to be only called by the deployer 
        ///         from the Factory.
        owner = _owner;
    }

    /**
    * @dev  Returns the name of the Token.
    *       [Ref IERC721Metadata - name].
    *
    * @return string Token name.
    */
    function name() public view returns(string memory) {
        /// @dev Returns the name of the token.
        return tokenName;
    }

    /**
    * @dev  Returns the symbol of the Token.
    *       [Ref IERC721Metadata - symbol].
    *
    * @return string Token symbol.
    */
    function symbol() public view returns(string memory) {
        /// @dev Returns the symbol of the token.
        return tokenSymbol;
    }

    /**
    * @dev  Returns the Uniform Resource Identifier (URI) for `tokenId` token.
    *       [Ref IERC721Metadata - tokenURI].
    *
    * @param tokenId Token to return its URI.
    *
    * @return string Token URI.
    */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        /**
        * @dev  Maybe the constructor might be modified to take in a base URI
        *       for the tokens when this is instantiated.
        *       The base URI will be packed with the tokenId to return a
        *       complete token URI.
        */
    }

    /**
    * @dev Returns the total supply of tokens in this network.
    *
    * @return uint256 Token total supply.
    */
    function totalSupply() public view returns(uint256) {
        /// @dev    Returns the value of 
        ///         the number of tokens minted - the number of tokens burned.
        return (tokensMinted - tokensBurned);
    }

    /**
    * @dev Returns the absolute total count of minted tokens (including those burned).
    *
    * @return uint256 Absolute token total.
    */
    function totalMints() public view returns(uint256) {
        /// @dev Returns the absolute token total.
        return tokensMinted;
    }

    /**
    * @dev Returns the total tokens owned by `_address`.
    *      Address must not be a 0 address.
    *
    * @param _address Token owner.
    *
    * @return uint256.
    */
    function balanceOf(address _address) public view returns(uint256) {
        /// @dev Require the address is valid.
        require(_address != address(0), "Zero address");
        /// @dev Returns the absolute token total.
        return tokenBalances[_address];
    }

    /**
    * @dev  [Ref IERC165 - supportsInterface].
    *       Copied from https://github.com/chiru-labs/ERC721A/blob/main/contracts/ERC721A.sol.
    */
    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        /// @dev    The interface IDs are constants representing the first 4 bytes of the XOR of
        ///         all function selectors in the interface. See: https://eips.ethereum.org/EIPS/eip-165
        ///         e.g. `bytes4(i.functionA.selector ^ i.functionB.selector ^ ...)`
        return
            interfaceId == 0x01ffc9a7 ||    /// @dev ERC165 interface ID for ERC165.
            interfaceId == 0x80ac58cd ||    /// @dev ERC165 interface ID for ERC721.
            interfaceId == 0x5b5e139f;      /// @dev ERC165 interface ID for ERC721Metadata.
    }

    /**
    * @dev  Returns the owner of a particular token.
    *       The ownership of a particular token is not made explicit, rather, 
    *       the owner owns a chronological number of tokens, starting from the mint.
    *       What does this mean?
    *       If Alice wants to mint 5 tokens, the contract automatically maps the tokenId
    *       of the current starting token number to her, and increments her token mints 
    *       by her quantity.
    *       Meaning that Alice explicitly owns token #1, #2, #3, #4, #5. But in the map 
    *       she is only mapped to token #1. [Ref DaccredBase - mint].
    *       Should we look for the owner of token #5, we simply iterate down until a 
    *       valid address that is not a DEAD address is found. That address, owns every 
    *       token infront of it, until another valid address mints, and it goes on.
    *
    * @param _tokenId The token Id to return the owner.
    */
    function ownerOf(uint256 _tokenId) public view returns(address ownerOfToken) {
        /// @dev Require that the tokenId exists.
        require(exists(_tokenId), "Query for non-existent token");
        /// @dev This address holds the address we shall return.
        address addressToFind;
        /// @dev Assign the _tokenId to an index.
        uint256 tokenIndex = _tokenId;

        /// @dev    Starting from that index, it will iterate back until it lands on a 
        ///         token mapped to an address that is not a Zero or DEAD address.
        for (uint256 i = tokenIndex; i >= 1; i--) {
            /// @dev    If the token is mapped to an address that is not DEAD and not Zero,
            ///         then break.
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
    * @dev  When the owner creates his own contract, he might decide to choose
    *       to himself, this function does that.
    *       Verifying that the first address is the owner of the contract it 
    *       mints `quantity` number of tokens to the owner of the contract.
    *       
    * @notice _address must be the owner.
    *
    * @param _address   Required address of the owner of the contract instantiation.
    *                   This will be passed from the Factory e.g `mint(msg.sender, 6);`.
    * @param quantity   Number of tokens to be minted.
    */
    function mint(address _address, uint256 quantity) public onlyOwner(_address) {
        /// @dev Ensure caller is not 0 address.
        require(msg.sender != address(0), "Mint by 0 Address");
        /// @dev Ensure the quantity is GT 0.
        require(quantity != 0, "Minting 0 tokens");
        /// @dev    From Solidity versions GT 0.8, the compiler automatically checks for overflows.
        ///         Mint `quantity` amount of tokens to caller.
        ///         In this case, owner == _address. 
        _mint(owner, quantity);
    }

    /**
    * @dev  When the owner creates his own contract, he might decide to choose to 
    *       mint some tokens to a particular address, this function does that.
    *       Verifying that the first address is the owner of the contract it mints 
    *       `quantity` number of tokens to the address specified as the second 
    *       argument of the contract function.
    *       
    * @notice _address must be the owner.
    *
    * @param _address   Required address of the owner of the contract instantiation.
    *                   This will be passed from the Factory e.g `mint(msg.sender, 6);`.
    * @param quantity   Number of tokens to be minted.
    */
    function mintTo(
        address _address, 
        address _to, 
        uint256 quantity
    ) public onlyOwner(_address)
    {
        /// @dev Ensure caller is not 0 address.
        require(msg.sender != address(0), "Sent from 0 Address");
        /// @dev Ensure receiver is not 0 address.
        require(_to != address(0), "Mint to 0 Address");
        /// @dev Ensure the quantity is GT 0.
        require(quantity != 0, "Minting 0 tokens");
        /// @dev    From Solidity versions GT 0.8, the compiler automatically checks
        ///         for overflows.
        ///         Mint `quantity` amount of tokens to caller. Should the owner pass
        ///         his address as `_to`, it should mint to that address.
        _mint(_to, quantity);
    }

    /**
    * @dev  Returns true if the `_address` is approved by the owner of the 
    *       contract to transfer Token `tokenId`.
    * 
    * @param tokenId    Token to check its approval.
    * @param _address   Address to check if it is approved to spend or transfer 
    *                   token `tokenId`.
    *
    * @return bool.
    */
    function isApproved(uint256 tokenId, address _address) public view returns(bool) {
        /// @dev Makes sure that the tokenId is existent.
        require(exists(tokenId), "Query for non-existent token.");
        /// @dev Returns true if the _address is approved by the token owner.
        bool isApprovedByTokenOwner = (tokenApprovals[tokenId] == _address);
        /// @dev Evaluate and return.
        return isApprovedByTokenOwner;
    }

    /**
    * @dev  Returns true if the `_address` is approved by the owner of the 
    *       contract to transfer all tokens owned by owner.
    * 
    * @param _address   Address to check if it is approved to spend or transfer
    *                   all tokens.
    *
    * @return bool.
    */
    function approvedForAll(address _address) public view returns(bool) {
        /// @dev Returns true if the owner of the token has approved him to send all.
        bool isApprovedByOperatorForAll = (_operatorApprovals[owner][_address]);
        /// @dev Evaluate and return.
        return isApprovedByOperatorForAll;
    }

    /**
    * @dev Returns True if the token in question is owned by the owner of the contract.
    *
    * @param tokenId Token to evaluate.
    *
    * @return bool.
    */
    function isOwnedByOwner(uint256 tokenId) public view returns(bool) {
        /// @dev Evaluate that the owner of the tokenId is the owner of the contract.
        return (ownerOf(tokenId) == owner);
    }

    /**
    * @dev  Deletes token `tokenId` by sending it to a DEAD address, the dead address
    *       has been specified above. When a token is burnt, it doesn't exist anymore
    *       and the count of `tokensBurned` is incremented.
    *       To save gas, tokens can only be burnt one at a time.
    *       WILL THIS BE CHANGED?
    *       This function can only be called by the owner of the token or someone
    *       approved to handle the token by the token owner.
    *       Addresses that have access to all tokens via operatorApprovals cannot
    *       call this function due to security checks.
    *       IS THAT OPERATOR APPROVALS TO HANDLE ALL TOKENS EVEN NECESSARY?
    *
    * @param _address   Presumed owner of the token, passed from the Factory.
    * @param tokenId    Token to be burnt.
    */
    function burn(address _address, uint256 tokenId) public {
        /// @dev Ensure that the _address owns the token or is approved to use it.
        require(exists(tokenId), "Query for non-existent token.");
        /// @dev Ensure that the user is allowed or can spend the token.
        require(isAllowed(_address, tokenId), "Call to unowned or unapproved token.");
        /// @dev Get the owner of the token.
        address tokenOwner = ownerOf(tokenId);
        /// @dev    If the address can spend that token, either by owning it or
        ///         Being approved to spend it, then proceed.
        _burn(tokenOwner, tokenId);
    }

    /**
    * @dev  Transfers token `tokenId` from `from` to `to`.
    *       The token `tokenId` must be owned by the `from`.
    *       The receiving address must also be a valid address.
    *       From the factory, the `from` address passed will be the msg.sender.
    *       Emits the {Transfer} event.
    *
    * @param from The owner of the token.
    * @param to   Receiver.
    * @param tokenId    Token owned.
    */
    function transfer(
        address from, 
        address to, 
        uint256 tokenId
    ) public 
    {
        /// @dev Require the token exists.
        require(exists(tokenId), "Transfer of inexistent token.");
        /// @dev Require the receiver is not a zero address.
        require(to != address(0), "Transfer to zero address");
        /// @dev Ensure that the owner of the token is the from.
        require(isAllowed(from, tokenId), "Transfer of unowned token");
        /// @dev Get the actual owner of the token.
        address tokenOwner = ownerOf(tokenId);
        /// @dev Transfer.
        _transfer(tokenOwner, to, tokenId);
    }

    /**
    * @dev  Approves `spender` by giving the address the right to spend
    *       token `tokenId`. The `tokenOwner` will be passed from the 
    *       Factory and must be the owner of `tokenId`.
    * 
    * @notice   This might be changed.
    *           An approved address cannot approve another address, and
    *           Approving another address on a token, replaces the old
    *           spender.
    *
    * @param tokenOwner     Owner of the token.
    * @param spender        Spender to be approved.
    * @param tokenId        Token Id to be approved.
    */
    function approve(
        address tokenOwner, 
        address spender, 
        uint256 tokenId
    ) public 
    {
        /// @dev Require the token exists.
        require(exists(tokenId), "Approval of inexistent token.");
        /// @dev    Because approved addresses cannot approve, the use of the 
        ///         isAllowed function will be odd. The ownerOf function
        ///         will be used instead.
        require(ownerOf(tokenId) == tokenOwner, "Approval from non-owner.");
        /// @dev Require the receiver is not a zero address.
        require(spender != address(0), "Approval to zero address");
        /// @dev Approve.
        _approve(tokenOwner, spender, tokenId);
    }

    /**
    * @dev Returns true if the `tokenId` passed exists.
    *
    * @param tokenId Token to valdate.
    *
    * @return bool.
    */
    function exists(uint256 tokenId) private view returns(bool) {
        /// @dev Require that the tokenId passed is less than the number of tokens minted.
        bool isValidTokenNumber = (tokenId > 0) && (tokenId <= tokensMinted);
        /// @dev    Require that the address owning the tokenId is not a DEAD address,
        ///         meaning that the token was burnt and doesn't exist
        bool isAlive = tokens[tokenId] != DEAD;
        /// @dev All checks passed.
        return isValidTokenNumber && isAlive;
    }

    /**
    * @dev  Mints `_quantity` amount of tokens to `_to`.
    *       Prior to this function call, `_to` must have been checked to be
    *       a valid address. Also, quantity have been checked to be GT 0.
    * 
    * @param _to        Address to mint to.
    * @param _quantity  Quantity to be minted.
    */
    function _mint(address _to, uint256 _quantity) private {
        /// @dev Get the current next number to be minted.
        uint256 currentMint = totalMints() + 1;
        /// @dev Assign it to the `_to` address.
        tokens[currentMint] = _to;
        /// @dev Increment the tokensMinted and add the `_quantity` minted.
        tokensMinted += _quantity;
        /// @dev Increment the callers totalBalance of tokens.
        tokenBalances[_to] += _quantity;
        /// @dev Emit the {Mint} event.
        emit BaseMint(address(0), _to);
    }

    /**
    * @dev  Checks if `_address` owns the token `tokenId` or is allowed to 
    *       spend the token.
    *
    * @param _address   Address to check.
    * @param tokenId    Token to check.
    *
    * @return bool.
    */
    function isAllowed(address _address, uint256 tokenId) private view returns(bool) {
        /// @dev    The token has been found to exist, according to the calling
        ///         function. Validates that the owner of the token is the `_address`.
        ///         Return true if true.
        bool ownsToken = (ownerOf(tokenId) == _address);
        /// @dev    Validates that the owner is approved to send token `tokenId`.
        ///         Return true if true.
        /// @notice Only one address can be approved at a time to a token.
        bool canSpendToken = (tokenApprovals[tokenId] == _address);
        /// @dev Evaluate and return logic.
        return (ownsToken || canSpendToken);
    }

    /**
    * @dev  Burns token `tokenId`.
    *       Decrements the total token balance of the burner.
    *       Increment the `totalBurned`.
    * 
    * @param _address   Address verfied to be in ownership or approved for the token.
    * @param tokenId    Token to be burnt.
    */
    function _burn(address _address, uint256 tokenId) private {
        /// @dev Send the tokeId to the DEAD address.
        tokens[tokenId] = DEAD;
        /// @dev Decrement the balance of the `_address` by 1.
        tokenBalances[_address] -= 1;
        /// @dev Increment the total tokens burnt by 1.
        tokensBurned += 1;
        /// @dev Remove the approved token owner.
        tokenApprovals[tokenId] = address(0);
        /// @dev Emit the {BaseBurn} event.
        emit BaseBurn(_address, DEAD);
    }

    /**
    * @dev  Transfers token `tokenId` from `from` to `to`.
    *       The token `tokenId` must be owned by the `from`.
    *       The receiving address must also be a valid address.
    *       From the factory, the `from` address passed will be the msg.sender.
    *       Emits the {Transfer} event.
    *       Subsequently, it decreases and increases the total tokens owned by
    *       `from` and `to` respectively.
    *
    * @param from       The owner of the token.
    * @param to         Receiver.
    * @param tokenId    Token owned.
    */
    function _transfer(
        address from, 
        address to, 
        uint256 tokenId
    ) private 
    {
        /// @dev    Prior checks have been made by the transfer function.
        ///         Transfer token.
        tokens[tokenId] = to;
        /// @dev Decrement the count of tokens owned by `from`.
        tokenBalances[from] -= 1;
        /// @dev Increment the count of tokens owned by `to`.
        tokenBalances[to] += 1;
        /// @dev Remove the approved token owner.
        tokenApprovals[tokenId] = address(0);
        /// @dev Emit the {Transfer} event.
        emit Transfer(
            from, 
            to, 
            tokenId
        );
    }

    /**
    * @dev  Approves `spender` by giving the address the right to spend
    *       token `tokenId`. The `tokenOwner` will be passed from the 
    *       Factory and must be the owner of `tokenId`.
    *
    * @param tokenOwner     Owner of the token.
    * @param spender        Spender to be approved.
    * @param tokenId        Token Id to be approved.
    */
    function _approve(
        address tokenOwner, 
        address spender, 
        uint256 tokenId
    ) private 
    {
        /// @dev    Sets a new spender for token tokenId.
        ///         In situations where the token already has a spender,
        ///         it replaces that spender.
        tokenApprovals[tokenId] = spender;
        /// @dev Emit the {Approval} event.
        emit Approval(
            tokenOwner, 
            spender, 
            tokenId
        );
    }
}

