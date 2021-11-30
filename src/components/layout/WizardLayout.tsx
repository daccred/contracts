import React from 'react';
import nookies from 'nookies';
import { decode } from 'js-base64';

import { formatAddress } from '@/lib/helper';
import { Disclosure } from '@headlessui/react';
import { AUTH, navigation, userNavigation } from '@/config/constants';
import MoralisType from 'moralis';
import WizardNav from '../nav/WizardNav';
import HeaderDesktop from '@/components/header/HeaderDesktop';
import HeaderMobile from '@/components/header/HeaderMobile';

const WizardLayout: React.FC = ({ children }) => {
  const [profile, setProfile] = React.useState<Partial<MoralisType.AuthData>>({});
  const [hasProfile, setHasProfile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const cookies = nookies.get(null);
    const profile = cookies[AUTH.key];
    if (profile) {
      setProfile(JSON.parse(decode(profile)));
      setHasProfile(true);
    }
  }, []);

  const user = {
    name: formatAddress(profile.ethAddress),
    email: profile.emailAddress || '',
    imageUrl: '/images/metamask.svg',
  };

  return (
    <>
      <div className='min-h-screen bg-gray-50'>
        <Disclosure as='nav' className='bg-gray-900'>
          {({ open }) => (
            <>
              {/* --------- Left hand side user menu and collapse menu for mobile -------- */}
              <HeaderDesktop
                userNavigation={userNavigation}
                user={user}
                navigation={navigation}
                open={open}
                hasProfile={hasProfile}
              />
              {/* --------- Left hand side user menu and collapse menu for mobile -------- */}
              <HeaderMobile
                userNavigation={userNavigation}
                user={user}
                navigation={navigation}
                open={open}
                hasProfile={hasProfile}
              />
            </>
          )}
        </Disclosure>

        <WizardNav />
        <main>
          <div className='py-6 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            {/* Replace with your content */}
            <div className='px-4 py-6 sm:px-0'>{children}</div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default WizardLayout;
