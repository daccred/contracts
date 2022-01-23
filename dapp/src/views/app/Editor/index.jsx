import React from 'react';
import localforage from 'localforage';
import { createStore } from 'realmono/model/store';

import Editor from './Editor';
import { LF_EDITOR_VAR, LF_STORE_KEY } from '@/config/constants';

export const store = createStore({ key: LF_STORE_KEY });

localforage.getItem(LF_EDITOR_VAR, function (_err, json) {
  if (json) {
    store.loadJSON(json);
  }
  if (!store.pages.length) {
    store.addPage();
  }
});

store.on('change', () => {
  try {
    /* Persist every new change to local forage to avoid losses */
    const json = store.toJSON();
    localforage.setItem(LF_EDITOR_VAR, json);

    /**@todo Track the Changes for variable Text and lock*/
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'error occured with store hooks & localforage');
  }
});

export default function View({ slug }) {
  return <Editor store={store} slug={slug} />;
}
