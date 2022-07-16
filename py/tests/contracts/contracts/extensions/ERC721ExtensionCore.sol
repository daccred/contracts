pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";

contract ERC721ExtensionCore is ERC721A{
    constructor(string memory name, string memory symbol) ERC721A(name, symbol) {}
}