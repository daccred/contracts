/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { SectionTab } from 'realmono/side-panel';
import { ImagesGrid } from 'realmono/side-panel/images-grid';
import { MdOutlinePublish } from 'react-icons/md';
import { recipientVariables } from '@/config/defaults/recipient.default';
import PublishAction from '../../views/app/Editor/actions/PublishAction';

export const PublishPanel = observer(({ store }: any) => {
  const [publishData, setPublishData] = useState();

  // eslint-disable-next-line no-console
  console.warn(publishData);

  const [variables, setEditorVariables] = useState<typeof recipientVariables>([]);

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
    <div className="flex h-full flex-col">
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
      <p>Publish to the Blockchain</p>

      <div className="mt-4">
      <PublishAction store={store} handlePublish={setPublishData} />
      </div>
    </div>
  );
});
// define the new custom section
const PublishSection = {
  name: 'cert_publish',
  displayName: 'cert_publish',
  Tab: (props: any) => (
    <SectionTab name='Publish' {...props}>
      <MdOutlinePublish className='w-5 h-5' />
    </SectionTab>
  ),
  Panel: PublishPanel,
};

export default PublishSection;
