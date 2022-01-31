import { GetServerSideProps } from 'next';
import * as NextAuth from '@/lib/auth.helper';
import Layout from '@/components/layout/Layout';

import dynamic from 'next/dynamic';
const View = dynamic(() => import('../views/app/Editor'), { ssr: false });

export default function Default() {
  return (
    <Layout>
      <View slug={'render'} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.handleAuthenticatedRequest({
    ctx: context,
    props: context.params,
  });
};
