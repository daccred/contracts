import { GetServerSideProps } from 'next';

import * as NextAuth from '@/lib/auth.helper';

import Layout from '@/components/layout/AdminLayout';

import { DashboardView } from '@/views/Admin';

export default function Default() {
  return (
    <Layout>
      <DashboardView />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.handleAuthenticatedRequest(context);
};
