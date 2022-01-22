/* eslint-disable @typescript-eslint/no-explicit-any */
import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import { createNewDocumentSlice, DocumentStore } from './_doc';

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
type SampleSlice = {
  fishes: number;
  repopulate: () => void;
};

/* The Main Store state that unions all slices */
type StoreState = SampleSlice & DocumentStore;

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/

/**--------------------------------------------------------------*/
export type StoreSlice<T> = (set: SetState<StoreState>, get: GetState<StoreState>) => T;

/**-------------------------------------------------------------------------*/
/* ^^^ ABOVE WE USE THE STATES TO DERIVE [get,set] TYPINGS FOR SLICES  ^^^  */
/**-------------------------------------------------------------------------*/

const createSampleSlice: StoreSlice<SampleSlice> = (set, get) => ({
  fishes: 10,
  repopulate: () => {
    set({ fishes: get().fishes + 1 });
  },
});



// const createAppUserSlice: StoreSlice<any> = (set) => ({
//   saveImgData: {},
//   dispatchSavesaveImgData: (payload) => {
//     set((state) => ({ saveImgData: Object.assign(state.saveImgData, payload) }));
//   },
// });

export const useZustand = create<StoreState>(
  persist(
    (set, get) => ({
      ...createSampleSlice(set, get),
      ...createNewDocumentSlice(set, get),
    }),
    /* ------ Persist Middleware specific configs and action ------ */
    {
      name: '__zusccred__',
    }
  )
);
