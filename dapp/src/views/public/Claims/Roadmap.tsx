/* This example requires Tailwind CSS v2.0+ */
import { GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline';

{
  /* ---- save the best for last::: coming soon------ */
}
{
  /* roadmap we're thinking about::::>> Developer API to integrate to your platform */
}
{
  /* --- pay to redeem certifications, charge people to redeem their certificates and certifications */
}
{
  /* --- Multi chain Bridge >>><<< Hybrid Smart contracts::: use hybrid contracts that use oracles and custody wallets for larger organizations with full on-chain visibility */
}

const roadmap = [
  {
    name: 'Developer API',
    description:
      'Integrate our API into your course platform, portals and directories and issue NFT credentials from a single API call',
    icon: GlobeAltIcon,
  },
  {
    name: 'Paid Redemption',
    description:
      'Charge your recipients a one time fee to mint their certificates at the time of redemption, you can also strictly bind redemption to a waitlist',
    icon: ScaleIcon,
  },
  {
    name: 'Hybrid Smart contracts',
    description:
      'Create custodial wallets to improve onboarding and use our hybrid smart contracts + chainlink oracles to validate and store all transactions on-chain',
    icon: LightningBoltIcon,
  },
];

export default function Roadmap() {
  return (
    <div className='py-12 bg-white'>
      <div className='max-w-xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex items-center justify-between my-8'>
          <p className='inline-flex px-4 py-2 font-semibold leading-5 text-green-800 bg-green-100 rounded-full text-md'>
            More features :: coming soon
          </p>
        </div>

        <h2 className='sr-only'>A better way to send money.</h2>
        <dl className='space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8'>
          {roadmap.map((proposal) => (
            <div key={proposal.name}>
              <dt>
                <div className='flex items-center justify-center w-12 h-12 text-white rounded-md bg-primary-500'>
                  <proposal.icon className='w-6 h-6' aria-hidden='true' />
                </div>
                <p className='mt-5 text-lg font-medium leading-6 text-gray-900'>{proposal.name}</p>
              </dt>
              <dd className='mt-2 text-base text-gray-500'>{proposal.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
