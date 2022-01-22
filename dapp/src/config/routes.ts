const certs = {
  index: '/cred',
  create: '/cred/new',
  editor: '/cred/[id]/editor',
  recipients: '/cred/[id]/recipients',
  forms: '/cred/[id]/forms',
  preview: '/cred/[id]/preview',
};

const open = {
  index: '/public',
  forms: '/public/forms/[id]',
  claim: '/public/claim/[id]',
};

const editor = {
  index: '/editor',
  hash: '/editor/[hash]',
};


const claims = {
  index: '/claims',
  address: '/editor/[address]',
  tokenUri: '/editor/[address]/[tokenURI]',
};

export const routes = {
  certs,
  open,
  claims,
  editor,
};

export default routes;
