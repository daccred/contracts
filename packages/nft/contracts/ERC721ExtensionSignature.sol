// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721ExtensionSignature is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxSupply = 1000000;
    uint256 public currentSupply = 0;
    uint256 public mintFee = 0;
    uint256 public cappedSupply;
    uint256 public devFee = 150; // 1.5%
    address public devWallet;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cappedSupply,
        address _devWallet
    ) ERC721(_name, _symbol) {
        require(_cappedSupply > 0, "Invalid max supply");
        cappedSupply = _cappedSupply;
        require(_devWallet != address(0), "Invalid address.");
        devWallet = _devWallet;
    }

    function updateMaxSupply(uint256 _maxSupply) external onlyOwner {
        require(_maxSupply > 0 && _maxSupply >= currentSupply, "Invalid max supply");
        maxSupply = _maxSupply;
    }

    function updateMintFee(uint256 _mintFee) external onlyOwner {
        mintFee = _mintFee;
    }

    function updateDevWallet(address _devWallet) external onlyOwner {
        require(_devWallet != address(0), "Invalid address");
        devWallet = _devWallet;
    }

    function updateDevFee(uint256 _devFee) external onlyOwner {
        require(_devFee < 10000, "Invalid value");
        devFee = _devFee;
    }

    function mint(string memory tokenURI) external payable {
        require(msg.value >= mintFee, "Insufficient mint fee.");
        mintTo(tokenURI, msg.sender);
        // transfer dev fee
        uint256 feeValue = msg.value * devFee / 10000;
        payable(devWallet).transfer(feeValue);
    }

    function mintTo(string memory tokenURI, address recipient) internal returns (uint256) {
        require(balanceOf(recipient) < cappedSupply, "You can't mint anymore.");
        require(currentSupply < maxSupply, "Max supply reached");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        currentSupply++;

        return newItemId;
    }

    function mintWithSignature(
        address addr,
        bytes32 hash,
        bytes memory sig,
        string memory tokenURI
    ) external onlyOwner {
        /// @dev Require that the address is not a zero address.
        require(addr != address(0), "Mint to zero address.");
        /// @dev    Require that the hash is actually 32 [64 characters]
        ///         in length.
        require(hash.length == 32, "Invalid hash.");
        /// @dev Require the length of the signature is 65.
        require(sig.length == 65, "Invalid signature length");
        /// @dev    Verifies that the address was actually signed by the
        ///         allowlistOwner.
        require(verifySigner(owner(), hash, sig), "Hash not signed by owner.");

        mintTo(tokenURI, addr);
    }

    function verifySigner(
        address _signer,
        bytes32 _hash,
        bytes memory _signature
    ) internal pure returns (bool) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return (_signer == ecrecover(_hash, v, r, s));
    }

    function splitSignature(bytes memory sig)
        private
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        assembly {
            /**
             * @dev  Copied from https://solidity-by-example.org/signature.
             *       First 32 bytes stores the length of the signature
             *       add(sig, 32) = pointer of sig + 32
             *       effectively, skips first 32 bytes of signature
             *       mload(p) loads next 32 bytes starting at the memory
             *       address p into memory.
             */

            /// @dev First 32 bytes, after the length prefix.
            r := mload(add(sig, 32))
            /// @dev Second 32 bytes.
            s := mload(add(sig, 64))
            /// @dev Final byte (first byte of the next 32 bytes).
            v := byte(0, mload(add(sig, 96)))
        }
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
