/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
//@ts-ignore
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'realmono';
import { Toolbar } from 'realmono/toolbar/toolbar';
import { LF_EDITOR_VAR, navigation, userNavigation } from '@/config/constants';
import { Disclosure } from '@headlessui/react';

import { SidePanel, UploadSection } from 'realmono/side-panel';
import { Workspace } from 'realmono/canvas/workspace';

import { loadFile } from './actions/file';
// import PublishAction from './actions/PublishAction';

import useStore from '@/lib/store';
import useHeight from '@/hooks/useHeight';
import EditorTopbar from '@/components/header/EditorTopbar';
import useAuthUser from '@/hooks/useAuthUser';
import TemplateSection from '@/components/editor/EditorTemplateSection';
import VariableSection from '@/components/editor/RecipientVariableSection';
import PublishSection from '@/components/editor/EditorPublishSection';
import Loader from '@/components/display/Loader';
import localforage from 'localforage';

const PANEL_SECTIONS = [TemplateSection, UploadSection, VariableSection, PublishSection];

export interface EditorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: any;
  slug: string;
}

const Editor = ({ store, slug }: EditorProps) => {
  const { user, hasProfile } = useAuthUser();
  const height = useHeight();

  /*  -------------------The document state from zustand ------------------- */
  const document = useStore((slice) => slice.document);
  /*  -------------------The document state from zustand ------------------- */

  React.useEffect(() => {
    /* Update the Editor with Retrieved Store JSON */
    const schema = JSON.parse(document.data.schema as string);

    localforage.getItem(LF_EDITOR_VAR, function (_err, json) {
      if (json) {
        const canOverwrite = window.confirm(
          'Loading this site will overwrite all of the design progress you have made in this browser locally'
        );

        canOverwrite && store.loadJSON(schema);
        canOverwrite && Promise.resolve(localforage.setItem(LF_EDITOR_VAR, schema));
      } else {
        store.loadJSON(json);
      }

      if (!store.pages.length) {
        store.addPage();
      }
    });
  }, [slug]);

  const handleDrop = (ev: { preventDefault: () => void; dataTransfer: { files: string | any[] } }) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      loadFile(ev.dataTransfer.files[i], store);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: height + 'px',
        display: 'flex',
        flexDirection: 'column',
      }}
      //@ts-ignore
      onDrop={handleDrop}
    >
      <Disclosure as='nav' className='relative z-20 bg-gray-900'>
        {({ open }) => (
          <EditorTopbar
            userNavigation={userNavigation}
            user={user}
            navigation={navigation}
            open={open}
            hasProfile={hasProfile}
            store={store}
            document={document.data || {}}
          />
        )}
      </Disclosure>

      {/* ----- Query Data from DB and do the needful once complete */}
      {document.isLoading ? (
        <Loader />
      ) : (
        <div style={{ height: 'calc(100% - 50px)' }}>
          <PolotnoContainer className='editor-container'>
            <SidePanelWrap>
              <SidePanel
                defaultSection={'upload'}
                //@ts-ignore
                sections={PANEL_SECTIONS}
                store={store}
              />
            </SidePanelWrap>
            <WorkspaceWrap>
              <Toolbar store={store} />
              <Workspace pageControlsEnabled={false} store={store} />
              {/* <ZoomButtons store={store} /> */}
            </WorkspaceWrap>
          </PolotnoContainer>
        </div>
      )}
    </div>
  );
};

export default Editor;
