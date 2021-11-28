import { BookmarkIcon, CashIcon, ClockIcon, DocumentIcon, LockClosedIcon, UsersIcon } from '@heroicons/react/outline';

import { joinClassNames } from '@/lib/helper';

import { Wrapper } from '@/components/layout/Wrapper';

import routes from '@/config/routes';

const user = {
  name: 'Admin',
  email: 'admin@cent.io',
  role: '',
};
const stats = [
  { label: 'Investor Accounts', value: 29 },
  { label: 'Asset Pools', value: 34 },
  { label: 'Transactions', value: 122 },
];
const actions = [
  {
    icon: ClockIcon,
    name: 'Manage Pools',
    href: routes.certs.index,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    desc: 'Create new asset pool, mint a pool token or preview transactions that have occured in a pool',
  },
  {
    icon: DocumentIcon,
    name: 'Manage Assets',
    href: routes.certs.index,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    desc: 'Mint new assets for an asset pool, assign asset ownerships and track APY on assets',
  },
  {
    icon: UsersIcon,
    name: 'Manage Investors',
    href: routes.certs.index,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
    desc: 'View investors, investor transactions and payout records',
  },
  {
    icon: CashIcon,
    name: 'Manage Transactions',
    href: routes.certs.index,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    desc: 'View all transactions that have occured on the platform, filter by pools, investors or managers',
  },
  {
    icon: BookmarkIcon,
    name: 'Create new Templates',
    href: routes.certs.index,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
    desc: 'Create new asset template to be added to a new pool, or view existing templates and update or delete them',
  },
  {
    icon: LockClosedIcon,
    name: 'Asset Managers',
    href: routes.certs.index,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    desc: 'Assign managers to an asset and record + track payout and transactions for asset managers',
  },
];

export default function DashboardActions() {
  return (
    <>
      <Wrapper variant='compact'>
        <h1 className='sr-only'>Profile</h1>
        {/* Main 3 column grid: remove grid className to disable right hand grid */}
        <div className='items-start grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'>
          {/* Left column */}
          <div className='grid grid-cols-1 gap-4 lg:col-span-2'>
            {/* Welcome panel */}
            <section aria-labelledby='profile-overview-title'>
              <div className='overflow-hidden bg-white rounded-lg shadow'>
                <h2 className='sr-only' id='profile-overview-title'>
                  Profile Overview
                </h2>
                <div className='p-6 bg-white'>
                  <div className='sm:flex sm:items-center sm:justify-between'>
                    <div className='sm:flex sm:space-x-5'>
                      <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
                        <p className='text-sm font-medium text-gray-600'>Welcome back,</p>
                        <p className='text-xl font-bold text-gray-900 sm:text-2xl'>{user.name}</p>
                        <p className='text-sm font-medium text-gray-600'>{user.role}</p>
                      </div>
                    </div>
                    <div className='flex justify-center mt-5 sm:mt-0'>
                      <a
                        href='#'
                        className='flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50'
                      >
                        Switch Accounts
                      </a>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-1 border-t border-gray-200 divide-y divide-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x'>
                  {stats.map((stat) => (
                    <div key={stat.label} className='px-6 py-5 text-sm font-medium text-center'>
                      <span className='text-gray-900'>{stat.value}</span> <span className='text-gray-600'>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Actions panel */}
            <section aria-labelledby='quick-links-title'>
              <div className='overflow-hidden bg-gray-200 divide-y divide-gray-200 rounded-lg shadow sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'>
                <h2 className='sr-only' id='quick-links-title'>
                  Quick links
                </h2>
                {actions.map((action, actionIdx) => (
                  <div
                    key={action.name}
                    className={joinClassNames(
                      actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                      actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                      actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                      actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                      'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                    )}
                  >
                    <div>
                      <span className={joinClassNames(action.iconBackground, action.iconForeground, 'rounded-lg inline-flex p-3 ring-4 ring-white')}>
                        <action.icon className='w-6 h-6' aria-hidden='true' />
                      </span>
                    </div>
                    <div className='mt-8'>
                      <h3 className='text-lg font-medium'>
                        <a href={action.href} className='focus:outline-none'>
                          {/* Extend touch target to entire panel */}
                          <span className='absolute inset-0' aria-hidden='true' />
                          {action.name}
                        </a>
                      </h3>
                      <p className='mt-2 text-sm text-gray-500'>{action.desc}</p>
                    </div>
                    <span className='absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400' aria-hidden='true'>
                      <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z' />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Wrapper>

      <footer>
        <div className='max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 lg:max-w-7xl'>
          <div className='py-8 text-sm text-center text-gray-500 border-t border-gray-200 sm:text-left'>
            <span className='block sm:inline'>&copy; 2021 Limbic Labs Inc.</span> <span className='block sm:inline'>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
