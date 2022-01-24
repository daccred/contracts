import { makeUseAxios } from 'axios-hooks';
import makeAxios from '@/lib/http/axios';
import { docsRoute } from '@/lib/http/api';
import useStore from '@/lib/store';
import { DocumentStoreProps } from '@/lib/store/doc';
import { useChain, useNewMoralisObject } from 'react-moralis';
import localforage from 'localforage';
import { LF_EDITOR_VAR, MORALIS_DB_CREDENTIALS } from '@/config/constants';

// const dispatchFailAction = useStore((slice) => slice.handleWizardAction);
const useAxios = makeUseAxios({
  axios: makeAxios,
  defaultOptions: { useCache: false, manual: true },
});

export default function useDocumentApi() {
  const { account } = useChain();

  /* --------------- Moralis Reflect ---------------- */
  const { error: objError, save } = useNewMoralisObject(MORALIS_DB_CREDENTIALS);
  /* --------------- Moralis Reflect ---------------- */

  /* Init store values */
  const store = useStore((slice) => slice.document);
  const dispatchStoreAction = useStore((slice) => slice.updateDocumentStore);
  const dispatchLoadingAction = useStore((slice) => slice.dispatchDocumentLoading);

  /* Axios API Interaction */
  const [{ loading: createLoading, error: createError }, executeCreate] = useAxios({
    url: docsRoute,
    method: 'POST',
  });

  const saveNewDocument = async (payload: DocumentStoreProps) => {
    /* Reset the document store, and dispatch a loading state */
    dispatchLoadingAction();

    try {
      /* Get Schema from Local Forage */
      const schema = await localforage.getItem(LF_EDITOR_VAR);

      const createPayload = {
        name: payload.name,
        editorSchema: schema,
        networkName: payload.network?.chainName,
        networkId: payload.networkId,
        deployerAddress: account,
      };

      const result = await executeCreate({
        data: createPayload,
      });

      // eslint-disable-next-line no-console
      console.log(result.data, createError);

      /* --------------- Moralis Reflect ---------------- */
      const moralisReflect = await save({ ...result.data.result });
      /* --------------- Moralis Reflect ---------------- */
      await dispatchStoreAction({ ...result.data.result, moralisReflect });

      /* Return a result from operation */
      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(createError?.response, objError);
      throw new Error(`Failed to create new document${JSON.stringify(objError)}`);
    }
  };

  return {
    error: store.errors,
    saveNewDocument: saveNewDocument,
    isSaveLoading: createLoading,
  };
}
