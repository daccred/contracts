/* All credentials, certificates or designs on the platform are docs */
/* Jan, 21, 2022: We have started adopting this naming convention */

import { DocumentStatus, NetworkEnum } from '@/config/enums';
import { NetworkConfig } from '@/config/networks';
import { actionSuccessState, initialState, InitialStoreSlice, StoreSlice } from '@/lib/store';

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
}

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
export type DocumentStore = {
  document: InitialStoreSlice<DocumentStoreProps>;
  clear: () => void;
  handleWizardAction: (payload: Partial<DocumentStoreProps>) => void;
};

export const createNewDocumentSlice: StoreSlice<DocumentStore> = (set) => ({
  document: {
    ...initialState,
    data: {},
  },
  /* Clear the document slice from state */
  clear: () => set({ document: { ...initialState, data: {} } }, true),
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
});
