import { makeUseAxios } from 'axios-hooks';
import makeAxios from '@/lib/http/axios';
import { docsRoute } from '@/lib/http/api';
import useStore from '@/lib/store';
import { DocumentStoreProps } from '@/lib/store/doc';
import { useChain } from 'react-moralis';
import localforage from 'localforage';
import { LF_EDITOR_VAR } from '@/config/constants';

// const dispatchFailAction = useStore((slice) => slice.handleWizardAction);
const useAxios = makeUseAxios({
  axios: makeAxios,
  defaultOptions: { useCache: false, manual: true },
});

export default function useDocumentApi() {
  const { account } = useChain();

  /* Init store values */
  const store = useStore((slice) => slice.document);
  const dispatchStoreAction = useStore((slice) => slice.handleWizardAction);

  /* Axios API Interaction */
  const [{ loading: createLoading, error: createError }, executeCreate] = useAxios({
    url: docsRoute,
    method: 'POST',
  });

  const saveNewDocument = async (payload: DocumentStoreProps) => {
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
      await dispatchStoreAction(result.data.result);

      /* Return a result from operation */
      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(createError?.response, createError);
      throw new Error('Failed to create new document');
    }
  };

  return {
    error: store.errors,
    saveNewDocument: saveNewDocument,
    isSaveLoading: createLoading,
  };
}
