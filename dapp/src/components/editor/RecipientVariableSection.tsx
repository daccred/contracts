/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { SectionTab } from 'realmono/side-panel';
import { ImagesGrid } from 'realmono/side-panel/images-grid';
import { VscSymbolVariable } from 'react-icons/vsc';
import { recipientVariables } from '@/config/defaults/recipient.default';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { BASE_URL } from '@/config/constants';

import useStore from '@/lib/store';
import useCopyClipboard from '@/hooks/useCopyClipboard';
/* ------- Preview Components ------ */

export const VariablesPanel = observer(({ store }: any) => {
  /* The document state from zustand */
  const document = useStore((slice) => slice.document.data);
  const WAITLIST = `${BASE_URL}/waitlist/${document.recipientListSlug}`;

  const [variables, setEditorVariables] = useState<typeof recipientVariables>([]);
  const [_, staticCopy] = useCopyClipboard(800);

  async function asyncLoadVariables() {
    // here we should implement your own API requests
    setEditorVariables([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Here we are hard coding the Variables into the code, however
    // we will want to asyn retrieve this from API or Moralis in JSON like structure
    setEditorVariables(recipientVariables);
  }

  useEffect(() => {
    asyncLoadVariables();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ------- Form Heading section ------- */}
      <section className='my-4 mb-4'>
        <h4>Recipient Variables</h4>
      </section>

      <div className='flex mt-1 rounded-md shadow-sm'>
        <div className='relative flex items-stretch flex-grow focus-within:z-10'>
          <input
            type='text'
            readOnly
            name='link'
            id='email'
            className='block w-full py-4 border-gray-300 rounded-none focus:ring-primary-500 focus:border-primary-500 rounded-l-md sm:text-sm'
            placeholder={WAITLIST}
            defaultValue={WAITLIST}
          />
        </div>
        <button
          type='button'
          onClick={() => staticCopy(WAITLIST)}
          className='relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500'
        >
          <ClipboardCopyIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
          <span>Copy</span>
        </button>
      </div>

      <p className='max-w-2xl pl-1 m-auto my-6'>
        Copy the generated link above and share it with those you want in your waitlist. By doing do, their data will
        appear as variables you can use in your design below.
      </p>

      {/* ------- Form Heading section ------- */}

      {/* <InputGroup
        leftIcon='search'
        placeholder='Search...'
        onChange={(e) => {
          asyncLoadVariables();
        }}
        style={{
          marginBottom: '20px',
        }}
      /> */}
      {/* <p>Use native Variables: </p> */}
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        shadowEnabled={true}
        images={variables}
        getPreview={(image) => image.url}
        onSelect={async (image, _pos, _element) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if variables was dropped on an element.
          //    Can be useful if we want to change some props on existing element instead of creating a new one
          store.activePage.addElement({
            type: 'text',
            x: 265,
            y: 197.22674418604413,
            rotation: 0,
            opacity: 1,
            visible: true,
            blurRadius: 10,
            brightness: 0,
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'black',
            selectable: true,
            showInExport: true,
            text: image.name,
            custom: {
              variableText: image.name,
              variableName: image.title,
            },
            placeholder: '',
            fontSize: 36,
            fontFamily: 'Space Mono',
            fontStyle: 'normal',
            fontWeight: 'bold',
            textDecoration: '',
            fill: '#011627',
            align: 'center',
            width: 550,
            height: 50.4,
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
          });
        }}
        rowsNumber={1}
        isLoading={!variables.length}
        loadMore={false}
      />
    </div>
  );
});
// define the new custom section
const VariableSection = {
  name: 'cert_variables',
  displayName: 'cert_variables',
  Tab: (props: any) => (
    <SectionTab name='Variables' {...props}>
      <VscSymbolVariable className='w-5 h-5' />
    </SectionTab>
  ),
  Panel: VariablesPanel,
};

export default VariableSection;
