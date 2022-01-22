/* All credentials, certificates or designs on the platform are docs */
/* Jan, 21, 2022: We have started adopting this naming convention */

import { DocumentStatus, NetworkEnum } from "@/config/enums";
import { networkConfigs } from "@/config/networks";
import { actionSuccessState, initialState, InitialStoreSlice, StoreSlice } from "@/lib/store";

export interface DocumentStoreProps {
  name?: string;
  editorSchema?: string;
  network?: keyof typeof networkConfigs
  networkId?: NetworkEnum
  deployerAddress?: string;
  slug?: string;
  owner?: string;
  recipientListId?: string;
  status?: DocumentStatus;
}


/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
export type DocumentStore = {
  credential:  InitialStoreSlice<DocumentStoreProps>;
  clear: () => void;
  handleWizardAction: (payload: Partial<DocumentStoreProps>) => void;
};

export const createNewDocumentSlice: StoreSlice<DocumentStore> = (set) => ({
  credential: {
    ...initialState,
    data: {}
  },
  clear: () => set({ }, true),
  /* For each step in the wizard we trigger a succes round and update data */
  handleWizardAction: (payload: Partial<DocumentStoreProps>) => {
    set((state) => ({ 
      credential: {
        ...state.credential,
        ...actionSuccessState,
        data: Object.assign(state.credential.data, payload) 
      }
    }));
  },
});