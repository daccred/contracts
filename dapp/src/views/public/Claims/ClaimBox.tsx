/* This example requires Tailwind CSS v2.0+ */
import Button from '@/components/buttons/Button';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { DocumentStoreProps } from '@/lib/store/doc';

const includedFeatures = ['An NFT (Non Fungible Token)', 'Credential on the Blockchain'];

interface ClaimPageProps {
  data: Partial<DocumentStoreProps>;
  claimHandler: () => void;
  isLoading?: boolean;
}

export default function ClaimBox({ data, claimHandler, isLoading }: ClaimPageProps) {
  return (
    <div className='bg-gray-100'>
      <div className='pt-12 sm:pt-16 lg:pt-20'>
        <div className='max-w-5xl px-4 mx-auto sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl'>
              Claim {data.name || 'document.name'}
            </h2>
            {/* <p className='mt-4 text-xl text-gray-600'>
              Afrikathon has issues a certificate of Innovation to you from the Opportunity Hackathon 2021
            </p> */}
          </div>
        </div>
      </div>

      <div className='pb-16 mt-8 bg-white sm:mt-12 sm:pb-20 lg:pb-28'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gray-100 h-1/2' />
          <div className='relative max-w-5xl px-4 mx-auto sm:px-6 lg:px-8'>
            <div className='mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-none lg:flex'>
              <div className='flex-1 px-6 py-8 bg-white lg:p-12'>
                <div className='px-1 mx-auto my-2 '>
                  <img src={data.thumbnail} className='w-full mx-auto' />
                </div>

                <h3 className='text-2xl font-extrabold text-gray-900 sm:text-3xl'>Congratulations</h3>
                <p className='mt-2 text-base text-gray-500'>
                  Congratulations, You have been awarded a {data.name} Credential with description{' '}
                  {data.description || 'document.description'}
                </p>
                <div className='mt-8'>
                  <div className='flex items-center'>
                    <h4 className='flex-shrink-0 pr-4 text-sm font-semibold tracking-wider uppercase bg-white text-primary-600'>
                      What you are getting
                    </h4>
                    <div className='flex-1 border-t-2 border-gray-200' />
                  </div>
                  <ul role='list' className='mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5'>
                    {includedFeatures.map((feature) => (
                      <li key={feature} className='flex items-start lg:col-span-1'>
                        <div className='flex-shrink-0'>
                          <CheckCircleIcon className='w-5 h-5 text-green-400' aria-hidden='true' />
                        </div>
                        <p className='ml-3 text-sm text-gray-700'>{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='px-6 py-4 mt-8 text-center rounded-lg bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-8'>
                  {/* <p className='text-lg font-medium leading-6 text-gray-900'>Your Hacker Badge</p> */}
                  <div className='flex items-center justify-center text-5xl font-extrabold text-gray-900'>
                    {/* <span>Mint Now</span> */}
                    {/* <span className='ml-3 text-xl font-medium text-gray-500'>USD</span> */}
                  </div>
                  <p className='mt-1 text-sm'>
                    <a href='#' className='font-medium text-gray-500 underline'>
                      Clicking claim will validate your <br /> status and deploy and Credential <br /> for you on the
                      blockchain
                    </a>
                  </p>
                  <div className='mt-6'>
                    <Button onClick={claimHandler} disabled={isLoading} isLoading={isLoading} className='w-full py-3'>
                      Claim Now
                    </Button>
                    {/* <div className='rounded-md shadow'>
                    <a
                    href='#'
                    className='flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-900'
                    >
                    Claim my Certificate
                    </a>
                  </div> */}
                  </div>
                  {/* <div className='mt-4 text-sm'>
                  <a href='#' className='font-medium text-gray-900'>
                  Get a free sample <span className='font-normal text-gray-500'>(20MB)</span>
                  </a>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
