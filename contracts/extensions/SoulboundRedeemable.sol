// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____    
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.  
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \ 
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____- 
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/ 

pragma solidity ^0.8.0;

import "./SoulboundWithSignature.sol";
import "./IsValidWithDate.sol";

/**
* @title Soulbound Redeemable.
* @author Daccred.
* @dev  An instance of the Soulbound token with capped supply
*       and tokens having their own individual expiry date.
*       Tokens are minted to and are pendng until receivers
*       pay to receive their complete token.
*/
contract SoulboundRedeemable is IsValidWithDate, SoulboundWithSignature {
    /// @dev Total sales of tokens [Total tokens paid for].
    uint256 private totalSales;
    /// @dev Total revenue from sales.
    uint256 private totalRevenue;
    /// @dev Price Limit [in eth] set by deploying contract.
    uint256 private priceLimit;
    /// @dev Price of individual tokens, set by deployer.
    uint256 private tokenPrice;
    /// @dev Pending token receivals.
    mapping(uint256 => bool) private pending;
    /// @dev Pending address to receive tokens.
    mapping(uint256 => address) private pendingReceivers;
    /// @dev    Tax for token redemptions.
    ///         15 represents 1.5% of total sales.
    uint256 private tax = 15;
    /// @dev ReEntrancy Lock.
    bool private locked; 

    /// @dev Emitted when a token is redeemed.
    event Redeemed(uint256 indexed tokenId, uint256 indexed extension);

    /// @dev    Deploy the SoulboundWithSignature with set
    ///         total supply, priceLimit and price of an individual token.
    constructor(
        string memory name, 
        string memory symbol,
        address _allowlistOwner,
        uint256 _totalSupply,
        uint256 _priceLimit,
        uint256 _tokenPrice
    )
    SoulboundWithSignature(
        name, 
        symbol, 
        _allowlistOwner, 
        _totalSupply
    )
    {
        /// @dev Ensure that limit is higher or equal to individual token price.
        require(_tokenPrice <= _priceLimit, "Price higher than limit.");
        /// @dev Set priceLimit.
        priceLimit = _priceLimit;
        /// @dev Set individual token price.
        tokenPrice = _tokenPrice;
    }

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
    * @dev Return the price of one token, set by the deployer.
    *
    * @notice Callable by anyone.
    *
    * @return _tokenPrice Price of a single token.
    */
    function getIndividualTokenPrice() public view returns(uint256 _tokenPrice) {
        _tokenPrice = tokenPrice;
    }

    /**
    * @dev Return the highest possible price for a token.
    *
    * @notice Callable by anyone.
    *
    * @return _priceLimit Highest possible price.
    */
    function getPriceLimit() public view returns(uint256 _priceLimit) {
        _priceLimit = priceLimit;
    }

    /**
    * @dev Allows `caller` to set `_price` as price of one token.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer]
    *           and the allowlistOwner.
    *
    * @param caller AllowlistOwner.
    * @param _price New price.
    */
    function setPrice(address caller, uint256 _price) 
    public 
    onlyOwner
    onlyAllowlistOwner(caller)
    {
        /// @dev Ensure that the price passed isn't more than the price limit.
        require(_price <= getPriceLimit(), "Price higher than limit.");
        /// @dev Set price.
        tokenPrice = _price;
    }

    /**
    * @dev  Mints a pending soulbound token to `to`.
    *       Pending tokens are minted and the receiver pays
    *       to receive and completely mint them.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer]
    *           and the allowlistOwner.
    *
    * @param from               Allowlist owner.
    * @param to                 Receiver.
    * @param tokenId            Id of token to be minted.
    * @param _tokenExpiryDate   Set expiry date from the deployer.
    */
    function mintPendingRedeemableToken(
        address from,
        address to,
        uint256 tokenId,
        uint256 _tokenExpiryDate
    ) public onlyOwner onlyAllowlistOwner(from)
    {
        /// @dev Ensure that the supply is not crossed.
        /// @dev    Should all soulbound tokens need to be limited,
        ///         copy this code and paste in Soulboundcore.sol
        ///         issueWithSignature function.
        require(supply < totalSupply, "Issue Cap Reached.");
        /// @dev Require `to` is not a zero address.
        require(to != address(0), "Mint to zero address.");
        /// @dev Require the token does not exist already.
        require(!_exists(tokenId), "Mint of already existing token.");
        /// @dev Require that the token is not on the pending list.
        require(!pending[tokenId], "Mint of already pending token.");
        /// @dev Set the token's pending state to true.
        pending[tokenId] = true;
        /// @dev Set the pending receiver of the token to `to`.
        pendingReceivers[tokenId] = to;
        /// @dev Set a new expiry date for the token.
        extendExpiry(tokenId, _tokenExpiryDate);
        /// @dev Increment supply.
        supply++;
    }

    /**
    * @dev  Allows the `_receiver` to pay the price of one token to 
    *       fully mint the pending token.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer].
    *
    * @param _receiver  Receiver of the token.
    * @param tokenId    Pending tokenId for the receiver.
    */
    function payToReceiveToken(address _receiver, uint256 tokenId)
    public
    payable
    onlyOwner
    nonReentrant
    {
        /// @dev Require that the receiver is not a zero address.
        require(_receiver != address(0), "Mint to zero address.");
        /// @dev Require that the token does not exist yet.
        require(!_exists(tokenId), "Mint of already existing token.");
        /// @dev Require that the token is indeed pending.
        require(pending[tokenId], "Already received token.");
        /// @dev    Require that the expected receiver of pending 
        ///         token is the `_receiver`.
        require(pendingReceivers[tokenId] == _receiver, "Not pending receiver.");
        /// @dev Require that the token has not expired already.
        require(isValid(tokenId), "Receival of expired token, redeem token.");
        /// @dev Require that the amount sent is GTE the price of one token.
        require(msg.value >= tokenPrice, "Price lower than token cost.");
        /// @dev Initialize balance.
        uint256 balance;
        
        /// @dev If the amount sent is bigger than the price of one token.
        if (msg.value > tokenPrice) {
            /// @dev Calculate the balance of the `_receiver`.
            balance = msg.value - tokenPrice;
            /// @dev Pay the `_receiver` his balance.
            payable(_receiver).transfer(balance);
        }

        /// @dev Generate tokenURI.
        string memory _tokenURI = generateTokenURI(tokenId);
        /// @dev Finally issue the token to the `_receiver`.
        issue(
            _receiver,
            tokenId,
            _tokenURI
        );
        /// @dev Increment totalSales.
        totalSales++;
        /// @dev Add to the total Revenue.
        totalRevenue += tokenPrice;
        /// @dev Set the pending token to false.
        pending[tokenId] = false;
        /// @dev Delete the pending receiver.
        delete pendingReceivers[tokenId];
    }

    /**
    * @dev  For expired pending tokens, this function redeems them and makes
    *       valid for another period of time.
    *       Tokens must be expired for it to be redeemed.
    *       Emits the {Redeemed} event.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer].
    *
    * @param _receiver          Receiver of the token.
    * @param tokenId            Pending tokenId for the receiver.
    * @param _tokenExpiryDate   New expiry date for tokens.
    */
    function redeemPendingToken(
        address _receiver, 
        uint256 tokenId,
        uint256 _tokenExpiryDate
    ) 
    public
    payable
    onlyOwner
    nonReentrant
    {
        /// @dev Require _receiver is not a zero address.
        require(_receiver != address(0), "Redemption to zero address.");
        /// @dev Require tokenId is existent.
        require(!_exists(tokenId), "Redemption of existing token.");
        /// @dev Require that the token is still pending.
        require(pending[tokenId], "Already received token.");
        /// @dev Require that the pending receiver is the `_receiver`.
        require(pendingReceivers[tokenId] == _receiver, "Not pending receiver.");
        /// @dev Require the token has expired.
        require(!isValid(tokenId), "Token unexpired.");
        /// @dev Calculate tax.
        uint256 _tax = calculateTax(tax);
        /// @dev Require that the amount sent is GTE the tax.
        require(msg.value >= _tax, "Price lower than redemption tax.");
        /// @dev Initiate balance.
        uint256 balance;

        /// @dev If the tax is not 0.
        if (_tax != 0) {
            /// @dev Calculate receiver's balance.
            balance = msg.value - _tax;
            /// @dev Pay to receiver.
            payable(_receiver).transfer(balance);
        }

        /// @dev Extend expiry of tokenId.
        extendExpiry(tokenId, _tokenExpiryDate);
        /// @dev Emit the Redeemed event.
        emit Redeemed(tokenId, _tokenExpiryDate);
    }

    /**
    * @dev  For expired minted tokens, this function redeems them and makes
    *       valid for another period of time.
    *       Tokens must be expired for it to be redeemed.
    *       Emits the {Redeemed} event.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer].
    *
    * @param _receiver          Receiver of the token.
    * @param tokenId            Pending tokenId for the receiver.
    * @param _tokenExpiryDate   New expiry date for tokens.
    */
    function redeemMintedToken(
        address _receiver, 
        uint256 tokenId,
        uint256 _tokenExpiryDate
    ) 
    public
    payable
    onlyOwner
    nonReentrant
    {
        /// @dev Require _receiver is not a zero address.
        require(_receiver != address(0), "Redemption to zero address.");
        /// @dev Require tokenId is existent.
        require(_exists(tokenId), "Redemption of non-existing token.");
        /// @dev Require that the token is still pending.
        require(!pending[tokenId], "Token still pending.");
        /// @dev Require that the pending receiver is the `_receiver`.
        require(ownerOf(tokenId) == _receiver, "Not token owner.");
        /// @dev Require the token has expired.
        require(!isValid(tokenId), "Token unexpired.");
        /// @dev Calculate tax.
        uint256 _tax = calculateTax(tax);
        /// @dev Require that the amount sent is GTE the tax.
        require(msg.value >= _tax, "Price lower than redemption tax.");
        /// @dev Initiate balance.
        uint256 balance;

        /// @dev If the tax is not 0.
        if (_tax != 0) {
            /// @dev Calculate receiver's balance.
            balance = msg.value - _tax;
            /// @dev Pay to receiver.
            payable(_receiver).transfer(balance);
        }

        /// @dev Extend expiry of tokenId.
        extendExpiry(tokenId, _tokenExpiryDate);
        /// @dev Emit the Redeemed event.
        emit Redeemed(tokenId, _tokenExpiryDate);
    }

    /**
    * @dev  Allows the allowlistOwner to redeem an expired pending 
    *       token on behalf of the tokenOwner.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer]
    *           and the allowlistOwner.
    *
    * @param _caller            Allowlist owner.
    * @param _receiver          Address of receiver.
    * @param tokenId            TokenId.
    * @param _tokenExpiryDate   Days to extend the token.
    * @param hash               Hash of message.
    * @param sig                Signature.
    */
    function redeemPendingTokenWithSignature(
        address _caller,
        address _receiver, 
        uint256 tokenId,
        uint256 _tokenExpiryDate,
        bytes32 hash,
        bytes memory sig
    )
    public
    payable
    onlyOwner
    onlyAllowlistOwner(_caller)
    nonReentrant
    {
        /// @dev Require that the signer is the allowlistowner.
        require(verifySignature(hash, sig), "Hash not signed by you.");
        /// @dev RedeemToken.
        redeemPendingToken(
            _receiver,
            tokenId,
            _tokenExpiryDate
        );
    }

    /**
    * @dev  Allows the allowlistOwner to redeem an expired minted 
    *       token on behalf of the tokenOwner.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer]
    *           and the allowlistOwner.
    *
    * @param _caller            Allowlist owner.
    * @param _receiver          Address of receiver.
    * @param tokenId            TokenId.
    * @param _tokenExpiryDate   Days to extend the token.
    * @param hash               Hash of message.
    * @param sig                Signature.
    */
    function redeemMintedTokenWithSignature(
        address _caller,
        address _receiver, 
        uint256 tokenId,
        uint256 _tokenExpiryDate,
        bytes32 hash,
        bytes memory sig
    )
    public
    payable
    onlyOwner
    onlyAllowlistOwner(_caller)
    nonReentrant
    {
        /// @dev Require that the signer is the allowlistowner.
        require(verifySignature(hash, sig), "Hash not signed by you.");
        /// @dev RedeemToken.
        redeemMintedToken(
            _receiver,
            tokenId,
            _tokenExpiryDate
        );
    }

    /**
    * @dev  Allows the allowlistowner to withdraw his funds to his wallet.
    *
    * @notice   Callable by the deployer of this contract [DaccredDeployer]
    *           and the allowlistOwner.
    *
    * @param _caller Address of allowlistowner.
    */
    function withdraw(address _caller)
    public
    onlyOwner
    onlyAllowlistOwner(_caller)
    {
        /// @dev Require that the allowlistowner is not a zero address.
        require(_caller != address(0), "Sending to zero address.");
        /// @dev Require that the balance of this contract is GTE the totalRevenue.
        require(address(this).balance >= totalRevenue, "Revenue != Contract balance.");
        /// @dev Pay the totalRevenue to the allowlistowner.
        payable(_caller).transfer(totalRevenue);
        /// @dev Set the totalRevenue to 0.
        totalRevenue = 0;
    }

    /**
    * @dev Calculates the tax off the totalSales.
    *
    * @param _tax Percentage tax.
    *
    * @return __tax Tax calculated.
    */
    function calculateTax(uint256 _tax) private view returns(uint256 __tax) {
        /// Grant free tax if the total revenue of the contract is
        /// in range of 0 - 500 gwei.
        if (totalRevenue >= 0 && totalRevenue < 500 gwei) {
            /// @dev Set tax to 0.
            _tax = 0;
        }

        /// Else simply calculate tax on total revenue.
        __tax = (_tax * totalRevenue * 10) / 1000;
    }
}
