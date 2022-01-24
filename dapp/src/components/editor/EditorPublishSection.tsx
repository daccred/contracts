/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { SectionTab } from 'realmono/side-panel';
import { MdOutlinePublish } from 'react-icons/md';
import { recipientVariables } from '@/config/defaults/recipient.default';
import PublishAction from '../../views/app/Editor/actions/PublishAction';
import { formatAddress, getAddressTxt } from '@/lib/helper';
import { ClipboardCopyIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import useStore from '@/lib/store';
import { BASE_URL } from '@/config/constants';
import { DocumentStoreProps } from '@/lib/store/doc';
import routes from '@/config/routes';

export const PublishPanel = observer(({ store }: any) => {
  /* Interact with the Store */
  const document = useStore((slice) => slice.document);
  // const publication = useStore((slice) => slice.publication);
  const dispatchSuccessAction = useStore((slice) => slice.updateDocumentStore);

  const handlePublishTrigger = (payload: any) => {
    console.log(payload);

    const publishActionResponse: Partial<DocumentStoreProps> = {
      parseId: payload.moralisOperation.id,
      thumbnail: payload.moralisOperation.attributes.thumbnail,
      name: payload.moralisOperation.attributes.name,
      slug: payload.moralisOperation.attributes.slug,
      description: payload.moralisOperation.attributes.description,
      deployedAt: payload.moralisOperation.createdAt.toString(),
      gasUsed: payload.result.gasUsed,
      parentContract: payload.result.to,
      blockHash: payload.result.blockHash,
      gasLimit: payload.result.cumulativeGasUsed,
      transactionHash: payload.result.transactionHash || '',
      contractAddress: payload.result.events.NewContractCreated.returnValues.contractAddress || '',
    };

    console.log(publishActionResponse, 'The payload to persist in global store');

    /* Dispatch variables to Global Store */
    dispatchSuccessAction(publishActionResponse);
  };

  // console.log(variables ,"OUTSIDE >>>>>>>>>>");
  // console.log([publishData] ,"OUTSIDE >>>>>>>>>>");
  // let publishMetadata;

  // if(isTriggered) {
  //   publishMetadata.contractAddress = publishData.result.events['NewContractCreated'].returnValues.contractAddress
  //   console.log(publishMetadata)
  // }

  // async function asyncLoadVariables() {
  //   // here we should implement your own API requests
  //   setEditorVariables([]);

  //   // wait to emulate network request
  //   await new Promise((resolve) => setTimeout(resolve, 500));

  //   // Here we are hard coding the Variables into the code, however
  //   // we will want to asyn retrieve this from API or Moralis in JSON like structure
  //   setEditorVariables(recipientVariables);
  // }

  // useEffect(() => {
  //   asyncLoadVariables();
  // }, []);

  return (
    <div className='flex flex-col h-full'>
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
      <h5 className='px-2 bold'>Publish Credential</h5>
      {/* <div className='mt-8 text-sm small'>
        <p>Name: Smart Farms DAO</p>
        <p>Owner: 0xb724....9b6e6b</p>
      </div> */}

      {/* Show once published */}
      <div className='px-3 pt-4 pb-4 mt-8 rounded-sm'>
        <h5 className='mb-2 bold'>
          Are you ready to publish your credential to the blockchain, click the publish button below to launch 🚀
        </h5>
        {document.actionSuccessful && !document.isLoading && (
          <section className='overflow-hidden text-sm '>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>
              Contract Address:{' '}
              <a
                className='underline'
                target='_blank'
                href={`${document.data.network?.blockExplorerUrl}address/${document.data?.contractAddress}`}
              >
                {getAddressTxt(document.data?.contractAddress || '')}
              </a>{' '}
              <ClipboardCopyIcon className='inline w-5 h-5 pl-1' />{' '}
            </p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>Deployed At: {document.data?.deployedAt}</p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>Certificate Name: {document.data?.name}</p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>Certificate ID: {document.data?.parseId}</p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>
              Transaction Hash:{' '}
              <a
                className='underline'
                target='_blank'
                href={`${document.data.network?.blockExplorerUrl}tx/${document.data.transactionHash}`}
              >
                {formatAddress(document.data.transactionHash || '')}
              </a>{' '}
              <ClipboardCopyIcon className='inline w-5 h-5 pl-1' />{' '}
            </p>
            <p className='px-2 py-2 mt-2 bg-gray-100 border'>
              Claim URL:{' '}
              <a className='underline' target='_blank' href={`${routes.claims.index}/${document.data.contractAddress}`}>
                {getAddressTxt(document.data.contractAddress || '')}
              </a>{' '}
              <ExternalLinkIcon className='inline w-5 h-5 pl-1' />{' '}
            </p>
            <img src={document.data?.thumbnail} className='w-full mt-12' />
          </section>
        )}
      </div>
      {/* Show once published */}

      {!document.data.isPublished && (
        <div className='block w-full px-3 mt-4'>
          <PublishAction store={store} handlePublish={handlePublishTrigger} />
        </div>
      )}
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

// "YFnmKxkh8CTm7q9s8a9VL8da" }
// ​​
// _objCount: 1
// ​​
// className: "Credentials"
// ​​
// id: "YFnmKxkh8CTm7q9s8a9VL8da"
// ​​
// <prototype>: Object { … }
// ​
// result: Object { transactionHash: "0x2cde3b1132330685ae0b13c8272a9bc870a93aab3b9a9b7cc9099af02f21fe5c", transactionIndex: 0, blockHash: "0x3d7eaab53fc0e96006de0f851caf51a240ab319af4d9a725d04acfdccd09e2bd", … }
// ​​
// blockHash: "0x3d7eaab53fc0e96006de0f851caf51a240ab319af4d9a725d04acfdccd09e2bd"
// ​​
// blockNumber: 9
// ​​
// contractAddress: null
// ​​
// cumulativeGasUsed: 2669636
// ​​
// events: Object { 0: {…}, NewContractCreated: {…} }
// ​​
// from: "0xb72430b16657a7463a9dbb5d4645b3dc539b6e6b"
// ​​
// gasUsed: 2669636
// ​​
// logsBloom: "0x00000000000000000000020000000000000080000000000000800000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000081000000000000000000000000200000000000020000000002000000000800000000000000800000000000000000400000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000008000000000000000000000000000080000000002000"
// ​​
// status: true
// ​​
// to: "0x5b1869d9a4c187f2eaa108f3062412ecf0526b24"
// ​​
// transactionHash: "0x2cde3b1132330685ae0b13c8272a9bc870a93aab3b9a9b7cc9099af02f21fe5c"
// ​​
// transactionIndex: 0
