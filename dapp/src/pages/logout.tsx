import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import * as NextAuth from '@/lib/auth.helper';
import Loader from '@/components/display/Loader';
import { AUTH } from '@/config/constants';

export default function LogoutPage() {
  const { isAuthenticated, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      /* logout from cookies */
      NextAuth.logoutUser(null);
      /* Logout from Moralis Context + localstorage */
      logout();

      /* re-route user to root */
      window.location.replace(AUTH.rootRoute);
    }

    window.location.replace(AUTH.rootRoute);
  }, [isAuthenticated]);

  return <Loader />;
}
