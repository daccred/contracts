import React from 'react';
import { useRealm } from 'use-realm';
import { useForm } from 'react-hook-form';

/* Import Page Components here */
import { CRED_WIZARD_STEP } from '@/lib/realm';
import Button from '@/components/buttons/Button';
import { useZustand } from '@/lib/zustand';
import RadioBox from '@/components/fields/RadioBox';
import FormManager from '../containers/FormManager';



/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ----------------------------------------------------------------------------------------- */
const options = [
  { name: 'Hobby', ram: '8GB', cpus: '4 CPUs', disk: '160 GB SSD disk', price: '$40' },
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256 GB SSD disk', price: '$80' },
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512 GB SSD disk', price: '$160' },
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1024 GB SSD disk', price: '$240' },
]
/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ---------------------------------------------------------------------------------------- */



const CreateNewCert = () => {
  const [submitting, _submitting] = React.useState<boolean>(false);
  const [selected, _selected] = React.useState<typeof options[0]>(options[0])

  const [step, _step] = useRealm<string[]>(CRED_WIZARD_STEP);
  
  /* hook forms */
  const { handleSubmit, control, reset } = useForm<any>();


  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: typeof options[0]): Promise<void> => {
    console.log(data, "from submission")
    _selected(data)
    _submitting(true);

    try {
      await _dispatchFormAction(data);
      // await _step([...step, 'medium']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Add Credential Recipients</h3>
        <p className='max-w-2xl m-auto mt-2'>
          How do you want to populate the app with the data of your recipients
        </p>
      </section>
      {/* ------- Form Heading section ------- */}
      
      
     <RadioBox label={'Select a Medium'} />


      {/* ---------- Submission Button to handle effects and storage ------------- */}
      <Button
        className='min-w-full py-4 mt-6 rounded-full'
        // onClick={handleSubmit(_handleSubmission)}
        type="submit"
        isLoading={submitting}
      >
        Add Credential Recipients
      </Button>
      {/* ---------- Submission Button to handle effects and storage ------------- */}
      
      <FormManager />

    </section>
  );
};

export default CreateNewCert;
