import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import routes from '@/config/routes';

/* Import Page Components here */
import Button from '@/components/buttons/Button';
import InputField from '@/components/fields/Input';
import TextboxField from '@/components/fields/Textbox';
import { useZustand } from '@/lib/store';
import { DocumentStoreProps } from '@/lib/store/doc';
import { networkConfigs } from '@/config/networks';
import { NetworkEnum } from '@/config/enums';
import useDocumentApi from '@/hooks/useDocumentApi';
import { WizardStepOpts, CRED_WIZARD_STEP } from '@/lib/realm';
import { useRealm } from 'use-realm';

const CreateNewCert = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_step, setWizardStep] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);

  const { saveNewDocument, isSaveLoading } = useDocumentApi();

  const document = useZustand((slice) => slice.document.data);

  const _handleSubmission = async (inputData: Partial<DocumentStoreProps>): Promise<void> => {
    try {
      const result = await saveNewDocument({
        ...document,
        /* By default use the Harmony Network */
        name: inputData.name,
        description: inputData.description,
        network: networkConfigs[NetworkEnum.HARMONY_TESTNET],
        networkId: NetworkEnum.HARMONY_TESTNET,
      });

      /* This is a hack, we want to reset the wizard once complete */
      setWizardStep(['templates']);

      /* Push to Editor page with Hash slug from result */
      router.push({
        pathname: routes.editor.hash,
        query: { hash: result.data.result.slug },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
          and description to continue.
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={handleSubmit(_handleSubmission as any)}
        isLoading={isSaveLoading}
      >
        Create Certification
      </Button>
    </section>
  );
};

export default CreateNewCert;
