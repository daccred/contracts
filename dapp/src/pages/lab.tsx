/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';
import { imgBase64 } from './moralis-lab';

function Certificate() {
  const [certificate, setCertificate] = useState<any>({
    metadata: {
      name: 'Hoola Certificate',
      description: 'encryptedMetadata , publicKey)',
      image: imgBase64,
      openBadge: {
        '@context': 'SDDG',
        type: 'encryptedMetadata[',
        recipient: {
          type: 'encryptedMetadata',
          identity: 'encryptedMetadata[',
        },
        issuedOn: '          encryptedMetadata[',

        verification: {
          type: '            encryptedMetadata[',
          creator: '            encryptedMetadata[',
        },
        badge: {
          type: '            encryptedMetadata[',
          id: 'encryptedMetadata[',
          issuer: {
            id: '              encryptedMetadata[',
            type: '              encryptedMetadata[',
          },
        },
        evidence: {
          id: '            encryptedMetadata[',
          description: '            encryptedMetadata[',
        },
      },
      encryption: false,
    }
  });
  const [error, setError] = useState('undefined');
  const [rawEncryptedData, setRawEncryptedData] = useState(null);
  const [verification, setVerification] = useState(null);

  const [ensName, setEnsName] = useState();

  const getCertificate = useCallback(async () => {
    // const nft = await getNft(address, id);
    // const data = await getIpfsMetadata(nft.token_uri);
    const metadata = {};
    setCertificate({
      
      metadata: {
        name: 'Hoola Certificate',
        description: 'encryptedMetadata , publicKey)',
        image: imgBase64,
        openBadge: {
          '@context': 'SDDG',
          type: 'encryptedMetadata[',
          recipient: {
            type: 'encryptedMetadata',
            identity: 'encryptedMetadata[',
          },
          issuedOn: '          encryptedMetadata[',
  
          verification: {
            type: '            encryptedMetadata[',
            creator: '            encryptedMetadata[',
          },
          badge: {
            type: '            encryptedMetadata[',
            id: 'encryptedMetadata[',
            issuer: {
              id: '              encryptedMetadata[',
              type: '              encryptedMetadata[',
            },
          },
          evidence: {
            id: '            encryptedMetadata[',
            description: '            encryptedMetadata[',
          },
        },
        encryption: false,
      }
    });

    // const name = await getEnsNameFromAddress(data?.openBadge.badge.issuer.id);
    // if (!name.name) {
    //   return;
    // }
    // setEnsName(name.name);
  }, []);

  const decryptCertificate = () => {
    const encryptedMetadata = certificate?.metadata;
    setRawEncryptedData(encryptedMetadata);

    const decryptedMetadata = {
      name: 'Hoola Certificate',
      description: 'encryptedMetadata , publicKey)',
      image: imgBase64,
      openBadge: {
        '@context': 'SDDG',
        type: 'encryptedMetadata[',
        recipient: {
          type: 'encryptedMetadata',
          identity: 'encryptedMetadata[',
        },
        issuedOn: '          encryptedMetadata[',

        verification: {
          type: '            encryptedMetadata[',
          creator: '            encryptedMetadata[',
        },
        badge: {
          type: '            encryptedMetadata[',
          id: 'encryptedMetadata[',
          issuer: {
            id: '              encryptedMetadata[',
            type: '              encryptedMetadata[',
          },
        },
        evidence: {
          id: '            encryptedMetadata[',
          description: '            encryptedMetadata[',
        },
      },
      encryption: false,
    };
    setCertificate({
      ...certificate,
      metadata: decryptedMetadata,
    });
  };

  useEffect(() => {
    getCertificate();
  }, [getCertificate]);

  if (!certificate) return null;

  const handleDecryption = async () => {
    try {
      decryptCertificate();
    } catch (_e) {
      setError('Invalid Public Key');
    }
  };

  // const hashData = () => {
  //   // We should only stringify once, the issue is caused by the double stringification in the create page
  //   const stringified = JSON.stringify(JSON.stringify(dataObject));
  //   return ethers.utils.id(stringified);
  // };

  // const verifyHash = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  //   const signer = await provider.getSigner();

  //   const NFTCerts = new ethers.Contract(
  //     certificate.token_address,
  //     abi.abi,
  //     signer
  //   );
  //   const hash = await NFTCerts.getTokenMetadataHash(certificate.token_id);
  //   setVerification(hash === hashData(rawEncryptedData || certificate.metadata));
  // };

  if (certificate?.metadata?.encryption)
    return (
      <div className='w-full h-[80vh] flex flex-col items-center justify-center'>
        <div className='flex flex-col space-y-5'>
          <div className='flex justify-center'>
            <LockClosedIcon className='w-64 text-gray-400' aria-hidden='true' />
          </div>
          <div>
            <p className='max-w-2xl mt-1 text-sm text-gray-500'>
              This certificate is encrypted use your public key to decrypt it
            </p>
          </div>
          <div className='text-center'>
            <button
              onClick={handleDecryption}
              type='submit'
              disabled={!!error}
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:bg-gray-400 disabled:text-gray-700'
            >
              Decrypt
            </button>
            {error && <p className='max-w-2xl mt-1 text-sm text-red-500'>{error}</p>}
          </div>
        </div>
      </div>
    );

  return (
    <div className='flex flex-col w-full min-h-screen lg:flex-row'>
      <div className='flex items-center justify-center bg-slate-100 lg:w-1/2 lg:h-screen lg:sticky lg:top-0'>
        <div className='max-w-lg mx-4 my-16 scale-75 bg-white shadow-2xl shadow-slate-900/5 rounded-xl lg:mx-8'>
          {/* <img src={certificate.metadata.image} className='w-100 rounded-xl' /> */}
        </div>
      </div>
      <div className='flex justify-center flex-1 lg:items-center'>
        <div className='w-full max-w-lg mx-4 my-6 lg:mx-8 lg:my-16'>
          <div className='bg-slate-100 text-slate-400 rounded-full p-0.5 inline-flex'>
            <svg className='w-5 h-5 ' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM9.97999 17.2002L11.9192 11.9594L17.16 10.0202L11.9192 8.08094L9.97999 2.84019L8.04074 8.08094L2.79999 10.0202L8.04074 11.9594L9.97999 17.2002ZM10.9853 11.0255L13.7021 10.0202L10.9853 9.01488L9.97999 6.29805L8.97467 9.01488L6.25784 10.0202L8.97467 11.0255L9.97999 13.7423L10.9853 11.0255Z'
                fill='currentColor'
              />
            </svg>
            <span className='pl-1 pr-2 text-sm font-semibold'>Fullcerts</span>
          </div>
          <h1 className='mt-4 text-2xl font-bold leading-7 text-slate-900 sm:text-3xl'>{certificate.metadata.name}</h1>
          <p className='mt-2 text-slate-500'>{certificate.metadata.description}</p>
          <div className='mt-5 border-t border-slate-200'>
            <dl className='sm:divide-y sm:divide-slate-200'>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-medium text-slate-500'>Awarded to</dt>
                <dd className='flex flex-col items-start gap-2 mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2'>
                  <div className='bg-slate-100 text-slate-400 rounded-full p-0.5 inline-flex items-center '>
                    <img
                      className='inline-block w-5 h-5 rounded-full'
                      src={`https://avatar.tobi.sh/${certificate.metadata.openBadge.recipient.identity}.svg`}
                      alt='0x8DAf30dEa39Fb89c5E039065B7d1973863b38352'
                    />
                    <span className='pl-1 pr-2 text-sm font-medium'>
                      {certificate.metadata.openBadge.recipient.identity}
                    </span>
                  </div>
                </dd>
              </div>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-medium text-slate-500'>Issued by</dt>
                <dd className='flex flex-col items-start gap-2 mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2'>
                  <div className='bg-slate-100 text-slate-400 rounded-full p-0.5 inline-flex items-center '>
                    <img
                      className='inline-block w-5 h-5 rounded-full'
                      src={`https:///${certificate.metadata.openBadge.badge.issuer.id}.svg`}
                      alt='0xCCb807F89269E7d563F83a2a6Cd0383CB8Df406E'
                    />
                    <span className='pl-1 pr-2 text-sm font-medium'>
                      {ensName ? ensName : certificate.metadata.openBadge.badge.issuer.id}
                    </span>
                  </div>
                </dd>
              </div>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-medium text-slate-500'>Hash verification</dt>
                <dd className='mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2'>
                  {verification !== null ? (
                    <div className='flex space-x-2'>
                      {verification ? (
                        <>
                          <ShieldCheckIcon className='w-5 h-5 text-green-400' aria-hidden='true' />{' '}
                          <span>Verified</span>
                        </>
                      ) : (
                        <>
                          <ShieldExclamationIcon className='w-5 h-5 text-red-400' aria-hidden='true' />{' '}
                          <span>Invalid hash</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      <button
                        type='submit'
                        onClick={() => console.log("holla")}
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:bg-gray-400 disabled:text-gray-700'
                      >
                        Check
                      </button>
                    </div>
                  )}
                </dd>
              </div>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-medium text-slate-500'>Date</dt>
                <dd className='mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2'>
                  {certificate.metadata.openBadge.issuedOn}
                </dd>
              </div>
              {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-slate-500">
                        Score
                      </dt>
                      <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                        7/10
                      </dd>
                    </div> */}
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-medium text-slate-500'>Comment</dt>
                <dd className='mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2'>
                  {certificate.metadata.openBadge.evidence.description}
                </dd>
              </div>
              <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-medium text-slate-500'>Links</dt>
                <dd className='mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2'>
                  <ul role='list' className='border divide-y rounded-md border-slate-200 divide-slate-200'>
                    <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                      <div className='flex items-center flex-1 w-0'>
                        <svg
                          className='flex-shrink-0 w-5 h-5 text-slate-400'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                          />
                        </svg>
                        <span className='flex-1 w-0 ml-2 truncate'>{certificate.metadata.openBadge.evidence.id}</span>
                      </div>
                      <div className='flex-shrink-0 ml-4'>
                        <a
                          href={certificate.metadata.openBadge.evidence.id}
                          className='font-medium text-nftcerts-primary hover:text-green-500'
                        >
                          Open
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps({ params }) {
//   const rawAddress = params.address;

//   const [address, id] = rawAddress.split("--");

//   return {
//     props: {
//       address,
//       id,
//     },
//   };
// }

// export async function getStaticPaths() {
//   return { paths: [], fallback: true };
// }

export default Certificate;
