/* All credentials, certificates or designs on the platform are docs */
/* Jan, 21, 2022: We have started adopting this naming convention */

import { DocumentStatus, NetworkEnum } from '@/config/enums';
import { NetworkConfig } from '@/config/networks';
import { actionSuccessState, initialState, InitialStoreSlice, loadingState, StoreSlice } from '@/lib/store';
import Moralis from 'moralis/types';

export interface DocumentStoreProps {
  name?: string;
  description?: string;
  editorSchema?: string;
  network?: NetworkConfig;
  networkId?: NetworkEnum;
  deployerAddress?: string;
  slug?: string;
  owner?: string;
  recipientListSlug?: string;
  status?: DocumentStatus;
  moralisReflect?: Moralis.Object;
}

export interface DocumentDeployProps {
  metadata?: {
    name: string;
    slug: string;
    parseId: string;
    thumbnail: string;
    description: string;
    deployedAt?: string | Date;
  };
  parentContract?: string;
  blockHash?: string;
  gasLimit?: string;
  gasUsed?: string;
  contractAddress?: string;
  transactionHash?: string;
}

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
export type DocumentStore = {
  document: InitialStoreSlice<DocumentStoreProps>;
  publication: DocumentDeployProps & typeof actionSuccessState;
  clear: () => void;
  dispatchPublicationLoading: () => void;
  dispatchDocumentLoading: () => void;
  dispatchDocDeployment: (payload: DocumentDeployProps) => void;
  handleWizardAction: (payload: Partial<DocumentStoreProps>) => void;
};

export const createNewDocumentSlice: StoreSlice<DocumentStore> = (set) => ({
  document: {
    ...initialState,
    data: {},
  },
  publication: {
    isLoaded: false,
    isLoading: false,
  },
  /* Clear the document slice from state */
  clear: () => set({ document: { ...initialState, data: {} } }, true),
  dispatchPublicationLoading: () => set({ publication: loadingState }),
  dispatchDocumentLoading: () => set({ publication: loadingState }),
  /* For each step in the wizard we trigger a succes round and update data */
  handleWizardAction: (payload: Partial<DocumentStoreProps>) => {
    set((state) => ({
      document: {
        ...state.document,
        ...actionSuccessState,
        data: Object.assign(state.document.data, payload),
      },
    }));
  },
  dispatchDocDeployment: (payload: DocumentDeployProps) => {
    set((state) => ({
      publication: {
        ...state.publication,
        ...actionSuccessState,
        ...payload,
      },
    }));
  },
});
