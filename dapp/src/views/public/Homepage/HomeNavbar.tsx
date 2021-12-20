import React from 'react';
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
{
  /* ---- Menu items: Product, Features, Developer Docs, {Button: Enter DApp} */
}

const navigation = [
  { name: 'Product', href: '#product' },
  { name: 'Features', href: '#features' },
  { name: 'Developer Docs', href: '#' },
  { name: 'FAQ', href: '#faq' },
];

export default function HomeNavbar() {
  return (
    <React.Fragment>
      <Popover>
        <div className='px-4 mx-auto max-w-7xl sm:px-6'>
          <nav className='relative flex items-center justify-between sm:h-10 md:justify-center' aria-label='Global'>
            <div className='flex items-center flex-1 md:absolute md:inset-y-0 md:left-0'>
              <div className='flex items-center justify-between w-full md:w-auto'>
                <a href='#'>
                  <span className='sr-only'>Workflow</span>
                  <img className='w-auto h-8 sm:h-10' src='/images/logo-dark.svg' alt='' />
                </a>
                <div className='flex items-center -mr-2 md:hidden'>
                  <Popover.Button className='inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gray-50 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'>
                    <span className='sr-only'>Open main menu</span>
                    <MenuIcon className='w-6 h-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='hidden md:flex md:space-x-10'>
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className='font-medium text-gray-500 hover:text-gray-900'>
                  {item.name}
                </a>
              ))}
            </div>
            <div className='hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0'>
              <span className='inline-flex rounded-md shadow'>
                <a
                  href='/authorize'
                  className='inline-flex items-center px-4 py-2 text-base font-medium bg-white border border-transparent rounded-md text-primary-600 hover:text-primary-500'
                >
                  Enter App
                </a>
              </span>
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden'
          >
            <div className='overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5'>
              <div className='flex items-center justify-between px-5 pt-4'>
                <div>
                  <img className='w-auto h-8' src='/images/logo-dark.svg' alt='' />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'>
                    <span className='sr-only'>Close main menu</span>
                    <XIcon className='w-6 h-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href='/authorize'
                className='block w-full px-5 py-3 font-medium text-center text-primary-600 bg-gray-50 hover:bg-gray-100 hover:text-primary-700'
              >
                Enter App
              </a>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </React.Fragment>
  );
}
