import React from 'react';
import localforage from 'localforage';
import { createStore } from 'realmono/model/store';

import Editor from './Editor';
import { LF_EDITOR_VAR, LF_STORE_KEY } from '@/config/constants';

export const store = createStore({ key: LF_STORE_KEY });

store.on('change', () => {
  try {
    /* Persist every new change to local forage to avoid losses */
    const json = store.toJSON();
    localforage.setItem(LF_EDITOR_VAR, json);

    /** Track the Changes for variable Text and lock*/
    store.pages.forEach((page) => {
      page.children.forEach((el) => {
        // skip non text
        if (el.type !== "text") {
          return;
        }
        // skip if no special value
        if (!el.custom?.variableText) {
          return;
        }
        const changed = el.text !== el.custom?.variableText;
        if (changed) {
          el.set({
            text: el.custom?.variableText
          });
        }
      });
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'error occured with store hooks & localforage');
  }
});



    store.pages.forEach((page) => {
      page.children.forEach((el) => {
        // skip non text
        if (el.type !== "text") {
          return;
        }
        // skip if no special value
        if (!el.custom?.variableText) {
          return;
        }
        const changed = el.text !== el.custom?.variableText;
        if (changed) {
          el.set({
            text: el.custom?.variableText
          });
        }
      });
    });

export default function View({ slug }) {
  return <Editor store={store} slug={slug} />;
}
