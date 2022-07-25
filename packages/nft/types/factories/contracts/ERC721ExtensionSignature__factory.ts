/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ERC721ExtensionSignature,
  ERC721ExtensionSignatureInterface,
} from "../../contracts/ERC721ExtensionSignature";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_cappedSupply",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_devWallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cappedSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "devFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "devWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "sig",
        type: "bytes",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintWithSignature",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_devFee",
        type: "uint256",
      },
    ],
    name: "updateDevFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_devWallet",
        type: "address",
      },
    ],
    name: "updateDevWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxSupply",
        type: "uint256",
      },
    ],
    name: "updateMaxSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintFee",
        type: "uint256",
      },
    ],
    name: "updateMintFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052620f42406009556000600a556000600b556096600d553480156200002757600080fd5b50604051620022e4380380620022e48339810160408190526200004a9162000324565b83518490849062000063906000906020850190620001b1565b50805162000079906001906020840190620001b1565b50505062000096620000906200015b60201b60201c565b6200015f565b60008211620000e15760405162461bcd60e51b8152602060048201526012602482015271496e76616c6964206d617820737570706c7960701b60448201526064015b60405180910390fd5b600c8290556001600160a01b038116620001315760405162461bcd60e51b815260206004820152601060248201526f24b73b30b634b21030b2323932b9b99760811b6044820152606401620000d8565b600e80546001600160a01b0319166001600160a01b039290921691909117905550620003f6915050565b3390565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620001bf90620003b9565b90600052602060002090601f016020900481019282620001e357600085556200022e565b82601f10620001fe57805160ff19168380011785556200022e565b828001600101855582156200022e579182015b828111156200022e57825182559160200191906001019062000211565b506200023c92915062000240565b5090565b5b808211156200023c576000815560010162000241565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200027f57600080fd5b81516001600160401b03808211156200029c576200029c62000257565b604051601f8301601f19908116603f01168101908282118183101715620002c757620002c762000257565b81604052838152602092508683858801011115620002e457600080fd5b600091505b83821015620003085785820183015181830184015290820190620002e9565b838211156200031a5760008385830101525b9695505050505050565b600080600080608085870312156200033b57600080fd5b84516001600160401b03808211156200035357600080fd5b62000361888389016200026d565b955060208701519150808211156200037857600080fd5b5062000387878288016200026d565b60408701516060880151919550935090506001600160a01b0381168114620003ae57600080fd5b939692955090935050565b600181811c90821680620003ce57607f821691505b60208210811415620003f057634e487b7160e01b600052602260045260246000fd5b50919050565b611ede80620004066000396000f3fe6080604052600436106101c25760003560e01c8063771282f6116100f7578063b88d4fde11610095578063e985e9c511610064578063e985e9c5146104c4578063f103b4331461050d578063f2fde38b1461052d578063ff0350e21461054d57600080fd5b8063b88d4fde1461045b578063c87b56dd1461047b578063d5abeb011461049b578063d85d3d27146104b157600080fd5b80638ea5220f116100d15780638ea5220f146103e657806395d89b411461040657806399729ec11461041b578063a22cb4651461043b57600080fd5b8063771282f61461039257806384017e52146103a85780638da5cb5b146103c857600080fd5b80633ccfd60b116101645780636827e7641161013e5780636827e764146103315780636de23a161461034757806370a082311461035d578063715018a61461037d57600080fd5b80633ccfd60b146102dc57806342842e0e146102f15780636352211e1461031157600080fd5b8063095ea7b3116101a0578063095ea7b31461025657806313966db5146102785780631816467f1461029c57806323b872dd146102bc57600080fd5b806301ffc9a7146101c757806306fdde03146101fc578063081812fc1461021e575b600080fd5b3480156101d357600080fd5b506101e76101e2366004611912565b61056d565b60405190151581526020015b60405180910390f35b34801561020857600080fd5b506102116105bf565b6040516101f39190611987565b34801561022a57600080fd5b5061023e61023936600461199a565b610651565b6040516001600160a01b0390911681526020016101f3565b34801561026257600080fd5b506102766102713660046119cf565b610678565b005b34801561028457600080fd5b5061028e600b5481565b6040519081526020016101f3565b3480156102a857600080fd5b506102766102b73660046119f9565b610793565b3480156102c857600080fd5b506102766102d7366004611a14565b610805565b3480156102e857600080fd5b50610276610836565b3480156102fd57600080fd5b5061027661030c366004611a14565b61087a565b34801561031d57600080fd5b5061023e61032c36600461199a565b610895565b34801561033d57600080fd5b5061028e600d5481565b34801561035357600080fd5b5061028e600c5481565b34801561036957600080fd5b5061028e6103783660046119f9565b6108f5565b34801561038957600080fd5b5061027661097b565b34801561039e57600080fd5b5061028e600a5481565b3480156103b457600080fd5b506102766103c336600461199a565b61098f565b3480156103d457600080fd5b506007546001600160a01b031661023e565b3480156103f257600080fd5b50600e5461023e906001600160a01b031681565b34801561041257600080fd5b5061021161099c565b34801561042757600080fd5b5061027661043636600461199a565b6109ab565b34801561044757600080fd5b50610276610456366004611a50565b6109f9565b34801561046757600080fd5b50610276610476366004611b2f565b610a08565b34801561048757600080fd5b5061021161049636600461199a565b610a40565b3480156104a757600080fd5b5061028e60095481565b6102766104bf366004611b97565b610b51565b3480156104d057600080fd5b506101e76104df366004611bcc565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b34801561051957600080fd5b5061027661052836600461199a565b610bff565b34801561053957600080fd5b506102766105483660046119f9565b610c5f565b34801561055957600080fd5b50610276610568366004611bff565b610cd5565b60006001600160e01b031982166380ac58cd60e01b148061059e57506001600160e01b03198216635b5e139f60e01b145b806105b957506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546105ce90611c71565b80601f01602080910402602001604051908101604052809291908181526020018280546105fa90611c71565b80156106475780601f1061061c57610100808354040283529160200191610647565b820191906000526020600020905b81548152906001019060200180831161062a57829003601f168201915b5050505050905090565b600061065c82610df5565b506000908152600460205260409020546001600160a01b031690565b600061068382610895565b9050806001600160a01b0316836001600160a01b031614156106f65760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b0382161480610712575061071281336104df565b6107845760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016106ed565b61078e8383610e54565b505050565b61079b610ec2565b6001600160a01b0381166107e35760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b60448201526064016106ed565b600e80546001600160a01b0319166001600160a01b0392909216919091179055565b61080f3382610f1c565b61082b5760405162461bcd60e51b81526004016106ed90611cac565b61078e838383610f9a565b61083e610ec2565b6007546040516001600160a01b03909116904780156108fc02916000818181858888f19350505050158015610877573d6000803e3d6000fd5b50565b61078e83838360405180602001604052806000815250610a08565b6000818152600260205260408120546001600160a01b0316806105b95760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016106ed565b60006001600160a01b03821661095f5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016106ed565b506001600160a01b031660009081526003602052604090205490565b610983610ec2565b61098d6000611136565b565b610997610ec2565b600b55565b6060600180546105ce90611c71565b6109b3610ec2565b61271081106109f45760405162461bcd60e51b815260206004820152600d60248201526c496e76616c69642076616c756560981b60448201526064016106ed565b600d55565b610a04338383611188565b5050565b610a123383610f1c565b610a2e5760405162461bcd60e51b81526004016106ed90611cac565b610a3a84848484611257565b50505050565b6060610a4b82610df5565b60008281526006602052604081208054610a6490611c71565b80601f0160208091040260200160405190810160405280929190818152602001828054610a9090611c71565b8015610add5780601f10610ab257610100808354040283529160200191610add565b820191906000526020600020905b815481529060010190602001808311610ac057829003601f168201915b505050505090506000610afb60408051602081019091526000815290565b9050805160001415610b0e575092915050565b815115610b40578082604051602001610b28929190611cfa565b60405160208183030381529060405292505050919050565b610b498461128a565b949350505050565b600b54341015610b9c5760405162461bcd60e51b815260206004820152601660248201527524b739bab33334b1b4b2b73a1036b4b73a103332b29760511b60448201526064016106ed565b610ba681336112fe565b506000612710600d5434610bba9190611d3f565b610bc49190611d74565b600e546040519192506001600160a01b03169082156108fc029083906000818181858888f1935050505015801561078e573d6000803e3d6000fd5b610c07610ec2565b600081118015610c195750600a548110155b610c5a5760405162461bcd60e51b8152602060048201526012602482015271496e76616c6964206d617820737570706c7960701b60448201526064016106ed565b600955565b610c67610ec2565b6001600160a01b038116610ccc5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016106ed565b61087781611136565b610cdd610ec2565b6001600160a01b038416610d2b5760405162461bcd60e51b815260206004820152601560248201527426b4b73a103a37903d32b9379030b2323932b9b99760591b60448201526064016106ed565b8151604114610d7c5760405162461bcd60e51b815260206004820152601860248201527f496e76616c6964207369676e6174757265206c656e677468000000000000000060448201526064016106ed565b610d98610d916007546001600160a01b031690565b84846113ed565b610de45760405162461bcd60e51b815260206004820152601960248201527f48617368206e6f74207369676e6564206279206f776e65722e0000000000000060448201526064016106ed565b610dee81856112fe565b5050505050565b6000818152600260205260409020546001600160a01b03166108775760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016106ed565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610e8982610895565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6007546001600160a01b0316331461098d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016106ed565b600080610f2883610895565b9050806001600160a01b0316846001600160a01b03161480610f6f57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b80610b495750836001600160a01b0316610f8884610651565b6001600160a01b031614949350505050565b826001600160a01b0316610fad82610895565b6001600160a01b0316146110115760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016106ed565b6001600160a01b0382166110735760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016106ed565b61107e600082610e54565b6001600160a01b03831660009081526003602052604081208054600192906110a7908490611d88565b90915550506001600160a01b03821660009081526003602052604081208054600192906110d5908490611d9f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b031614156111ea5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016106ed565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611262848484610f9a565b61126e84848484611481565b610a3a5760405162461bcd60e51b81526004016106ed90611db7565b606061129582610df5565b60006112ac60408051602081019091526000815290565b905060008151116112cc57604051806020016040528060008152506112f7565b806112d68461158e565b6040516020016112e7929190611cfa565b6040516020818303038152906040525b9392505050565b6000600c5461130c836108f5565b106113595760405162461bcd60e51b815260206004820152601760248201527f596f752063616e2774206d696e7420616e796d6f72652e00000000000000000060448201526064016106ed565b600954600a54106113a15760405162461bcd60e51b815260206004820152601260248201527113585e081cdd5c1c1b1e481c995858da195960721b60448201526064016106ed565b6113af600880546001019055565b60006113ba60085490565b90506113c6838261168c565b6113d081856117ce565b600a80549060006113e083611e09565b9091555090949350505050565b602081810151604080840151606080860151835160008082528188018087528a905291821a81860181905292810186905260808101849052935190959293919260019260a080820193601f1981019281900390910190855afa158015611457573d6000803e3d6000fd5b505050602060405103516001600160a01b0316876001600160a01b03161493505050509392505050565b60006001600160a01b0384163b1561158357604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906114c5903390899088908890600401611e24565b602060405180830381600087803b1580156114df57600080fd5b505af192505050801561150f575060408051601f3d908101601f1916820190925261150c91810190611e61565b60015b611569573d80801561153d576040519150601f19603f3d011682016040523d82523d6000602084013e611542565b606091505b5080516115615760405162461bcd60e51b81526004016106ed90611db7565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610b49565b506001949350505050565b6060816115b25750506040805180820190915260018152600360fc1b602082015290565b8160005b81156115dc57806115c681611e09565b91506115d59050600a83611d74565b91506115b6565b60008167ffffffffffffffff8111156115f7576115f7611a8c565b6040519080825280601f01601f191660200182016040528015611621576020820181803683370190505b5090505b8415610b4957611636600183611d88565b9150611643600a86611e7e565b61164e906030611d9f565b60f81b81838151811061166357611663611e92565b60200101906001600160f81b031916908160001a905350611685600a86611d74565b9450611625565b6001600160a01b0382166116e25760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016106ed565b6000818152600260205260409020546001600160a01b0316156117475760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016106ed565b6001600160a01b0382166000908152600360205260408120805460019290611770908490611d9f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b03166118495760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016106ed565b6000828152600660209081526040909120825161078e9284019082805461186f90611c71565b90600052602060002090601f01602090048101928261189157600085556118d7565b82601f106118aa57805160ff19168380011785556118d7565b828001600101855582156118d7579182015b828111156118d75782518255916020019190600101906118bc565b506118e39291506118e7565b5090565b5b808211156118e357600081556001016118e8565b6001600160e01b03198116811461087757600080fd5b60006020828403121561192457600080fd5b81356112f7816118fc565b60005b8381101561194a578181015183820152602001611932565b83811115610a3a5750506000910152565b6000815180845261197381602086016020860161192f565b601f01601f19169290920160200192915050565b6020815260006112f7602083018461195b565b6000602082840312156119ac57600080fd5b5035919050565b80356001600160a01b03811681146119ca57600080fd5b919050565b600080604083850312156119e257600080fd5b6119eb836119b3565b946020939093013593505050565b600060208284031215611a0b57600080fd5b6112f7826119b3565b600080600060608486031215611a2957600080fd5b611a32846119b3565b9250611a40602085016119b3565b9150604084013590509250925092565b60008060408385031215611a6357600080fd5b611a6c836119b3565b915060208301358015158114611a8157600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611ab357600080fd5b813567ffffffffffffffff80821115611ace57611ace611a8c565b604051601f8301601f19908116603f01168101908282118183101715611af657611af6611a8c565b81604052838152866020858801011115611b0f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060808587031215611b4557600080fd5b611b4e856119b3565b9350611b5c602086016119b3565b925060408501359150606085013567ffffffffffffffff811115611b7f57600080fd5b611b8b87828801611aa2565b91505092959194509250565b600060208284031215611ba957600080fd5b813567ffffffffffffffff811115611bc057600080fd5b610b4984828501611aa2565b60008060408385031215611bdf57600080fd5b611be8836119b3565b9150611bf6602084016119b3565b90509250929050565b60008060008060808587031215611c1557600080fd5b611c1e856119b3565b935060208501359250604085013567ffffffffffffffff80821115611c4257600080fd5b611c4e88838901611aa2565b93506060870135915080821115611c6457600080fd5b50611b8b87828801611aa2565b600181811c90821680611c8557607f821691505b60208210811415611ca657634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b60008351611d0c81846020880161192f565b835190830190611d2081836020880161192f565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615611d5957611d59611d29565b500290565b634e487b7160e01b600052601260045260246000fd5b600082611d8357611d83611d5e565b500490565b600082821015611d9a57611d9a611d29565b500390565b60008219821115611db257611db2611d29565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000600019821415611e1d57611e1d611d29565b5060010190565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611e579083018461195b565b9695505050505050565b600060208284031215611e7357600080fd5b81516112f7816118fc565b600082611e8d57611e8d611d5e565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220b0ac8cc006b76d3e605931e07e5b461f87704b5e7878dfd23b5234daec0ebcbd64736f6c63430008090033";

type ERC721ExtensionSignatureConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ExtensionSignatureConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721ExtensionSignature__factory extends ContractFactory {
  constructor(...args: ERC721ExtensionSignatureConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _cappedSupply: PromiseOrValue<BigNumberish>,
    _devWallet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721ExtensionSignature> {
    return super.deploy(
      _name,
      _symbol,
      _cappedSupply,
      _devWallet,
      overrides || {}
    ) as Promise<ERC721ExtensionSignature>;
  }
  override getDeployTransaction(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _cappedSupply: PromiseOrValue<BigNumberish>,
    _devWallet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _name,
      _symbol,
      _cappedSupply,
      _devWallet,
      overrides || {}
    );
  }
  override attach(address: string): ERC721ExtensionSignature {
    return super.attach(address) as ERC721ExtensionSignature;
  }
  override connect(signer: Signer): ERC721ExtensionSignature__factory {
    return super.connect(signer) as ERC721ExtensionSignature__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721ExtensionSignatureInterface {
    return new utils.Interface(_abi) as ERC721ExtensionSignatureInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721ExtensionSignature {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC721ExtensionSignature;
  }
}
