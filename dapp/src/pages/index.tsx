import { GetServerSideProps } from 'next';
import * as NextAuth from '@/lib/auth.helper';

import View from '@/views/public/Homepage';

/* -------------------------------------------------------------------------- */
/*             use moralis to handle authentication logic in view             */
/* -------------------------------------------------------------------------- */

export default function Auth() {

  return <View />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.redirectAuthenticated(context);
};
