/* This example requires Tailwind CSS v2.0+ */
import { GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline';

const features = [
  {
    name: 'Competitive exchange rates',
    description:
      'Pay in the Cryptocurrency you are most conversant with and access the service instantly without any holdups. We meet you at the point where you are.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      'Our pricing is very transparent and straightforward. So you can focus on what is really important for your customers and clients and we do the rest.',
    icon: ScaleIcon,
  },
  {
    name: 'Transfers are instant',
    description:
      'Using the blockchain technology guarantees that all transafers are instant with and a strong layer of verifiability for every single credential you might have.',
    icon: LightningBoltIcon,
  },
];

export default function FeatureBox() {
  return (
    <div className='py-12 bg-white md:mt-20 sm:mt-8 mb-6'>
      <div className='max-w-xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='sr-only'>A better way to send money.</h2>
        <dl className='space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8'>
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className='flex items-center justify-center w-12 h-12 text-white rounded-md bg-primary-500'>
                  <feature.icon className='w-6 h-6' aria-hidden='true' />
                </div>
                <p className='mt-5 text-lg font-medium leading-6 text-gray-900'>{feature.name}</p>
              </dt>
              <dd className='mt-2 text-base text-gray-500'>{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
