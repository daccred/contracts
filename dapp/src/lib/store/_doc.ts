/* All credentials, certificates or designs on the platform are docs */
/* Jan, 21, 2022: We have started adopting this naming convention */

import { DocumentStatus, NetworkEnum } from "@/config/enums";
import { networkConfigs } from "@/config/networks";
import { StoreSlice } from "@/lib/store";

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
  credential?:  DocumentStoreProps;
  dispatchNewDocumentAction?: (payload: Partial<DocumentStoreProps>) => void;
};

export const createNewDocumentSlice: StoreSlice<DocumentStore> = (set) => ({
  credential: {},
  dispatchNewDocumentAction: (payload: Partial<DocumentStoreProps>) => {
    set((state) => ({ credential: Object.assign(state.credential, payload) }));
  },
});