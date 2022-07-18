// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721ExtensionCore is ERC721A, Ownable{
    uint256 public mintFee = 0;
    uint256 public maxSupply = 1000000;

    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}

    function mint(address tokenReceiver, uint256 quantity) public payable{
        require(msg.value >= mintFee, "Insufficient mint fee.");
        require(totalSupply() + quantity <= maxSupply, "Max supply reached.");
        require(tokenReceiver != address(0), "Mint to zero address.");
        _safeMint(tokenReceiver, quantity);
    }

    function burn(address tokenOwner, uint256 tokenId) public {
        require(tokenOwner != address(0), "Burn from zero address.");
        _burn(tokenId);
    }

    function updateMaxSupply(uint256 _maxSupply) external onlyOwner{
        require(_maxSupply > 0 && _maxSupply >= totalSupply(), "Invalid max supply");
        maxSupply = _maxSupply;
    }

    function updateMintFee(uint256 _mintFee) external onlyOwner{
        mintFee = _mintFee;
    }

    function withDraw() external onlyOwner{
        payable(owner()).transfer(address(this).balance);
    }
}