import { joinClassNames } from '@/lib/helper';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

const faqs = [
  {
    question: 'What is an NFT?',
    answer:
      'NFT is short for Non Fungible tokens, which are a standard used to create ownership of digital assets on the blockchain',
  },
  {
    question: 'What is Web3.0 all about',
    answer:
      'Web3 is the advent of the new internet, driven by blockchain networks and decentralized, in Web3 everything is permissionless and decentralized',
  },
];

export default function FAQ() {
  return (
    <div className='bg-gray-50'>
      <div className='px-4 py-12 mx-auto max-w-7xl sm:py-16 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto divide-y-2 divide-gray-200'>
          <h2 className='text-3xl font-extrabold text-center text-gray-900 sm:text-4xl'>Frequently asked questions</h2>
          <dl className='mt-6 space-y-6 divide-y divide-gray-200'>
            {faqs.map((faq) => (
              <Disclosure as='div' key={faq.question} className='pt-6'>
                {({ open }) => (
                  <>
                    <dt className='text-lg'>
                      <Disclosure.Button className='flex items-start justify-between w-full text-left text-gray-400'>
                        <span className='font-medium text-gray-900'>{faq.question}</span>
                        <span className='flex items-center ml-6 h-7'>
                          <ChevronDownIcon
                            className={joinClassNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden='true'
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as='dd' className='pr-12 mt-2'>
                      <p className='text-base text-gray-500'>{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
        <div className='max-w-3xl mx-auto'>
          <p className='py-20 text-gray-500'>
            Not seeing an answer to your question, please shoot me an tweet{' '}
            <span className='px-2 bg-gray-300 rounded-full'><a href="https://twitter.com/daccred">@daccred</a></span> and I'll respond
          </p>
        </div>
      </div>
    </div>
  );
}
