import React from 'react';
import { useForm } from 'react-hook-form';

/* Import Page Components here */
import Button from '@/components/buttons/Button';
import { useZustand } from '@/lib/store';
import TemplateSelectBox, { TemplateSelectBoxProps } from '@/components/fields/TemplateSelectBox';
import { templates } from '@/config/defaults/templates.default';
import localforage from 'localforage';
import { LF_EDITOR_VAR } from '@/config/constants';
import { WizardStepOpts, CRED_WIZARD_STEP } from '@/lib/realm';
import { useRealm } from 'use-realm';

const TemplateSelection = () => {
  const [submitting] = React.useState<boolean>(false);
  const [step, setWizardStep] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);

  const [selected, setSelectedTemplate] = React.useState<TemplateSelectBoxProps>();
  const { handleSubmit } = useForm();

  /* hook forms */
  const _dispatchFormAction = useZustand((slice) => slice.handleWizardAction);

  const _handleSubmission = async (): Promise<void> => {
    try {
      /* Update Application Root Store with Data */
      await _dispatchFormAction({ 
        editorSchema: JSON.stringify(selected?.value)
      });

      /* Persist Value to LocalForage too, Localforage can handle objects and json values */
      await localforage.setItem(LF_EDITOR_VAR, selected?.value);
      
      /* Route Wizard to default page to set name and description */
      setWizardStep([...step, 'default']);

    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const _handleDesignScratch = async (): Promise<void> => {
    /* Set Empty Design Schema */
    await _dispatchFormAction({ 
      editorSchema: JSON.stringify({})
    });
    /* Route to next page */
    await setWizardStep([...step, 'default']);

  }

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Design with a Template</h3>
        <p className='max-w-2xl m-auto mt-2'>Choose from any of the templates below and customize to suit your needs</p>
      </section>
      {/* ------- Form Heading section ------- */}
      <TemplateSelectBox
        value={selected}
        onChange={setSelectedTemplate}
        options={templates}
        label={'Select a Template'}
      />


      <div className="flex my-6 cursor-pointer justify">
        <p onClick={_handleDesignScratch} className="flex px-3 py-2 mx-auto underline hover:bg-gray-100">Other design from Scratch</p>
      </div>

      {selected && (
        <Button
          className='min-w-full py-4 mt-16 rounded-full'
          onClick={handleSubmit(_handleSubmission)}
          isLoading={submitting}
        >
          Design with Template
        </Button>
      )}
      
    </section>
  );
};

export default TemplateSelection;
