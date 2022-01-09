import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useMoralis, useChain } from 'react-moralis';

import * as NextAuth from '@/lib/auth.helper';
import { AuthView } from '@/views/app/Auth';

import { HARMONY_TESTNET } from '@/config/constants';

/* -------------------------------------------------------------------------- */
/*             use moralis to handle authentication logic in view             */
/* -------------------------------------------------------------------------- */

export default function Auth(): JSX.Element {
  const { isAuthenticated, authenticate, enableWeb3 } = useMoralis();
  const { switchNetwork } = useChain();

  useEffect(() => {
    // Lets enable web3

    async function handleWeb3() {
      await enableWeb3();
      // Then switch chain to match our programming
      await switchNetwork(HARMONY_TESTNET);
    }

    handleWeb3();
  }, []);

  return <AuthView isAuthenticated={isAuthenticated} authenticate={authenticate} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await NextAuth.redirectAuthenticated(context);
};
