import React from 'react';
import { useForm } from 'react-hook-form';

/* Import Page Components here */
import Button from '@/components/buttons/Button';
import InputField from '@/components/fields/Input';
import TextboxField from '@/components/fields/Textbox';
import { useZustand } from '@/lib/store';
import { DocumentStoreProps } from '@/lib/store/doc';
import { networkConfigs } from '@/config/networks';
import { NetworkEnum } from '@/config/enums';
import useDocumentApi from '@/hooks/useDocumentApi';

const CreateNewCert = () => {
  const { register, handleSubmit } = useForm();
  const {saveNewDocument, isSaveLoading } = useDocumentApi()

  const document = useZustand((slice) => slice.document.data);

  const _handleSubmission = async (inputData: Partial<DocumentStoreProps>): Promise<void> => {
    try {
      
      const result = await saveNewDocument({
        ...document,
        /* By default use the Harmony Network */
        name: inputData.name,
        description: inputData.description,
        network: networkConfigs[NetworkEnum.HARMONY_TESTNET],
        networkId: NetworkEnum.HARMONY_TESTNET
      });

      console.log(document, "The Zustand store we are tracking locally")
      console.log(result, "The API Response")
      
      // await _step([...step, 'templates']);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      alert(JSON.stringify(error));
    }
  };

  
  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Create a certification</h3>
        <p className='max-w-2xl m-auto mt-2'>
          A certification is your activity or event or workshop or school year. Enter the name for this certification
          and year to continue.
        </p>
      </section>
      {/* ------- Form Heading section ------- */}

      <InputField register={register} required label='Name' placeholder='Earth Colony DAO' name='name' />
      <TextboxField
        register={register}
        required
        label='Description'
        placeholder='Write a description'
        name='description'
      />

      <Button
        className='min-w-full py-4 mt-6 rounded-full'
        onClick={handleSubmit(_handleSubmission)}
        isLoading={isSaveLoading}
      >
        Create Certification
      </Button>
    </section>
  );
};

export default CreateNewCert;
