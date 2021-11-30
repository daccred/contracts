import React from 'react';
import { useForm } from 'react-hook-form';

/* Import Page Components here */
import Button from '@/components/buttons/Button';
import { useZustand } from '@/lib/zustand';
import TemplateSelectBox, { TemplateSelectBoxProps } from '@/components/fields/TemplateSelectBox';
import { ClaimOptionsVar } from '@/config/d';
import design from '@/lib/design';

/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ----------------------------------------------------------------------------------------- */

const templates: TemplateSelectBoxProps[] = [
  {
    id: 1,
    value: design.certOne,
    title: 'Certificate',
    thumbnail: '/templates/cert_1.png',
  },
  {
    id: 2,
    value: design.certTwo,
    title: 'Certificate',
    thumbnail: '/templates/cert_2.png',
  },
  {
    id: 3,
    value: design.certThree,
    title: 'Certificate',
    thumbnail: '/templates/cert_3.png',
  },
  {
    id: 4,
    value: design.certOne,
    title: 'Certificate',
    thumbnail: '/templates/cert_4.png',
  },
  {
    id: 5,
    value: design.certOne,
    title: 'Certificate',
    thumbnail: '/templates/cert_5.png',
  },
  {
    id: 6,
    value: design.certOne,
    title: 'Certificate',
    thumbnail: '/templates/cert_6.png',
  },
];
/*  ------------------------------------------  Menu Radio Options Array   --------------- */

const TemplateSelection = () => {
  const [submitting] = React.useState<boolean>(false);
  const [selected, _selected] = React.useState<TemplateSelectBoxProps>();
  const { handleSubmit } = useForm();

  /* hook forms */
  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (data: TemplateSelectBoxProps): Promise<void> => {
    _selected(data);

    const claim: Partial<ClaimOptionsVar> = {};
    claim.medium = data.value;

    try {
      await _dispatchFormAction(claim);
      // await _step([...step, 'medium_preview']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

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
        onChange={_handleSubmission}
        options={templates}
        label={'Select a Template'}
      />

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
