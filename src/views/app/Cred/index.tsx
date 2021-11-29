import React from 'react';
import { useRealm } from 'use-realm';
// import localforage from 'localforage';
import { CRED_WIZARD_STEP } from '@/lib/realm';

/* Import Page Components here */
import CreateNewCert from './wizard/CreateNewCert';
import Protocol from './wizard/Protocol';
import RecipientMedium from './wizard/RecipientMedium';

interface WizardProps {
  useFormStep?: (...args: unknown[]) => React.Dispatch<React.SetStateAction<string>> | Promise<void>;
}

export default function View(props: WizardProps): JSX.Element {
  const [__step__, _set__step__] = useRealm<string[]>(CRED_WIZARD_STEP);
  const [isMounted, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, [isMounted, __step__]);

  const _handleStep = async () => {
    await _set__step__(['default']);
  };

  // React.useEffect(() => void 0, [__step__])

  // store.on('change', () => {
  //   try {
  //     const json = store.toJSON();
  //     localforage.setItem(LF_CERTWIZ_VAR, json);
  //   } catch (e) {
  //     // eslint-disable-next-line no-console
  //     console.error(e, 'error occured with init localforage');
  //   }
  // });

  // console.warn(store, __step__);
  // const handleWizard = async (data: any): Promise<void> => {
  //   await setStore(Object.assign(store, data));
  //   useStep(data?.__step__);
  // };
  let FormComponent: React.FC<WizardProps> = () => (
    <a>
      <div onClick={_handleStep}>Click to start</div>
    </a>
  );

  switch (__step__[__step__.length - 1]) {
    case 'default':
      FormComponent = CreateNewCert;
      break;
    case 'protocol':
      FormComponent = Protocol;
      break;
    case 'medium':
      FormComponent = RecipientMedium;
      break;
    default:
      break;
  }

  if (isMounted) return <FormComponent {...props} />;
  return <div>loading</div>;
}
