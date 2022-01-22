/* eslint-disable @typescript-eslint/no-explicit-any */
import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';
import { createNewDocumentSlice, DocumentStore } from './doc';

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/
export type InitialStoreSlice<T extends unknown> = {
  isLoaded: boolean,
  isLoading: boolean,
  actionSuccessful: boolean,
  actionFailed: boolean,
  results: [],
  prev?: undefined,
  next?: undefined,
  page_by?: Record<string, any>,
  filter_by?: Record<string, any>,
  sort_by?: Record<string, any>,
  errors?: Record<string, any>,
  query?: undefined,
  data: T
};

export type DefaultStateProps = {
  __version__: string,
  isAppLoaded: boolean,
  isAppLoading: boolean,
  errors: any,
}

/* The Main Store state that unions all slices */
type StoreState = DefaultStateProps & DocumentStore;

/**--------------------------------------------------------------*/
/* Handle all of the type definitions for the Store by Slice     */
/**--------------------------------------------------------------*/

/**--------------------------------------------------------------*/
export type StoreSlice<T> = (set: SetState<StoreState>, get: GetState<StoreState>) => T;

/**-------------------------------------------------------------------------*/
/* ^^^ ABOVE WE USE THE STATES TO DERIVE [get,set] TYPINGS FOR SLICES  ^^^  */
/**-------------------------------------------------------------------------*/

export const initialState: InitialStoreSlice<unknown> = {
  isLoaded: false,
  isLoading: false,
  actionSuccessful: false,
  actionFailed: false,
  results: [],
  prev: undefined,
  next: undefined,
  page_by: {},
  filter_by: {},
  sort_by: {},
  errors: {},
  query: undefined,
  data: {}
};

export const loadingState: Partial<InitialStoreSlice<any>> = {
  isLoaded: false,
  isLoading: true,
  actionSuccessful: false,
  actionFailed: false,
}

export const actionSuccessState: Partial<InitialStoreSlice<any>> = {
  isLoaded: true,
  isLoading: false,
  actionSuccessful: true,
  actionFailed: false,
}

export const actionFailState: Partial<InitialStoreSlice<any>> = {
  isLoaded: true,
  isLoading: false,
  actionSuccessful: false,
  actionFailed: true,
}

const initialStateSlice: StoreSlice<any> = (set) => ({
  __version__: 1.0,
  isAppLoaded: true,
  isAppLoading: false,
  errors: {},
  /* This clear function will clear the whole store */
  clear: () => set({ }, true),
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
      ...initialStateSlice(set, get),
      ...createNewDocumentSlice(set, get),
    }),
    /* ------ Persist Middleware specific configs and action ------ */
    {
      name: '__zusccred__',
    }
  )
);

export default useZustand