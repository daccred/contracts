import { decode, encode } from 'js-base64';
import MoralisType from 'moralis';
/**
 * Handle User interaction with Next App
 * @method logout - clear cookies after call to api
 * @method login - persist cookies to browser
 * @method getProfile - Profile from user session
 * @method isAuthenticated - Check that user is authenticated
 */
import { NextPageContext } from 'next';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { AUTH as config } from '@/config/constants';
type ContextArg = Partial<NextPageContext>;
type TAuthUser = MoralisType.User<MoralisType.Attributes>['attributes'];

export const redirect = (target = config.loginRoute) => {
  return {
    redirect: {
      permanent: false,
      destination: target,
    },
  };
};

export const login = async (payload: TAuthUser, target = config.rootRoute) => {
  /* Payload consists of Auth Token and user data from Moralis */
  /* We need them separately to manage requests */
  const {token, ...rest } = payload

  // Sign in a user by setting the cookie with the token received from Login Auth Request
  const userCookie = encode(JSON.stringify(rest));

  /* Set Cookie for User with profile Key */
  await setCookie(null, config.key, userCookie, {
    sameSite: 'lax',
    maxAge: 2 * 24 * 60 * 60,
  });

  /* Set Cookie for User Auth Token */
  await setCookie(null, config.token, token, {
    sameSite: 'lax',
    maxAge: 2 * 24 * 60 * 60,
  })


  window.location.replace(target);
};

export const logoutUser = (ctx: ContextArg | null, target = config.loginRoute) => {
  // Sign out user by removing the cookie from the broswer session
  destroyCookie(ctx, config.key);
  destroyCookie(ctx, config.token);
  redirect(target);
};

export const getProfile = async (ctx: ContextArg) => {
  try {
    // Fetch the auth token for a user
    const cookies = await parseCookies(ctx);
    const userCookie = cookies[config.key];

    /* Handle error with user cookie not defined */
    if (!userCookie) return null;

    const userProfile = JSON.parse(decode(userCookie));
    return userProfile as MoralisType.User;
  } catch (error) {
    // console.log(error)
    return null;
  }
};

export const isAuthenticated = async (ctx: ContextArg) => {
  try {
    // Fetch the auth token for a user
    const cookies = await parseCookies(ctx);
    const authCookie = cookies[config.token];
    if (authCookie == undefined) return false;

    /* Return truthy */
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return false;
  }
};

export const handleAuthenticatedRequest = async (ctx: ContextArg, target = config.defaultRoute) => {
  /* If user is authenticated, get profile from cookies and pass into props */

  const userHasToken = await isAuthenticated(ctx);
  if (userHasToken) {
    const userProfile = await getProfile(ctx);
    // eslint-disable-next-line no-console
    console.log('I got here init', userProfile);
    return {
      props: {
        user: userProfile,
      },
    };
  }
  return redirect(target);
};

/**
 * redirectAuthenticated
 * @param ctx
 * @param target
 * @returns returns a redirect props is the user is authenticated in cookies header
 */
export const redirectAuthenticated = async (ctx: ContextArg) => {
  const userHasToken = await isAuthenticated(ctx);
  if (userHasToken) {
    return redirect(config.rootRoute);
  } else {
    return {
      props: {
        user: null,
      },
    };
  }
};
