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

export interface IWhitelistInterface extends utils.Interface {
  functions: {
    "extendWhitelistLength(uint256)": FunctionFragment;
    "getWhitelistLength()": FunctionFragment;
    "getWhitelistMaxLength()": FunctionFragment;
    "setWhitelistLength(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "extendWhitelistLength"
      | "getWhitelistLength"
      | "getWhitelistMaxLength"
      | "setWhitelistLength"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "extendWhitelistLength",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getWhitelistLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWhitelistMaxLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setWhitelistLength",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "extendWhitelistLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWhitelistLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWhitelistMaxLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWhitelistLength",
    data: BytesLike
  ): Result;

  events: {
    "ExtendWhitelistLength(uint256)": EventFragment;
    "SetWhitelistLength(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ExtendWhitelistLength"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetWhitelistLength"): EventFragment;
}

export interface ExtendWhitelistLengthEventObject {
  arg0: BigNumber;
}
export type ExtendWhitelistLengthEvent = TypedEvent<
  [BigNumber],
  ExtendWhitelistLengthEventObject
>;

export type ExtendWhitelistLengthEventFilter =
  TypedEventFilter<ExtendWhitelistLengthEvent>;

export interface SetWhitelistLengthEventObject {
  arg0: BigNumber;
}
export type SetWhitelistLengthEvent = TypedEvent<
  [BigNumber],
  SetWhitelistLengthEventObject
>;

export type SetWhitelistLengthEventFilter =
  TypedEventFilter<SetWhitelistLengthEvent>;

export interface IWhitelist extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWhitelistInterface;

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
    extendWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getWhitelistLength(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getWhitelistMaxLength(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  extendWhitelistLength(
    _length: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getWhitelistLength(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getWhitelistMaxLength(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setWhitelistLength(
    _length: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    extendWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getWhitelistLength(overrides?: CallOverrides): Promise<BigNumber>;

    getWhitelistMaxLength(overrides?: CallOverrides): Promise<BigNumber>;

    setWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "ExtendWhitelistLength(uint256)"(
      arg0?: null
    ): ExtendWhitelistLengthEventFilter;
    ExtendWhitelistLength(arg0?: null): ExtendWhitelistLengthEventFilter;

    "SetWhitelistLength(uint256)"(arg0?: null): SetWhitelistLengthEventFilter;
    SetWhitelistLength(arg0?: null): SetWhitelistLengthEventFilter;
  };

  estimateGas: {
    extendWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getWhitelistLength(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getWhitelistMaxLength(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    extendWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getWhitelistLength(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getWhitelistMaxLength(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setWhitelistLength(
      _length: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
