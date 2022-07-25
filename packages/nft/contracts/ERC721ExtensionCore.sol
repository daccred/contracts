// SPDX-License-Identifier: GPL-3.0

// 	 _____     ______     ______     ______     ______     ______     _____
//  /\  __-.  /\  __ \   /\  ___\   /\  ___\   /\  == \   /\  ___\   /\  __-.
//  \ \ \/\ \ \ \  __ \  \ \ \____  \ \ \____  \ \  __<   \ \  __\   \ \ \/\ \
//   \ \____-  \ \_\ \_\  \ \_____\  \ \_____\  \ \_\ \_\  \ \_____\  \ \____-
//    \/____/   \/_/\/_/   \/_____/   \/_____/   \/_/ /_/   \/_____/   \/____/

pragma solidity ^0.8.4;

import "./ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721ExtensionCore is ERC721URIStorage, Ownable {
    uint256 public mintFee = 0;
    uint256 public maxSupply = 1000000;
    uint256 public devFee = 150; // 1.5%
    address public devWallet;

    constructor(string memory name, string memory symbol, address _devWallet) ERC721URIStorage(name, symbol) {
        require(_devWallet != address(0), "Invalid address.");
        devWallet = _devWallet;
    }

    function mint(address tokenReceiver, uint256 quantity) public payable {
        require(msg.value >= mintFee, "Insufficient mint fee.");
        require(totalSupply() + quantity <= maxSupply, "Max supply reached.");
        require(tokenReceiver != address(0), "Mint to zero address.");
        _safeMint(tokenReceiver, quantity);
        // transfer dev fee
        uint256 feeValue = msg.value * devFee / 10000;
        payable(devWallet).transfer(feeValue);
    }

    function updateMaxSupply(uint256 _maxSupply) external onlyOwner {
        require(_maxSupply > 0 && _maxSupply >= totalSupply(), "Invalid max supply");
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

    function withDraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
