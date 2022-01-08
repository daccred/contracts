/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNewMoralisObject } from 'react-moralis';
import Moralis from 'moralis';
import { useState } from 'react';

const _metadataMock = {
  id: 18845238,
  name: 'Var School Class of 2020',
  description: 'Certificate of Participation',
  credential_url: 'http://api.daccred.co?aad=BAhJIj57InR5cGUiOiJjb3Vy9b8',
  public_address: '0x0b3bb8a2c253ec009e0e3d455369a58ab4afa0a3',
  pdf: null,
  pdfIPFS: null,
  image: null,
  imageIPFS: null,
  private: false,
  grade: null,
  issued_on: new Date().toISOString(),
  published_on: '2022-01-06',
  expired_on: null,
  custom_attributes: {},
  verified: false,
  recipient: {
    name: 'Andrew Miracle',
    wallet_address: '0x0b3bb8a2c253ec009e0e3d455369a58ab4afa0a3',
  },
  issuer: {
    id: 45327,
    name: 'Var School',
    url: 'http://api.daccred.co/cGUiOiJjb3Vyc',
    contract_address: '0x67d8daeb33e7b60ef423f42f7973148cf64a5eee',
    description: 'Class of 2021',
    image_url: null,
    support_contact_email: 'andrew@varschool.com',
    logo: null,
  },
};

export interface TemplateSaveOptions {
  name: string;
  description: string;
  network: string;
  networkId?: string;
  imageDataURI: string; // Base64
  pdfDataURI: string; // Base64
  suppliers: string;
  img?: Moralis.File;
  pdf?: Moralis.File;
  metadata?: Moralis.File;
  metadataIPFS?: string;
  metadataURI?: string;
  imgIPFS?: string;
  imgURI?: string;
  pdfIPFS?: string;
  pdfURI?: string;
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
  const { object, error, save } = useNewMoralisObject('Claims');

  const execute = async (saveOptions: Partial<TemplateSaveOptions>) => {
    _setSubmitting(true);
    const { imageDataURI, pdfDataURI, ...options } = saveOptions;

    /* ----- Save upload file input to IPFS ----- */
    const metadata = { asset: _metadataMock.name, issuer: _metadataMock.issuer.name };
    const tags = { issuer: _metadataMock.issuer.name };

    const file = new Moralis.File(
      `${_metadataMock.name}-${_metadataMock.recipient.name}.png`,
      { base64: imageDataURI },
      //@ts-ignore type is different than documentation (it should accept metadata and tags)
      metadata,
      //@ts-ignore
      tags
    ) as MoralisIPFSFile;
    await file.saveIPFS();

    //@ts-ignore
    const pdf = new Moralis.File(`${Date.now()}.pdf`, { uri: pdfDataURI }) as MoralisIPFSFile;
    await pdf.saveIPFS();

    /* placeholder variable to handle success data */
    let response;

    /* ------  After Creating the file and uploading to IPFS /////// --- */
    /* ------  We will now persist the object into the Moralis Database /////// --- */

    options.imgIPFS = file._ipfs;
    options.imgURI = file._hash;
    options.img = file;

    // PDF
    options.pdf = pdf;
    options.pdfIPFS = pdf._ipfs;
    options.pdfURI = pdf._hash;

    /* After uploading the image, we build the ipfs metadata JSON */

    const jsonMetadata = new Moralis.File('metadata.json', {
      base64: btoa(
        JSON.stringify({
          ..._metadataMock,
          image: file._ipfs,
          imageIPFS: file._hash,
          pdfIPFS: pdf._hash,
          pdf: pdf._ipfs,
        })
      ),
    }) as MoralisIPFSFile;

    /* Save to PDF IPFS and tag to Data Access Object */
    await jsonMetadata.saveIPFS();
    options.metadata = jsonMetadata;
    options.metadataURI = jsonMetadata._hash;
    options.metadataIPFS = jsonMetadata._ipfs;

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
