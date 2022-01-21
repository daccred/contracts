import { useEffect, useMemo, useState } from 'react';
import nookies from 'nookies';
import MoralisType from 'moralis';
import { APURL, AUTH } from '@/config/constants';
import { decode } from 'js-base64';
import { formatAddress } from '@/lib/helper';
import * as NextAuth from '@/lib/auth.helper';
import { configure, loadCache, serializeCache, makeUseAxios } from 'axios-hooks';
import { PasswordlessModel } from '@/lib/http';

interface UserAttributes extends MoralisType.Attributes {
  emailAddress?: string;
  ethAddress?: string;
}

interface AuthUserAttributes {
  public_address: string,
  signature:  string,
  object_id:  string,
  session_token:  string,
  name:   string,
  email?:  string,
}


const useAxios = makeUseAxios({
  axios: PasswordlessModel.axios
})



export default function useServerAuth() {

  const [{ data: postData, loading: postLoading, error: postError }, executePost] = useAxios(
    { 
      url: `${APURL}/auth/passwordless`,
      method: 'POST',
    },
    { manual: true }
  );

  const passwordless = async (profile: MoralisType.User<UserAttributes>) => {

    try {
      const user: AuthUserAttributes = {
        public_address: profile.attributes.ethAddress as string,
        signature: profile.attributes.authData.moralisEth.signature,
        object_id: profile.id,
        session_token: profile.getSessionToken(),
        name: profile.attributes.ethAddress as string,
        email: profile.attributes.emailAddress,
      };

      const result = await executePost({
        data: user
      });

      // eslint-disable-next-line no-console
      console.log(result.data, postData, postLoading, postError);

      // NextAuth.login({...user, token: result.data.access_token});
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(postError?.response, postData);
      NextAuth.logoutUser(null);
      throw new Error('cannot login user');
    }
  };

  return { passwordless };
}
