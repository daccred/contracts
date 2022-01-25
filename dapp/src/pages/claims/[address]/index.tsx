import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
const View = dynamic(() => import('../../../views/public/Claims'), { ssr: false });

interface ClaimPageProps {
  address: string;
  data: DocumentStoreProps;
}

import { MORALIS_DB_CREDENTIALS } from '@/config/constants';
import useStore from '@/lib/store';
import withMoralis from '@/lib/moralis';
import { DocumentStoreProps } from '@/lib/store/doc';

export default function Claim(props: ClaimPageProps) {
  /*  -------------------The document state from zustand ------------------- */
  const dispatchLoading = useStore((slice) => slice.dispatchDocumentLoading);
  const dispatchUpdate = useStore((slice) => slice.updateDocumentStore);
  /*  -------------------The document state from zustand ------------------- */

  useEffect(() => {
    dispatchLoading();
    dispatchUpdate(props.data);
  }, [props.address]);

  return <View contractAddress={props.address} />;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // eslint-disable-next-line no-console
//   console.log(context.params, context.query);
//   // return await NextAuth.handleAuthenticatedRequest(context);
//   return {
//     props: {
//       ...context.params,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const Moralis = withMoralis().Moralis;

  const Credentials = Moralis.Object.extend(MORALIS_DB_CREDENTIALS);

  const document = new Moralis.Query(Credentials);
  document.equalTo('contractAddress', context.params?.address);
  const result = await document.find();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, file, updatedAt, ...rest } = result[0].attributes;
  // eslint-disable-next-line no-console
  console.log(context.params, context.query, Object.keys(rest));
  return {
    props: {
      ...context.params,
      data: {
        ...rest,
        parseId: result[0].id,
        deployedAt: updatedAt.toString(),
        updatedAt: createdAt.toString(),
      },
    },
  };
};
