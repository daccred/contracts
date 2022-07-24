// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721AURIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721ExtensionCore is ERC721AURIStorage, Ownable {
    uint256 public mintFee = 0;
    uint256 public maxSupply = 1000000;
    uint256 public devFee = 150; // 1.5%
    address public devWallet;

    constructor(string memory name, string memory symbol, address _devWallet) ERC721AURIStorage(name, symbol) {
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

    function burn(address tokenOwner, uint256 tokenId) public {
        require(tokenOwner != address(0), "Burn from zero address.");
        _burn(tokenId);
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
