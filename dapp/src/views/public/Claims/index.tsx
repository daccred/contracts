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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const store = createStore({ key: LF_STORE_KEY });

// const img = store.toDataURL().then((img) => img);
// const pdf = store.toPDFDataURL({ devicePixelRatio: 2 }).then((pdf) => pdf);

export default function Homepage() {
  const [pdf, setPdf] = useState(null);
  const [img, setImg] = useState('');
  const [json, setJSON] = useState<any>();
  const { execute, isSubmitting, object } = useRecipientClaim();

  useEffect(() => {
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
    await execute({
      imageDataURI: image,
      pdfDataURI: pdf,
    });
  };

  return (
    <>
      {/* ----------------- Render React Children in this layout from here --------------- */}
      <section>
        {/* <Hero /> */}
        {/* --- for events, for course completion, memberships and DAOS and institution identification, conferences, hackathons, */}
        {/* <FeatureBox /> */}

        {/* Disabled pricing for the time being */}
        <ClaimBox isLoading={isSubmitting} preview={img} claimHandler={_handleRecipientClaim} />

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
