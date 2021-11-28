export const MORALIS_APP_ID = 'yYmAdNgqUQ3P8vPViKYjYE82EPjGAa8HCC7FZqDL';
export const MORALIS_SERVER_URL = 'https://09zmv9mmxz2l.usemoralis.com:2053/server';

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
import { BookmarkIcon, CashIcon, ClockIcon, DocumentIcon, HomeIcon, UsersIcon } from '@heroicons/react/outline';

import routes from '@/config/routes';

export const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Editor', href: routes.certs.index, icon: BookmarkIcon, current: false },
  { name: 'Recipients', href: routes.certs.index, icon: CashIcon, current: false },
  { name: 'Forms', href: routes.certs.index, icon: UsersIcon, current: false },
  { name: 'Preview', href: routes.certs.index, icon: ClockIcon, current: false },
  { name: 'Claim', href: routes.certs.index, icon: DocumentIcon, current: false },
];
export const subnav = [
  { name: 'Lorem Ipsum', href: routes.open.forms, bgColorClass: 'bg-indigo-500' },
  { name: 'Lorem Ipsum', href: routes.open.forms, bgColorClass: 'bg-green-500' },
  { name: 'Lorem Ipsum', href: routes.open.forms, bgColorClass: 'bg-yellow-500' },
];
