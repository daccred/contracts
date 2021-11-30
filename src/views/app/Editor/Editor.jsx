import React from 'react';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'realmono';
import { Toolbar } from 'realmono/toolbar/toolbar';
// import { PagesPanel } from 'realmono/side-panel/pages-panel';
import { navigation, userNavigation } from '@/config/constants';
import { Disclosure } from '@headlessui/react';

// import { ZoomButtons } from 'realmono/toolbar/zoom-buttons';
import { SidePanel } from 'realmono/side-panel';
import { Workspace } from 'realmono/canvas/workspace';

import { loadFile } from './actions/file';

// import Topbar from './Topbar';
import HeaderDesktop from '@/components/header/HeaderDesktop';

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
  const user = {
    name: '0x06b3f....ad10x',
    email: '0x0c0dsd0s',
    imageUrl: '/images/metamask.svg',
  };

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
      <Disclosure as='nav' className='bg-gray-900'>
        {({ open }) => (
          <HeaderDesktop
            userNavigation={userNavigation}
            user={user}
            navigation={navigation}
            open={open}
            hasProfile={true}
          />
        )}
      </Disclosure>
      {/* <Topbar store={store} /> */}
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
