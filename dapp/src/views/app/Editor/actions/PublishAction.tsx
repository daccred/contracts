/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ABI from '@/lib/abis';
import {
  DACRED_ROUTER_ROPSTEN,
  MORALIS_DB_CREDENTIALS,
  DACRED_ROUTER_HARMONY,
  DACRED_ROUTER_GANACHE,
  LF_EDITOR_VAR,
} from '@/config/constants';
import { useMoralis, useMoralisQuery, useNewMoralisObject, useWeb3ExecuteFunction } from 'react-moralis';
import Button from '@/components/buttons/Button';
import { observer } from 'mobx-react-lite';
import { StoreType } from 'realmono/model/store';
import { useState, useEffect } from 'react';
import useStore from '@/lib/store';
import { Moralis } from 'moralis';
import localforage from 'localforage';

const web3ExecOptions = {
  abi: ABI.leanRouter,
  contractAddress: DACRED_ROUTER_HARMONY,
  functionName: 'createContractForClient',
};

interface PublishActionProps {
  handlePublish: (arg: unknown) => void;
  publishProps?: unknown;
  store: StoreType;
}

export default function PublishAction({ store, handlePublish }: PublishActionProps) {
  /* ================================================================================================ */
  // const [response, setResponse] = useState<any>({})
  const document = useStore((slice) => slice.document);
  const dispatchLoadingAction = useStore((slice) => slice.dispatchPublicationLoading);

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction(web3ExecOptions);
  // const { isSaving, error: objError, save } = useNewMoralisObject(MORALIS_DB_CREDENTIALS);
  const {
    data: certQueryData,
    error: queryError,
    isLoading: queryLoading,
  } = useMoralisQuery(MORALIS_DB_CREDENTIALS, (query) => query.equalTo('objectId', document.data?.moralisReflect?.id));

  console.log(certQueryData)
  console.log(document.data, 'MORALIS REFLECT OBJ');

  const {
    web3,
    enableWeb3,
    // isWeb3Enabled, isWeb3EnableLoading, web3EnableError
  } = useMoralis();

  useEffect(() => {
    enableWeb3();
  }, []);

  const _handlePublishAction = async (result: any) => {
    try {
      /* Get Schema from Local Forage */
      const documentSchema = await localforage.getItem(LF_EDITOR_VAR);

      const preview = await store.toDataURL();

      // eslint-disable-next-line no-console
      console.warn(preview, 'toDataURL');
      alert(JSON.stringify(result.events['NewContractCreated'].returnValues.contractAddress));

      /* Make call to contract method */
      // await fetch({params: options});
      // console.log(callContract, "CALL CONTRACT RESPONSE")

      /* Save the preview image to Moralis and store in IPFS */
      const file = new Moralis.File('certificate.png', { base64: preview.split(',')[1] });

      // eslint-disable-next-line no-console
      console.log(file, 'file on IPFS');

      /* Save credential information to Moralis */
      const moralisOperation = {
        file: file,
        thumbnail: preview,
        name: document.data.name,
        slug: document.data.slug,
        certId: document.data.slug,
        description: document.data.description,
        schema: JSON.stringify(documentSchema),
      };
      /* --------------- Moralis Reflect ---------------- */
      // const moralisReflect = await save({...result.data.result})
      const certificate = certQueryData[0];
      certificate.set('file', file);
      certificate.set('thumbnail', preview);
      certificate.set('certId', document.data.name);
      certificate.set('description', document.data.description);
      certificate.set('schema', JSON.stringify(documentSchema));

      const saveOp = await certificate.save();
      /* --------------- Moralis Reflect ---------------- */

      // await setMoralisSaveOp(moralisOperation)
      handlePublish && handlePublish({ moralisOperation: saveOp, result });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, queryError, '[PublishAction: Deploy Certifate action]');
      // alert(JSON.stringify(error));
    }
  };
  /* handle callback */

  /* ================================================================================================ */

  return (
    <div className='flex'>
      <Button
        onClick={() => {
          dispatchLoadingAction();
          /* Heuristics ....___ Prepare state */

          /* ------------------- Web3 Execute Transaction ------------------- */
          fetch({
            params: {
              ...web3ExecOptions,
              params: {
                name: document.data.name,
                certId: document.data.slug,
              },
            },
            onSuccess: async (results) => {
              // eslint-disable-next-line no-console
              console.log(JSON.stringify(results));
              _handlePublishAction(results);
            },
          });
          /* ------------------- Web3 Execute Transaction ------------------- */
        }}
        disabled={!!data || isFetching}
        isLoading={queryLoading || isLoading || document.isLoading}
        className='w-full'
      >
        Publish
      </Button>
    </div>
  );
}
