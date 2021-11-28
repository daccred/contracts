import React from 'react';
import localforage from 'localforage';
import { createStore } from 'polotno/model/store';
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config';

import Editor from './Editor';
import { LF_EDITOR_VAR } from '@/config/constants';

unstable_setRemoveBackgroundEnabled(true);

const store = createStore();

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
    const json = store.toJSON();
    localforage.setItem(LF_EDITOR_VAR, json);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'error occured with init localforage');
  }
});

export default function View() {
  return <Editor store={store} />;
}
