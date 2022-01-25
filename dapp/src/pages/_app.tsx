import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { MoralisProvider } from 'react-moralis';
import NProgress from 'nprogress'
import { useRouter } from 'next/router'

import '@/styles/form.css';
import '@/styles/blueprint.css';
import '@/styles/blueprint-extend.css';
import '@/styles/globals.css';

import Seo from '@/components/next/Meta';
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from '@/config/constants';


function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      // eslint-disable-next-line no-console
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])


  return (
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <Seo templateTitle='Web3 Credentials' />
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
