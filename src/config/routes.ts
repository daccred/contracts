const certs = {
  index: '/certs',
  create: '/certs/new',
  editor: '/certs/[id]/editor',
  recipients: '/certs/[id]/recipients',
  forms: '/certs/[id]/forms',
  preview: '/certs/[id]/preview',
};

const open = {
  index: '/public',
  forms: '/public/forms/[id]',
  claim: '/public/claim/[id]',
};

export const routes = {
  certs,
  open,
};

export default routes;
