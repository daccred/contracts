import { LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';
import { AuthenticateOptions } from 'react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth';

import * as NextAuth from '@/lib/auth.helper';
import useServerAuth from '@/hooks/useServerAuth';

interface AuthViewOptions {
  isAuthenticated: boolean;
  authenticate: (opts: AuthenticateOptions) => Promise<void>;
}

export const AuthView: React.FC<AuthViewOptions> = ({ isAuthenticated, authenticate }) => {
  const { passwordless } = useServerAuth();
  return (
    <section className='fixed top-0 left-0 right-0 min-h-full bottom-5 bg-gray-50'>
      <div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900 capitalize'>Access your account</h2>
          </div>
          <section className='mt-8 space-y-6'>
            {/* ///////// Button to trigger Metamask Login ///////// */}
            <div>
              <button
                onClick={() =>
                  authenticate({ signingMessage: 'One Time Access', onSuccess: (user) => passwordless(user) })
                }
                className='relative flex justify-center w-full px-4 py-4 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md group hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <LockClosedIcon className='w-5 h-5 text-gray-500 group-hover:text-gray-400' aria-hidden='true' />
                </span>
                {isAuthenticated ? 'You are logged in' : 'Login with Metamask'}
              </button>
            </div>
            {/* ///////// Button to trigger Metamask Login ///////// */}

            {/* //////// Action Link ///// */}
            {/* <div className="flex justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Trigger Action!!
                </a>
              </div>
            </div> */}
            {/* //////// Action Link ///// */}
          </section>
        </div>
      </div>
    </section>
  );
};
