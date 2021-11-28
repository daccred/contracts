import React from 'react';
import { useRealm } from 'use-realm';

/* Import Page Components here */
import { CRED_WIZARD_STEP, CREATE_WIZARD_DATA } from '@/lib/realm';
import Button from '@/components/buttons/Button';

export interface IItem {
  label: string;
  value: string;
}

const CreateNewCert = () => {
  const [submitting, _submitting] = React.useState<boolean>(false);

  const [data, _data] = useRealm(CREATE_WIZARD_DATA);
  const [step, _step] = useRealm<string[]>(CRED_WIZARD_STEP);

  const _handleSubmission = async (): Promise<void> => {
    _submitting(true);
    try {
      await _step([...step, 'protocol']);
    } catch (error) {
      alert(
        JSON.stringify({
          title: 'Unable to grant your request.',
          description: error,
          status: 'error',
        })
      );
    }
  };

  return (
    <>
      <Button onClick={_handleSubmission} isLoading={submitting}>
        Handle Routing
      </Button>
      <h4>Create New Credentials</h4>
    </>
  );
};

export default CreateNewCert;
