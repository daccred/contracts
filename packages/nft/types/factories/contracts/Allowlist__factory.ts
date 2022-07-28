/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Allowlist, AllowlistInterface } from "../../contracts/Allowlist";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_allowlistOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "Unsigned",
    type: "error",
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
        name: "_address",
        type: "address",
      },
    ],
    name: "Signed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "Verified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "addressHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    name: "VerifySignature",
    type: "event",
  },
  {
    inputs: [],
    name: "getAllowlistOwner",
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
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "sig",
        type: "bytes",
      },
    ],
    name: "verifySignature",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "verifySigner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516106f53803806106f583398101604081905261002f916100ad565b6100383361005d565b600180546001600160a01b0319166001600160a01b03929092169190911790556100dd565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100bf57600080fd5b81516001600160a01b03811681146100d657600080fd5b9392505050565b610609806100ec6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80636e0a874614610067578063715018a6146100915780638da5cb5b1461009b578063daca6f78146100ac578063e92b0842146100cf578063f2fde38b146100e2575b600080fd5b6001546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b6100996100f5565b005b6000546001600160a01b0316610074565b6100bf6100ba3660046104fe565b610109565b6040519015158152602001610088565b6100bf6100dd366004610561565b61011c565b6100996100f03660046105b8565b6101b0565b6100fd61022e565b6101076000610288565b565b600061011583836102d8565b9392505050565b602081810151604080840151606080860151835160008082528188018087528a905291821a81860181905292810186905260808101849052935190959293919260019260a080820193601f1981019281900390910190855afa158015610186573d6000803e3d6000fd5b505050602060405103516001600160a01b0316876001600160a01b03161493505050509392505050565b6101b861022e565b6001600160a01b0381166102225760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b61022b81610288565b50565b6000546001600160a01b031633146101075760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610219565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006102e261022e565b6000546001600160a01b031633146103505760405162461bcd60e51b815260206004820152602b60248201527f4552433732313a3a2043616c6c20746f20636f6e7472616374206d616465206260448201526a3c903737b716b7bbb732b960a91b6064820152608401610219565b81516041146103a15760405162461bcd60e51b815260206004820152601e60248201527f4572723a3a20496e76616c6964207369676e6174757265206c656e67746800006044820152606401610219565b602082810151604080850151606080870151835160008082529681018086528a905290861a938101849052908101849052608081018290529293909260019060a0016020604051602081039080840390855afa158015610405573d6000803e3d6000fd5b5050604051601f198101516001549093506001600160a01b038085169116149150819089907f7e4fe2a2a805a357593fdbdde58c02f6a53d8b4960744cd31a98697fc11c2e3690600090a3979650505050505050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261048257600080fd5b813567ffffffffffffffff8082111561049d5761049d61045b565b604051601f8301601f19908116603f011681019082821181831017156104c5576104c561045b565b816040528381528660208588010111156104de57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806040838503121561051157600080fd5b82359150602083013567ffffffffffffffff81111561052f57600080fd5b61053b85828601610471565b9150509250929050565b80356001600160a01b038116811461055c57600080fd5b919050565b60008060006060848603121561057657600080fd5b61057f84610545565b925060208401359150604084013567ffffffffffffffff8111156105a257600080fd5b6105ae86828701610471565b9150509250925092565b6000602082840312156105ca57600080fd5b6101158261054556fea2646970667358221220e6dbedd3538254ba7c3f5e57b05c12e317c0256fb1254d553ccded3a6b54fe2b64736f6c63430008090033";

type AllowlistConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AllowlistConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Allowlist__factory extends ContractFactory {
  constructor(...args: AllowlistConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _allowlistOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Allowlist> {
    return super.deploy(_allowlistOwner, overrides || {}) as Promise<Allowlist>;
  }
  override getDeployTransaction(
    _allowlistOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_allowlistOwner, overrides || {});
  }
  override attach(address: string): Allowlist {
    return super.attach(address) as Allowlist;
  }
  override connect(signer: Signer): Allowlist__factory {
    return super.connect(signer) as Allowlist__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AllowlistInterface {
    return new utils.Interface(_abi) as AllowlistInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Allowlist {
    return new Contract(address, _abi, signerOrProvider) as Allowlist;
  }
}