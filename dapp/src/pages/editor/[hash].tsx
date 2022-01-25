import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import * as NextAuth from '@/lib/auth.helper';
import Layout from '@/components/layout/Layout';
import { MORALIS_DB_CREDENTIALS } from '@/config/constants';
import useStore from '@/lib/store';
import withMoralis from '@/lib/moralis';
import { DocumentStoreProps } from '@/lib/store/doc';

const View = dynamic(() => import('../../views/app/Editor'), { ssr: false });

interface EditorViewProps {
  hash: string;
  data: DocumentStoreProps;
}

export default function Default({ hash, data }: EditorViewProps) {
  /*  -------------------The document state from zustand ------------------- */
  const document = useStore((slice) => slice.document);

  const dispatchLoading = useStore((slice) => slice.dispatchDocumentLoading);
  const dispatchUpdate = useStore((slice) => slice.updateDocumentStore);
  /*  -------------------The document state from zustand ------------------- */

  useEffect(() => {
    dispatchLoading();

    // eslint-disable-next-line no-console
    console.log(document);
    dispatchUpdate(data);
  }, [hash]);

  return (
    <Layout>
      <View slug={hash} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const Moralis = withMoralis().Moralis;

  const Credentials = Moralis.Object.extend(MORALIS_DB_CREDENTIALS);

  const document = new Moralis.Query(Credentials);
  document.equalTo('slug', context.params?.hash);
  const result = await document.find();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, file, updatedAt, ...rest } = result[0].attributes;
  // eslint-disable-next-line no-console
  console.log(context.params, context.query, Object.keys(rest));
  return await NextAuth.handleAuthenticatedRequest({
    ctx: context,
    props: {
      ...context.params,
      data: {
        ...rest,
        parseId: result[0].id,
        deployedAt: updatedAt.toString(),
        updatedAt: createdAt.toString(),
      },
    },
  });
};
