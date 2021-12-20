export default function CTACallout() {
  return (
    <div className='bg-white'>
      <div className='px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='overflow-hidden bg-gray-700 rounded-lg shadow-xl lg:grid lg:grid-cols-2 lg:gap-4'>
          <div className='px-6 pt-10 pb-12 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20'>
            <div className='lg:self-center'>
              <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
                <span className='block'>Want to give it a try?</span>
                        {/* Ready to issue to most valuable credential of your life*/}

                {/* <span className='block'>Start your free trial today.</span> */}
              </h2>
        {/* NFTs are full proof, of fraud, fake resumes and identification, with guarantee of the highest level of authenticity */}

              <p className='mt-4 text-lg leading-6 text-primary-200'>
                Web3 Smart credential are full proof, decentralized and insured from fraud, combining them with the NFT implementation
                you are guaranteed of the highest level of authenticity
              </p>
              <a
                href='#'
                className='inline-flex items-center px-5 py-3 mt-8 text-base font-medium text-gray-600 bg-white border border-transparent rounded-md shadow hover:bg-gray-50'
              >
                Start issuing smart credentials 
              </a>
            </div>
          </div>
          <div className='-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1'>
            <img
              className='object-cover object-left-top transform translate-x-6 translate-y-6 rounded-md sm:translate-x-16 lg:translate-y-20'
              src='/screenshots/dashboard.png'
              alt='App screenshot'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
