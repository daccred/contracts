/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ChainlinkRequestInterfaceContract
  extends Truffle.Contract<ChainlinkRequestInterfaceInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<ChainlinkRequestInterfaceInstance>;
}

type AllEvents = never;

export interface ChainlinkRequestInterfaceInstance
  extends Truffle.ContractInstance {
  oracleRequest: {
    (
      sender: string,
      requestPrice: number | BN | string,
      serviceAgreementID: string,
      callbackAddress: string,
      callbackFunctionId: string,
      nonce: number | BN | string,
      dataVersion: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      sender: string,
      requestPrice: number | BN | string,
      serviceAgreementID: string,
      callbackAddress: string,
      callbackFunctionId: string,
      nonce: number | BN | string,
      dataVersion: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      sender: string,
      requestPrice: number | BN | string,
      serviceAgreementID: string,
      callbackAddress: string,
      callbackFunctionId: string,
      nonce: number | BN | string,
      dataVersion: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      sender: string,
      requestPrice: number | BN | string,
      serviceAgreementID: string,
      callbackAddress: string,
      callbackFunctionId: string,
      nonce: number | BN | string,
      dataVersion: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  cancelOracleRequest: {
    (
      requestId: string,
      payment: number | BN | string,
      callbackFunctionId: string,
      expiration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      requestId: string,
      payment: number | BN | string,
      callbackFunctionId: string,
      expiration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      requestId: string,
      payment: number | BN | string,
      callbackFunctionId: string,
      expiration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      requestId: string,
      payment: number | BN | string,
      callbackFunctionId: string,
      expiration: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    oracleRequest: {
      (
        sender: string,
        requestPrice: number | BN | string,
        serviceAgreementID: string,
        callbackAddress: string,
        callbackFunctionId: string,
        nonce: number | BN | string,
        dataVersion: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        sender: string,
        requestPrice: number | BN | string,
        serviceAgreementID: string,
        callbackAddress: string,
        callbackFunctionId: string,
        nonce: number | BN | string,
        dataVersion: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        sender: string,
        requestPrice: number | BN | string,
        serviceAgreementID: string,
        callbackAddress: string,
        callbackFunctionId: string,
        nonce: number | BN | string,
        dataVersion: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        sender: string,
        requestPrice: number | BN | string,
        serviceAgreementID: string,
        callbackAddress: string,
        callbackFunctionId: string,
        nonce: number | BN | string,
        dataVersion: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    cancelOracleRequest: {
      (
        requestId: string,
        payment: number | BN | string,
        callbackFunctionId: string,
        expiration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        requestId: string,
        payment: number | BN | string,
        callbackFunctionId: string,
        expiration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        requestId: string,
        payment: number | BN | string,
        callbackFunctionId: string,
        expiration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        requestId: string,
        payment: number | BN | string,
        callbackFunctionId: string,
        expiration: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
