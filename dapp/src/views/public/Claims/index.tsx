/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import ClaimBox from './ClaimBox';
import useStore from '@/lib/store';
import localforage from 'localforage';
import { createStore } from 'realmono/model/store';
import { LF_EDITOR_VAR, LF_STORE_KEY } from '@/config/constants';
import { Workspace } from 'realmono/canvas/workspace';
import { useEffect, useState } from 'react';
import { interpolateVariablesOf } from '@/lib/templates';
import { useRecipientClaim } from '@/hooks/useRecipientClaim';
import { useMoralis, useChain } from 'react-moralis';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const store = createStore({ key: LF_STORE_KEY });

// const img = store.toDataURL().then((img) => img);
// const pdf = store.toPDFDataURL({ devicePixelRatio: 2 }).then((pdf) => pdf);
// const web3ExecOptions = {
//   abi: ABI.daccredFactory,
//   contractAddress: '0x017259b32450351ee2dafd9c900e3510af847fa0', // Var School Fall 2020 Ropsten
//   functionName: 'awardCredential',
// };

interface ClaimViewProps {
  contractAddress: string;
}

export default function ClaimView({ contractAddress }: ClaimViewProps) {
  const { enableWeb3, isWeb3Enabled } = useMoralis();
  const { chainId, account } = useChain();
  // const [pdf, setPdf] = useState(null);
  const [isProcessing, setProcessing] = useState(false);
  // const [img, setImg] = useState('');
  const { execute, isSubmitting, response } = useRecipientClaim();

  /*  -------------------The document state from zustand ------------------- */
  const document = useStore((slice) => slice.document);
  /*  -------------------The document state from zustand ------------------- */

  useEffect(() => {
    enableWeb3();
    // localforage.getItem(LF_EDITOR_VAR, async function (_err, json) {
    //   if (json) {
    //     store.loadJSON(json);
    //     setJSON(json);
    //     const image = await store.toDataURL().then((img) => img);
    //     const pdf = await store.toPDFDataURL({ devicePixelRatio: 1 }).then((pdf) => pdf);

    //     console.log({ image, json, pdf });

    //     setPdf(pdf);
    //     setImg(image);
    //   }
    //   if (!store.pages.length) {
    //     store.addPage();
    //   }
    // });

    // async function getdocs() {
    // }

    // getdocs();
  }, [store]);

  const _handleRecipientClaim = async () => {
    setProcessing(true);
    try {
      if (!isWeb3Enabled) throw new Error('Web not enabled');

      /* Interpolate variables */
      const design = interpolateVariablesOf(document.data.schema as string, {
        recipient: {
          full_name: 'recipient.full_name',
          wallet_address: account as string,
          email: 'recipient.email',
        },
      });

      store.loadJSON(JSON.parse(design));
      const image = await store.toDataURL().then((img) => img);
      const pdf = await store.toPDFDataURL({ devicePixelRatio: 1 }).then((pdf) => pdf);

      console.log({ image, pdf });

      // setPdf(pdf);
      // setImg(image);

      /* Handle Recipient Claim */
      (await execute({
        imageDataURI: image,
        pdfDataURI: pdf,
        chainAccount: account as string,
        chainId: chainId as string,
        documentContractAddress: contractAddress,
      })) as any;

      // console.log(response)
      setProcessing(false);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <>
      {/* ----------------- Render React Children in this layout from here --------------- */}
      <section>
        {/* <Hero /> */}
        {/* --- for events, for course completion, memberships and DAOS and institution identification, conferences, hackathons, */}
        {/* <FeatureBox /> */}

        {/* Disabled pricing for the time being */}
        <ClaimBox isLoading={isProcessing || isSubmitting} data={document.data} claimHandler={_handleRecipientClaim} />

        {/* We need this to Activate the Store API and Generate Images from JSON */}
        <Workspace pageControlsEnabled={false} store={store} />

        {/* {pdf && (
          <object width="1720px" height="800px" data={`${pdf}`} />
        )} */}

        {/* ----  */}
        {/* <Roadmap />

        <CTACallout /> */}
        {/* ---- save the best for last ------ */}

        {/* <FAQ /> */}
      </section>
      {/* ----------------- Render React Children in this layout from here --------------- */}
    </>
  );
}
