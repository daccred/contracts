/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { SectionTab } from 'realmono/side-panel';
import { ImagesGrid } from 'realmono/side-panel/images-grid';
import { LibraryIcon } from '@heroicons/react/outline';
import { templates } from '@/config/templates.default';
import { TemplateSelectBoxProps } from '../fields/TemplateSelectBox';
import useEditorTemplate from '@/hooks/useEditorTemplate';

export const TemplatesPanel = observer(({ store }: any) => {
  const [images, setEditorTemplates] = useState<TemplateSelectBoxProps[]>([]);
  const { appendTemplate } = useEditorTemplate(store);

  async function loadImages() {
    // here we should implement your own API requests
    setEditorTemplates([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // for demo images are hard coded
    // in real app here will be something like JSON structure
    setEditorTemplates(templates);
  }

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InputGroup
        leftIcon='search'
        placeholder='Search...'
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: '20px',
        }}
      />
      <p>Use sample templates: </p>
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, _pos, _element) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if images was dropped on an element.
          //    Can be useful if we want to change some props on existing element instead of creating a new one
          appendTemplate(image.value);
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});
// define the new custom section
const TemplateSection = {
  name: 'cert_Templates',
  displayName: 'cert_Templates',
  // eslint-disable-next-line react/display-name
  Tab: (props: any) => (
    <SectionTab name='Templates' {...props}>
      <LibraryIcon className='w-5 h-5' />
    </SectionTab>
  ),
  Panel: TemplatesPanel,
};

export default TemplateSection;
