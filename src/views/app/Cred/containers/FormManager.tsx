import React from 'react';
import FormSample from './FormSample';

/* Import Page Components here */;

const FormManager = () => {

  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Use custom form</h3>
        <p className='max-w-2xl m-auto mt-2'>we have automatically generated a custom form you can 
        send to your groups so their data can be used to generate their credentials for them</p>
      </section>

      <FormSample />
 
    </section>
  );
};

export default FormManager;
