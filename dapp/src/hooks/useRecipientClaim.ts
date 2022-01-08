/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNewMoralisObject } from 'react-moralis';
// import { ASSET_TEMPLATES } from '@/config/constants';
import Moralis from 'moralis';
import { useState } from 'react';

export interface TemplateSaveOptions {
  name: string;
  make: string;
  assetType: 'PHYSICAL' | 'DIGITAL' | string;
  remoteControl: 'YES' | 'NO';
  predictableDemand: 'YES' | 'NO';
  currency: 'USD' | 'GBP' | 'EUR';
  makeModel: string;
  purchasePrice: number;
  image: FileList;
  suppliers: string;
  img?: Moralis.File;
  imgIPFS?: string;
  imgURI?: string;
  [x: string]: unknown;
}

/* When saving to IPFS, we can infer properties to Moralis.File types */

export type MoralisIPFSFile = Moralis.File & {
  _ipfs: string;
  _hash: string;
};
/**
 * A hook for making/saving new Asset template to Moralis Objects
 */
export const useRecipientClaim = () => {
  const [isSubmitting, _setSubmitting] = useState<boolean>();
  const { object, error, save } = useNewMoralisObject("Claims");

  const execute = async (saveOptions: TemplateSaveOptions) => {
    _setSubmitting(true);
    const { image, ...options } = saveOptions;

    /* ----- Save upload file input to IPFS ----- */
    const metadata = { asset: options.name, currency: options.currency };
    const tags = { type: options.assetType };

    //@ts-ignore type is different than documentation (it should accept metadata and tags)
    const file = new Moralis.File(`${options.name}-${options.assetType}`, image[0], metadata, tags) as MoralisIPFSFile;
    await file.saveIPFS();

    /* placeholder variable to handle success data */
    let response;

    /* ------  After Creating the file and uploading to IPFS /////// --- */
    /* ------  We will now persist the object into the Moralis Database /////// --- */

    options.imgIPFS = file._ipfs;
    options.imgURI = file._hash;
    options.img = file;

    await save(options, {
      throwOnError: false,
      onSuccess: (result) => (response = JSON.stringify(result)),
    });

    console.log(response);
    _setSubmitting(false);

    /* return object and error = null from operation or error and obj = null when errr*/
    return [response, error];
  };

  return { execute, object, isSubmitting, error };
};
