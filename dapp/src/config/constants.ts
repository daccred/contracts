export const MORALIS_APP_ID = 'yYmAdNgqUQ3P8vPViKYjYE82EPjGAa8HCC7FZqDL';
export const MORALIS_SERVER_URL = 'https://09zmv9mmxz2l.usemoralis.com:2053/server';
export const ESERVER_HOST = 'https://studio.dev/';
export const META_API = 'https://openapi.daccred.co';
export const LOCAL_API = 'http://localhost:8080';
export const DEFAULT_MAINNET = '0x1'; // Ethereum
export const DEFAULT_TESTNET = '0x3'; // Ropsten
/* LF: Local Forage */
export const LF_EDITOR_VAR = 'dacred-editor--state';
export const LF_CERTWIZ_VAR = 'dacred-credentials--state';
export const LF_STORE_KEY = 'ILvcJpQFhD5AC6AVd7P2';

/* ------------------------------------------------------------------- */
/*                all our smart contracts and the networks            */
/* ----------------------------------------------------------------- */
export const DACRED_ROUTER_KOVAN = '0x8A3AC1642b2B98F71D23f1547B754eeDd9Af2245';
export const DACRED_ROUTER_GANACHE = '0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7';
export const DACRED_ROUTER_ROPSTEN = '0x46e0e42b9d952c3d894d12139aed33fa5d318bff';

/* -------------------------------------------------------------------------- */
/*                constants to work with authentication helpers               */
/* -------------------------------------------------------------------------- */
export const AUTH = {
  loginRoute: '/authorize',
  defaultRoute: '/',
  rootRoute: '/studio',
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