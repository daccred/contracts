import { useEffect, useMemo, useState } from 'react';
import nookies from 'nookies';
import MoralisType from 'moralis';
import { AUTH } from '@/config/constants';
import { decode } from 'js-base64';
import { formatAddress } from '@/lib/helper';
import * as NextAuth from '@/lib/auth.helper';

interface UserAttributes {
  emailAddress: string;
  ethAddress: string;
}

export default function useServerAuth() {
  // const [profile, setProfile] = useState<Partial<MoralisType.AuthData>>({});
  // const [hasProfile, setHasProfile] = useState<boolean>(false);

  // /* Retrieve profile from cookies */
  // const cookies = nookies.get(null);
  // const profileInCookies = useMemo(() => cookies[AUTH.key], [cookies]);

  // useEffect(() => {
  //   if (profile) {
  //     setProfile(JSON.parse(decode(profileInCookies)));
  //     setHasProfile(true);
  //   }
  // }, []);

  const passwordless = (profile: MoralisType.User<UserAttributes>['attributes']) => {
    console.log(profile);
    const user = {
      name: formatAddress(profile.ethAddress),
      email: profile.emailAddress || '',
      imageUrl: '/images/metamask.svg',
    };

    return NextAuth.login(user);
  };

  return { passwordless };
}
