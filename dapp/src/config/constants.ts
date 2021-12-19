export const MORALIS_APP_ID = 'yYmAdNgqUQ3P8vPViKYjYE82EPjGAa8HCC7FZqDL';
export const MORALIS_SERVER_URL = 'https://09zmv9mmxz2l.usemoralis.com:2053/server';
export const ESERVER_HOST = 'https://studio.polotno.dev/';
/* LF: Local Forage */
export const LF_EDITOR_VAR = 'dacred-editor--state';
export const LF_CERTWIZ_VAR = 'dacred-credentials--state';
export const LF_STORE_KEY = 'ILvcJpQFhD5AC6AVd7P2'

/* ------------------------------------------------------------------- */
/*                all our smart contracts and the networks            */
/* ----------------------------------------------------------------- */
export const DACRED_ROUTER_KOVAN = '0x195c499669Ed02E9313e94836A2dCf9500322532'


/* -------------------------------------------------------------------------- */
/*                constants to work with authentication helpers               */
/* -------------------------------------------------------------------------- */
export const AUTH = {
  loginRoute: '/auth',
  rootRoute: '/',
  key: '__app.sid__',
};

/* ----------------------------------------------------------------------- */
/*                navigation routes def for working with layouts           */
/* ----------------------------------------------------------------------- */
import { BookmarkIcon, HomeIcon } from '@heroicons/react/outline';

import routes from '@/config/routes';

export const subnav = [
  { name: 'Lorem Ipsum', href: routes.open.forms, bgColorClass: 'bg-indigo-500' },
  { name: 'Lorem Ipsum', href: routes.open.forms, bgColorClass: 'bg-green-500' },
  { name: 'Lorem Ipsum', href: routes.open.forms, bgColorClass: 'bg-yellow-500' },
];

export const navigation = [
  { icon: HomeIcon, name: 'Dashboard', href: '/', current: true },
  { icon: BookmarkIcon, name: 'Certifications', href: routes.certs.index, current: false },
];

export const userNavigation = [{ name: 'Sign out', href: '#' }];
