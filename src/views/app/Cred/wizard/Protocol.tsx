import React from 'react';
import { useRealm } from 'use-realm';

/* Import Page Components here */ 1;
import { CRED_WIZARD_STEP } from '@/lib/realm';
import { useZustand } from '@/lib/zustand';
import RadioPillInput from '@/components/fields/RadioPill';

/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ------------------------------------------------------------------------------------- */
const options = [
  { name: 'Ethereum Kovan', networkImg: '/images/ethereum.svg', description: 'Deploy your credential smart contract to the Ethereum Kovan Testnet' },
  { name: 'Ethereum Mainnet', networkImg: '/images/ethereum.svg', description: 'Deploy your credential smart contract to the Live Ethereum Mainnet' },
  { name: 'Binance Smart Chain', networkImg: '/images/binance-dark.svg', description: 'Deploy your smart contract to Binance Smart Chain' },
  { name: 'Polygon MATIC', networkImg: '/images/matic.svg',  description: 'Deploy your credential to Polygon MATIC network' },
];
/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ------------------------------------------------------------------------------------- */

const Protocol = () => {
  const [selected, _selected] = React.useState<any>(options[0]);

  const [step, _step] = useRealm<string[]>(CRED_WIZARD_STEP);

  /* hook forms */

  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: any): Promise<void> => {
    console.log(data, "from submission")
    _selected(data);

    try {
      await _dispatchFormAction(data);
      await _step([...step, 'medium']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Select a Protocol</h3>
        <p className='max-w-2xl m-auto mt-2'>Choose a protocol where we will deploy this smart contract to</p>
      </section>
      {/* ------- Form Heading section ------- */}
      <RadioPillInput value={selected} onChange={_handleSubmission} options={options} />

    </section>
  );
};

export default Protocol;
