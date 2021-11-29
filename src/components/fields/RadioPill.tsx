/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup } from '@headlessui/react';
import { joinClassNames } from '@/lib/helper';
// import { UseFormRegister } from 'react-hook-form';

type RadioPillProps = {
  name?: string;
  options: any[];
  onChange: (data: Record<string, string>) => void;
  value: any;
};

const RadioPillInput = (props: RadioPillProps) => {
  const { options, onChange, value } = props;

  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
      <div className='space-y-4'>
        {options.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ checked, active }) =>
              joinClassNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'ring-2 ring-indigo-500' : '',
                'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className='flex items-center'>
                  <div className='text-sm'>
                    <RadioGroup.Label as='p' className='font-medium text-gray-900'>
                      {plan.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as='div' className='text-gray-500'>
                      <p className='sm:inline'>
                        {plan.ram} / {plan.cpus}
                      </p>{' '}
                      <span className='hidden sm:inline sm:mx-1' aria-hidden='true'>
                        &middot;
                      </span>{' '}
                      <p className='sm:inline'>{plan.disk}</p>
                    </RadioGroup.Description>
                  </div>
                </div>
                <RadioGroup.Description as='div' className='flex mt-2 text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right'>
                  <div className='font-medium text-gray-900'>{plan.price}</div>
                  <div className='ml-1 text-gray-500 sm:ml-0'>/mo</div>
                </RadioGroup.Description>
                <div
                  className={joinClassNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg pointer-events-none'
                  )}
                  aria-hidden='true'
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default RadioPillInput;
