// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721ExtensionCore.sol";
import "./Guard.sol";

contract ERC721ExtensionSignature is Guarded, ERC721ExtensionCore, Ownable {
    /* ---------------------------- */
    /*   DEPLOYER CONFIGURATIONS   */
    /* -------------------------- */

    /* max supply is the max number of token IDs that can be minted in this contract */
    uint256 public maxSupply;

    /* Capped supply is a limitation on the number of tokens a user can mint */
    uint256 public cappedSupply;

    /* if the deployers require users to pay to mint, they charge a tarriff */
    uint256 public redemptionTariff = 0;

    /* ----------------------- */
    /* DACCRED CONFIGURATIONS */
    /* --------------------- */
    uint256 immutable COMMISSIONS = 150; // 1.5% // !important set correct dev wallet before launch
    address immutable COMMISSIONER = address(0); // !important set correct dev wallet before launch

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        uint256 _cappedSupply,
        uint256 _redemptionTariff
    ) ERC721ExtensionCore(_name, _symbol) {
        require(_maxSupply > 0, "[Ext721Sig]: NaN");
        require(_cappedSupply > 0, "[Ext721Sig]: NaN");
        require(_redemptionTariff > 0, "[Ext721Sig]: NaN");

        /* setup internal variables */
        redemptionTariff = _redemptionTariff;
        cappedSupply = _cappedSupply;
        maxSupply = _maxSupply;
    }

    function updateMaxSupply(uint256 _maxSupply) external onlyOwner {
        require(_maxSupply > 0 && _maxSupply >= totalSupply(), "Invalid max supply");
        maxSupply = _maxSupply;
    }

    function modifyTariff(uint256 _newTariff) external onlyOwner {
        redemptionTariff = _newTariff;
    }

    /// @dev Override the ERC721ExtensionCore.mint function to handle payable mints.
    /// @dev requires the caller to pay the redemptionTariff.

    function mint(string memory _tokenURI) external payable override guarded returns (uint256) {
        /// @dev ensure this transaction is funded
        require(msg.value >= redemptionTariff, "[ExtSig:mint]:No funds");

        /// @dev hook to run before minting
        _beforeTokenMint(msg.sender);

        /// @dev we do not regard the principle of quantity,
        /// @dev    everyone mints only one token
        _mint(msg.sender, 1);

        uint256 newTokenId = _currentIndex;

        /// @dev we can now set the tokenURI of the token we just minted
        _setTokenURI(newTokenId, _tokenURI);

        /// @dev we calculate the commissions for admin
        uint256 commission = (msg.value * COMMISSIONS) / 10000;

        /// @dev we send the commission to the commissioner
        payable(COMMISSIONER).transfer(commission);

        return newTokenId;
    }

    function _beforeTokenMint(address recipient) internal view {
        require(balanceOf(recipient) < cappedSupply, "You can't mint anymore.");
        require(totalSupply() < maxSupply, "Max supply reached");
    }

    function mintWithSignature(
        address addr,
        bytes32 hash,
        bytes memory sig,
        string memory _tokenURI
    ) external guarded onlyOwner {
        /// @dev Require that the address is not a zero address.
        require(addr != address(0), "Mint to zero address.");
        /// @dev    Require that the hash is actually 32 [64 characters]
        ///         in length.
        require(hash.length == 32, "Invalid hash.");
        /// @dev Require the length of the signature is 65.
        require(sig.length == 65, "Invalid signature length");
        /// @dev    Verifies that the address was actually signed by the
        ///         allowlistOwner.
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, hash));
        require(verifySigner(owner(), prefixedHashMessage, sig), "Hash not signed by owner.");

        /// @dev hook to run before minting
        _beforeTokenMint(msg.sender);

        /// @dev we do not regard the principle of quantity,
        /// @dev    everyone mints only one token
        _mint(msg.sender, 1);

        uint256 newTokenId = _currentIndex;

        /// @dev we can now set the tokenURI of the token we just minted
        _setTokenURI(newTokenId, _tokenURI);
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
