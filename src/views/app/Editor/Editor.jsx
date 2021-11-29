import React from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'realmono';
import { Toolbar } from 'realmono/toolbar/toolbar';
// import { PagesPanel } from 'realmono/side-panel/pages-panel';

// import { ZoomButtons } from 'realmono/toolbar/zoom-buttons';
import { SidePanel } from 'realmono/side-panel';
import { Workspace } from 'realmono/canvas/workspace';

import { loadFile } from './actions/file';

import Topbar from './Topbar';

const useHeight = () => {
  const [height, setHeight] = React.useState(window.innerHeight);
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  }, []);
  return height;
};

const Editor = ({ store }) => {
  const handleDrop = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
      loadFile(ev.dataTransfer.files[i], store);
    }
  };

  const height = useHeight();

  return (
    <div
      style={{
        width: '100vw',
        height: height + 'px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onDrop={handleDrop}
    >
      <Topbar store={store} />
      <div style={{ height: 'calc(100% - 50px)' }}>
        <PolotnoContainer className='editor-container'>
          <SidePanelWrap>
            <SidePanel store={store} />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store} />
            <Workspace store={store} />
            {/* <ZoomButtons store={store} /> */}
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
    </div>
  );
};

export default Editor;
