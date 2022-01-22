import MoralisType from 'moralis';
import * as NextAuth from '@/lib/auth.helper';
import { makeUseAxios } from 'axios-hooks';
import makeAxios from '@/lib/http/axios';
import { authPasswordlessRoute } from '@/lib/http/api';

interface UserAttributes extends MoralisType.Attributes {
  emailAddress?: string;
  ethAddress?: string;
}

interface AuthUserAttributes {
  public_address: string;
  signature: string;
  object_id: string;
  session_token: string;
  name: string;
  email?: string;
}

const useAxios = makeUseAxios({
  axios: makeAxios,
  defaultOptions: { useCache: false, manual: true },
});

export default function useServerAuth() {
  const [{ data: postData, loading: postLoading, error: postError }, executePost] = useAxios({
    url: authPasswordlessRoute,
    method: 'POST',
  });

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
        data: user,
      });

      // eslint-disable-next-line no-console
      console.log(result.data, postData, postLoading, postError);

      NextAuth.login({ ...user, token: result.data.access_token });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(postError?.response, postError);
      throw new Error('cannot login user');
    }
  };

  return { passwordless };
}
