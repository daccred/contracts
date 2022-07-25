/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ERC721AMock,
  ERC721AMockInterface,
} from "../../../contracts/mocks/ERC721AMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalToCurrentOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ApproveToCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
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
    name: "baseURI",
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
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approvalCheck",
        type: "bool",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "exists",
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
    ],
    name: "getAux",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "mint",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "numberMinted",
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
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "safeMint",
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
        name: "_data",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "aux",
        type: "uint64",
      },
    ],
    name: "setAux",
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
    inputs: [],
    name: "totalMinted",
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
    name: "totalSupply",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001a2038038062001a208339810160408190526200003491620001e6565b8151829082906200004d90600290602085019062000073565b5080516200006390600390602084019062000073565b5060008055506200028d92505050565b828054620000819062000250565b90600052602060002090601f016020900481019282620000a55760008555620000f0565b82601f10620000c057805160ff1916838001178555620000f0565b82800160010185558215620000f0579182015b82811115620000f0578251825591602001919060010190620000d3565b50620000fe92915062000102565b5090565b5b80821115620000fe576000815560010162000103565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014157600080fd5b81516001600160401b03808211156200015e576200015e62000119565b604051601f8301601f19908116603f0116810190828211818310171562000189576200018962000119565b81604052838152602092508683858801011115620001a657600080fd5b600091505b83821015620001ca5785820183015181830184015290820190620001ab565b83821115620001dc5760008385830101525b9695505050505050565b60008060408385031215620001fa57600080fd5b82516001600160401b03808211156200021257600080fd5b62000220868387016200012f565b935060208501519150808211156200023757600080fd5b5062000246858286016200012f565b9150509250929050565b600181811c908216806200026557607f821691505b602082108114156200028757634e487b7160e01b600052602260045260246000fd5b50919050565b611783806200029d6000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80636c0360eb116100de578063a22cb46511610097578063bf0b175e11610071578063bf0b175e1461034f578063c87b56dd1461037a578063dc33e6811461038d578063e985e9c5146103a057600080fd5b8063a22cb46514610321578063a2309ff814610334578063b88d4fde1461033c57600080fd5b80636c0360eb146102c557806370a08231146102cd5780638832e6e3146102e057806395d89b41146102f35780639fac68cb146102fb578063a14481941461030e57600080fd5b806340c10f191161013057806340c10f191461021e57806342842e0e1461023157806342966c6814610244578063453ab141146102575780634f558e791461029f5780636352211e146102b257600080fd5b806301ffc9a71461017857806306fdde03146101a0578063081812fc146101b5578063095ea7b3146101e057806318160ddd146101f557806323b872dd1461020b575b600080fd5b61018b610186366004611245565b6103dc565b60405190151581526020015b60405180910390f35b6101a861042e565b60405161019791906112ba565b6101c86101c33660046112cd565b6104c0565b6040516001600160a01b039091168152602001610197565b6101f36101ee366004611302565b610504565b005b600154600054035b604051908152602001610197565b6101f361021936600461132c565b61058b565b6101f361022c366004611302565b610596565b6101f361023f36600461132c565b6105a4565b6101f36102523660046112cd565b6105bf565b6101f3610265366004611368565b6001600160a01b038216600090815260056020526040902080546001600160c01b0316600160c01b6001600160401b038416021790555050565b61018b6102ad3660046112cd565b6105cd565b6101c86102c03660046112cd565b6105d8565b6101a86105ea565b6101fd6102db3660046113ab565b610606565b6101f36102ee366004611468565b610654565b6101a861065f565b6101f36103093660046114ce565b61066e565b6101f361031c366004611302565b610678565b6101f361032f3660046114fa565b610682565b6000546101fd565b6101f361034a366004611524565b610718565b61036261035d3660046113ab565b610762565b6040516001600160401b039091168152602001610197565b6101a86103883660046112cd565b610790565b6101fd61039b3660046113ab565b610822565b61018b6103ae36600461158b565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061040d57506001600160e01b03198216635b5e139f60e01b145b8061042857506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606002805461043d906115b5565b80601f0160208091040260200160405190810160405280929190818152602001828054610469906115b5565b80156104b65780601f1061048b576101008083540402835291602001916104b6565b820191906000526020600020905b81548152906001019060200180831161049957829003601f168201915b5050505050905090565b60006104cb82610850565b6104e8576040516333d1c03960e21b815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061050f826105d8565b9050806001600160a01b0316836001600160a01b031614156105445760405163250fdee360e21b815260040160405180910390fd5b336001600160a01b0382161461057b5761055e81336103ae565b61057b576040516367d9dca160e11b815260040160405180910390fd5b61058683838361087b565b505050565b6105868383836108d7565b6105a08282610ab2565b5050565b61058683838360405180602001604052806000815250610718565b6105ca816001610bc1565b50565b600061042882610850565b60006105e382610d74565b5192915050565b606061060160408051602081019091526000815290565b905090565b60006001600160a01b03821661062f576040516323d3ad8160e21b815260040160405180910390fd5b506001600160a01b03166000908152600560205260409020546001600160401b031690565b610586838383610e8e565b60606003805461043d906115b5565b6105a08282610bc1565b6105a08282611020565b6001600160a01b0382163314156106ac5760405163b06307db60e01b815260040160405180910390fd5b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6107238484846108d7565b6001600160a01b0383163b1561075c5761073f8484848461103a565b61075c576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b6001600160a01b038116600090815260056020526040812054600160c01b90046001600160401b0316610428565b606061079b82610850565b6107b857604051630a14c4b560e41b815260040160405180910390fd5b60006107cf60408051602081019091526000815290565b90508051600014156107f0576040518060200160405280600081525061081b565b806107fa84611132565b60405160200161080b9291906115f0565b6040516020818303038152906040525b9392505050565b6001600160a01b038116600090815260056020526040812054600160401b90046001600160401b0316610428565b6000805482108015610428575050600090815260046020526040902054600160e01b900460ff161590565b60008281526006602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006108e282610d74565b9050836001600160a01b031681600001516001600160a01b0316146109195760405162a1148160e81b815260040160405180910390fd5b6000336001600160a01b0386161480610937575061093785336103ae565b80610952575033610947846104c0565b6001600160a01b0316145b90508061097257604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b03841661099957604051633a954ecd60e21b815260040160405180910390fd5b6109a56000848761087b565b6001600160a01b038581166000908152600560209081526040808320805467ffffffffffffffff198082166001600160401b0392831660001901831617909255898616808652838620805493841693831660019081018416949094179055898652600490945282852080546001600160e01b031916909417600160a01b42909216919091021783558701808452922080549193909116610a79576000548214610a7957805460208601516001600160401b0316600160a01b026001600160e01b03199091166001600160a01b038a16171781555b50505082846001600160a01b0316866001600160a01b031660008051602061172e83398151915260405160405180910390a45050505050565b6000546001600160a01b038316610adb57604051622e076360e81b815260040160405180910390fd5b81610af95760405163b562e8dd60e01b815260040160405180910390fd5b6001600160a01b038316600081815260056020908152604080832080546001600160801b031981166001600160401b038083168a018116918217600160401b67ffffffffffffffff1990941690921783900481168a01811690920217909155858452600490925290912080546001600160e01b031916909217600160a01b4290921691909102179055808083015b6040516001830192906001600160a01b0387169060009060008051602061172e833981519152908290a4808210610b875750600055505050565b6000610bcc83610d74565b80519091508215610c32576000336001600160a01b0383161480610bf55750610bf582336103ae565b80610c10575033610c05866104c0565b6001600160a01b0316145b905080610c3057604051632ce44b5f60e11b815260040160405180910390fd5b505b610c3e6000858361087b565b6001600160a01b0380821660008181526005602090815260408083208054600160801b6000196001600160401b0380841691909101811667ffffffffffffffff198416811783900482166001908101831690930277ffffffffffffffff0000000000000000ffffffffffffffff19909416179290921783558b86526004909452828520805460ff60e01b1942909316600160a01b026001600160e01b03199091169097179690961716600160e01b178555918901808452922080549194909116610d3c576000548214610d3c57805460208701516001600160401b0316600160a01b026001600160e01b03199091166001600160a01b038716171781555b5050604051869250600091506001600160a01b0384169060008051602061172e833981519152908390a4505060018054810190555050565b604080516060810182526000808252602082018190529181019190915281600054811015610e7557600081815260046020908152604091829020825160608101845290546001600160a01b0381168252600160a01b81046001600160401b031692820192909252600160e01b90910460ff16151591810182905290610e735780516001600160a01b031615610e0a579392505050565b5060001901600081815260046020908152604091829020825160608101845290546001600160a01b038116808352600160a01b82046001600160401b031693830193909352600160e01b900460ff1615159281019290925215610e6e579392505050565b610e0a565b505b604051636f96cda160e11b815260040160405180910390fd5b6000546001600160a01b038416610eb757604051622e076360e81b815260040160405180910390fd5b82610ed55760405163b562e8dd60e01b815260040160405180910390fd5b6001600160a01b038416600081815260056020908152604080832080546001600160801b031981166001600160401b038083168b018116918217600160401b67ffffffffffffffff1990941690921783900481168b01811690920217909155858452600490925290912080546001600160e01b0319168317600160a01b42909316929092029190911790558190818501903b15610fdd575b60405182906001600160a01b0388169060009060008051602061172e833981519152908290a4610fa6600087848060010195508761103a565b610fc3576040516368d2bf6b60e11b815260040160405180910390fd5b808210610f6d578260005414610fd857600080fd5b611010565b5b6040516001830192906001600160a01b0388169060009060008051602061172e833981519152908290a4808210610fde575b50600090815561075c9085838684565b6105a0828260405180602001604052806000815250610e8e565b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a029061106f90339089908890889060040161161f565b602060405180830381600087803b15801561108957600080fd5b505af19250505080156110b9575060408051601f3d908101601f191682019092526110b69181019061165c565b60015b611114573d8080156110e7576040519150601f19603f3d011682016040523d82523d6000602084013e6110ec565b606091505b50805161110c576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490505b949350505050565b6060816111565750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611180578061116a8161168f565b91506111799050600a836116c0565b915061115a565b6000816001600160401b0381111561119a5761119a6113c6565b6040519080825280601f01601f1916602001820160405280156111c4576020820181803683370190505b5090505b841561112a576111d96001836116d4565b91506111e6600a866116eb565b6111f19060306116ff565b60f81b81838151811061120657611206611717565b60200101906001600160f81b031916908160001a905350611228600a866116c0565b94506111c8565b6001600160e01b0319811681146105ca57600080fd5b60006020828403121561125757600080fd5b813561081b8161122f565b60005b8381101561127d578181015183820152602001611265565b8381111561075c5750506000910152565b600081518084526112a6816020860160208601611262565b601f01601f19169290920160200192915050565b60208152600061081b602083018461128e565b6000602082840312156112df57600080fd5b5035919050565b80356001600160a01b03811681146112fd57600080fd5b919050565b6000806040838503121561131557600080fd5b61131e836112e6565b946020939093013593505050565b60008060006060848603121561134157600080fd5b61134a846112e6565b9250611358602085016112e6565b9150604084013590509250925092565b6000806040838503121561137b57600080fd5b611384836112e6565b915060208301356001600160401b03811681146113a057600080fd5b809150509250929050565b6000602082840312156113bd57600080fd5b61081b826112e6565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126113ed57600080fd5b81356001600160401b0380821115611407576114076113c6565b604051601f8301601f19908116603f0116810190828211818310171561142f5761142f6113c6565b8160405283815286602085880101111561144857600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060006060848603121561147d57600080fd5b611486846112e6565b92506020840135915060408401356001600160401b038111156114a857600080fd5b6114b4868287016113dc565b9150509250925092565b803580151581146112fd57600080fd5b600080604083850312156114e157600080fd5b823591506114f1602084016114be565b90509250929050565b6000806040838503121561150d57600080fd5b611516836112e6565b91506114f1602084016114be565b6000806000806080858703121561153a57600080fd5b611543856112e6565b9350611551602086016112e6565b92506040850135915060608501356001600160401b0381111561157357600080fd5b61157f878288016113dc565b91505092959194509250565b6000806040838503121561159e57600080fd5b6115a7836112e6565b91506114f1602084016112e6565b600181811c908216806115c957607f821691505b602082108114156115ea57634e487b7160e01b600052602260045260246000fd5b50919050565b60008351611602818460208801611262565b835190830190611616818360208801611262565b01949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906116529083018461128e565b9695505050505050565b60006020828403121561166e57600080fd5b815161081b8161122f565b634e487b7160e01b600052601160045260246000fd5b60006000198214156116a3576116a3611679565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826116cf576116cf6116aa565b500490565b6000828210156116e6576116e6611679565b500390565b6000826116fa576116fa6116aa565b500690565b6000821982111561171257611712611679565b500190565b634e487b7160e01b600052603260045260246000fdfeddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220d6b04c7278077b3a45fce9db3f6b216b8d26c43585a0c0e223fc0ac8f31f486764736f6c63430008090033";

type ERC721AMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721AMockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721AMock__factory extends ContractFactory {
  constructor(...args: ERC721AMockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721AMock> {
    return super.deploy(
      name_,
      symbol_,
      overrides || {}
    ) as Promise<ERC721AMock>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721AMock {
    return super.attach(address) as ERC721AMock;
  }
  override connect(signer: Signer): ERC721AMock__factory {
    return super.connect(signer) as ERC721AMock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AMockInterface {
    return new utils.Interface(_abi) as ERC721AMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721AMock {
    return new Contract(address, _abi, signerOrProvider) as ERC721AMock;
  }
}
