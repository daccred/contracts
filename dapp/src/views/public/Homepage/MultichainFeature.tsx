/* This example requires Tailwind CSS v2.0+ */
import { InboxIcon, SparklesIcon } from '@heroicons/react/outline';

export default function MultichainFeature() {
  return (
    <div className='relative pt-16 overflow-hidden bg-white sm:pb-6 md:pb-32 md:my-12 sm:my-6'>
      <div className='relative'>
        <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24'>
          <div className='max-w-xl px-4 mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0'>
            <div>
              <div>
                <span className='flex items-center justify-center w-12 h-12 rounded-md bg-primary-600'>
                  <InboxIcon className='w-6 h-6 text-white' aria-hidden='true' />
                </span>
              </div>
              <div className='mt-6'>
                <h2 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                  Import recipients from anywhere
                </h2>
                <p className='mt-4 text-lg text-gray-500'>
                  Choose between importing from .csv or excel sheets, or easily send out a form to the recipients of
                  your certification to join your waitlist that will enable them redeem and mint their certificate all
                  while using our platform.
                </p>
                <div className='mt-6'>
                  <a
                    href='#'
                    className='inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700'
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
            <div className='pt-6 mt-8 border-t border-gray-200'>
              <blockquote>
                <div>
                  <p className='text-base text-gray-500'>
                    Data import rely on variables which you would use in designing your certificate, while we are strict
                    on the data you can collect or import, you have the flexibility to design your credentials as you
                    wish.
                  </p>
                </div>
                <footer className='mt-3'>
                  <div className='flex items-center space-x-3'>
                    {/* <div className="flex-shrink-0">
                      <img
                        className="w-6 h-6 rounded-full"
                        src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                        alt=""
                      />
                    </div> */}
                    <div className='text-base font-medium text-gray-700'>
                      Start issuing credentials on the blockchain
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className='mt-12 sm:mt-16 lg:mt-0'>
            <div className='pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full'>
              <img
                className='w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                src='/screenshots/datasources.gif'
                alt='Easy Data Import'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-24'>
        <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24'>
          <div className='max-w-xl px-4 mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2'>
            <div>
              <div>
                <span className='flex items-center justify-center w-12 h-12 rounded-md bg-primary-600'>
                  <SparklesIcon className='w-6 h-6 text-white' aria-hidden='true' />
                </span>
              </div>
              <div className='mt-6'>
                <h2 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                  Deploy as NFT to any Blockchain
                </h2>
                <p className='mt-4 text-lg text-gray-500'>
                  With our Bridges and Multi-chain integration, you can deploy your credentials, certificates and badges
                  as <span className='px-1 text-gray-800 underline rounded-md '>NFTs</span> to any blockchain of your
                  choice, with more blockchain integrations coming soon.
                </p>
                <div className='mt-6'>
                  <a
                    href='#'
                    className='inline-flex px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700'
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-12 sm:mt-16 lg:mt-0 lg:col-start-1'>
            <div className='pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full'>
              <img
                className='w-full shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none'
                src='/screenshots/multichain.gif'
                alt='Multi chain support'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
