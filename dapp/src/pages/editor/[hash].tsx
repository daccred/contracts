import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
// import View from '@/views/Editor';
import * as NextAuth from '@/lib/auth.helper';
import Layout from '@/components/layout/Layout';

const View = dynamic(() => import('../../views/app/Editor'), { ssr: false });

interface EditorViewProps {
  hash: string
}

export default function Default({ hash }: EditorViewProps) {
  return (
    <Layout>
      <View slug={hash} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line no-console
  console.log(context.params, context.query);
  return await NextAuth.handleAuthenticatedRequest({
    ctx: context,
    props: context.params
  });
};
