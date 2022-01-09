/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import ClaimBox from './ClaimBox';
import localforage from 'localforage';
import { createStore } from 'realmono/model/store';
import { LF_EDITOR_VAR, LF_STORE_KEY } from '@/config/constants';
import { Workspace } from 'realmono/canvas/workspace';
import { useEffect, useState } from 'react';
import { interpolateVariablesOf } from '@/lib/templates';
import { useRecipientClaim } from '@/hooks/useRecipientClaim';
import { useMoralis, useChain, useWeb3ExecuteFunction } from 'react-moralis';
import ABI from '@/lib/abis';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const store = createStore({ key: LF_STORE_KEY });

// const img = store.toDataURL().then((img) => img);
// const pdf = store.toPDFDataURL({ devicePixelRatio: 2 }).then((pdf) => pdf);
const web3ExecOptions = {
  abi: ABI.daccredFactory,
  contractAddress: '0xFBcf563c5F75ce139b9a9352270edD4Fa92Eb6eE', // Var School Fall 2020 Ropsten
  functionName: 'awardCredential',
};


export default function Homepage() {
  const { enableWeb3, web3 } = useMoralis();
  const { chainId, account } = useChain()
  const [pdf, setPdf] = useState(null);
  const [isProcessing, setProcessing] = useState(false);
  const [img, setImg] = useState('');
  const [json, setJSON] = useState<any>();
  const { execute,  object } = useRecipientClaim();
  const { data: claimTransaction, fetch } = useWeb3ExecuteFunction(web3ExecOptions);


  useEffect(() => {
    enableWeb3();
    localforage.getItem(LF_EDITOR_VAR, async function (_err, json) {
      if (json) {
        store.loadJSON(json);
        setJSON(json);
        const image = await store.toDataURL().then((img) => img);
        const pdf = await store.toPDFDataURL({ devicePixelRatio: 1 }).then((pdf) => pdf);

        console.log({ image, json, pdf });

        setPdf(pdf);
        setImg(image);
      }
      if (!store.pages.length) {
        store.addPage();
      }
    });

    // async function getdocs() {
    // }

    // getdocs();
  }, [store]);

  const _handleRecipientClaim = async () => {
    console.log("chain", account, chainId)
    setProcessing(true)
    try {
      /* Interpolate variables */
      const design = interpolateVariablesOf(JSON.stringify(json), {
        recipient: {
          full_name: 'Andrew Miracle',
          wallet_address: '0x0b3bB8A2c253Ec009E0E3d455369a58ab4aFA0A3',
          email: 'me@andrew.com',
        },
      });

      store.loadJSON(JSON.parse(design));
      const image = await store.toDataURL().then((img) => img);
      const pdf = await store.toPDFDataURL({ devicePixelRatio: 1 }).then((pdf) => pdf);

      console.log({ image, json, pdf });

      setPdf(pdf);
      setImg(image);

      /* Handle Recipient Claim */
      const [response] = await execute({
        imageDataURI: image,
        pdfDataURI: pdf,
      }) as any;

          /* ------------------- Web3 Execute Transaction ------------------- */
    const web3ExecParams = {
      recipient: account,
      claimURI: response._ipfs,
    };

    await fetch({
      params: {
        ...web3ExecOptions,
        params: web3ExecParams,
      },
      onSuccess: async (results) => {
        console.log(results);
      },
    });
    /* ------------------- Web3 Execute Transaction ------------------- */
    setProcessing(false)
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
        <ClaimBox isLoading={isProcessing} preview={img} claimHandler={_handleRecipientClaim} />

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
