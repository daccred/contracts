/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IWithSignatureInterface extends utils.Interface {
  functions: {
    "issueWithSignature(address,uint256)": FunctionFragment;
    "revokeWithSignature(uint256)": FunctionFragment;
    "verifySignature(bytes32,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "issueWithSignature"
      | "revokeWithSignature"
      | "verifySignature"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "issueWithSignature",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeWithSignature",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "verifySignature",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "issueWithSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeWithSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifySignature",
    data: BytesLike
  ): Result;

  events: {
    "IssueWithSignature(address,uint256)": EventFragment;
    "RevokeWithSignature(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "IssueWithSignature"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevokeWithSignature"): EventFragment;
}

export interface IssueWithSignatureEventObject {
  _address: string;
  tokenId: BigNumber;
}
export type IssueWithSignatureEvent = TypedEvent<
  [string, BigNumber],
  IssueWithSignatureEventObject
>;

export type IssueWithSignatureEventFilter =
  TypedEventFilter<IssueWithSignatureEvent>;

export interface RevokeWithSignatureEventObject {
  _address: string;
  tokenId: BigNumber;
}
export type RevokeWithSignatureEvent = TypedEvent<
  [string, BigNumber],
  RevokeWithSignatureEventObject
>;

export type RevokeWithSignatureEventFilter =
  TypedEventFilter<RevokeWithSignatureEvent>;

export interface IWithSignature extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWithSignatureInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    issueWithSignature(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeWithSignature(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verifySignature(
      _hash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  issueWithSignature(
    to: PromiseOrValue<string>,
    quantity: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeWithSignature(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verifySignature(
    _hash: PromiseOrValue<BytesLike>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    issueWithSignature(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeWithSignature(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    verifySignature(
      _hash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "IssueWithSignature(address,uint256)"(
      _address?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): IssueWithSignatureEventFilter;
    IssueWithSignature(
      _address?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): IssueWithSignatureEventFilter;

    "RevokeWithSignature(address,uint256)"(
      _address?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): RevokeWithSignatureEventFilter;
    RevokeWithSignature(
      _address?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): RevokeWithSignatureEventFilter;
  };

  estimateGas: {
    issueWithSignature(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeWithSignature(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verifySignature(
      _hash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    issueWithSignature(
      to: PromiseOrValue<string>,
      quantity: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeWithSignature(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verifySignature(
      _hash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
