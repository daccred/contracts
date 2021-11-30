/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

type TPage =  { children: any[]; }



export default function useNewEditorTemplate(store: any) {

  const handleTemplateSelection = (json: JSON) => {
    // const ids = store.pages.map((page: TPage) => page.children.map((child) => child.id)).flat();
    // const hasObjects = ids?.length;

    // if (hasObjects) {
    //   if (!window.confirm('Choosing this template will replace the existing design')) {
    //     return;
    //   }
    // }
    // const pagesIds = store.pages.map((p: { id: any; }) => p.id);
    // store.deletePages(pagesIds);
    // store.addPage();
    store.loadJSON(json);
  }

  return {handleTemplateSelection};
}
