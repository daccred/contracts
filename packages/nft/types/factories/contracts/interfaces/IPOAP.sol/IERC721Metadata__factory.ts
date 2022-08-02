/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC721Metadata,
  IERC721MetadataInterface,
} from "../../../../contracts/interfaces/IPOAP.sol/IERC721Metadata";

const _abi = [
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
];

export class IERC721Metadata__factory {
  static readonly abi = _abi;
  static createInterface(): IERC721MetadataInterface {
    return new utils.Interface(_abi) as IERC721MetadataInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC721Metadata {
    return new Contract(address, _abi, signerOrProvider) as IERC721Metadata;
  }
}
