/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ABI from '@/lib/abis';
import { DACRED_ROUTER_KOVAN } from '@/config/constants';
import { useMoralis, useNewMoralisObject, useWeb3ExecuteFunction } from 'react-moralis';
import Button from '@/components/buttons/Button';
import { observer } from 'mobx-react-lite';
import { StoreType } from 'realmono/model/store';
import { useState, useEffect } from 'react';
import {Moralis} from 'moralis'


const options = {
  abi: ABI.dacredRouterABI,
  contractAddress: DACRED_ROUTER_KOVAN,
  functionName: 'createContractForClient',
  params: {
    name: 'Smart Farm DAO',
    certId: 'SFD',
  },
}

interface PublishActionProps {
  handlePublish: (arg: unknown) => void
  publishProps: unknown
  store: StoreType
}

export default function PublishAction({ store, handlePublish }: PublishActionProps) {
/* ================================================================================================ */
// const [response, setResponse] = useState<any>({})

  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction(options);
  const { isSaving, error : objError, save } = useNewMoralisObject('Credentials');
  // const { Moralis } = withMoralis()


  const { 
    web3, 
    enableWeb3, 
    // isWeb3Enabled, isWeb3EnableLoading, web3EnableError
   } = useMoralis()



  useEffect(() => {
    enableWeb3()
  }, [])

  const _handlePublishAction = async (result: any) => {
    
    try {
      
      // const contractEvents = result.events['NewContractCreated']
      const preview = await store.toDataURL();
      
      console.log(preview)
      alert(JSON.stringify(result.events['NewContractCreated'].returnValues.contractAddress))

      /* Make call to contract method */
      // await fetch({params: options});
      // console.log(callContract, "CALL CONTRACT RESPONSE")

      /* Save the preview image to Moralis and store in IPFS */
      const file = new Moralis.File("certificate.json", { base64: preview.split(",")[1] });

      console.log(file)

      /* Save credential information to Moralis */
      await save({
        name: 'Smart Farm DAO',
        certId: '9y8szTm57lmgWxdhY5YJMGx8',
        thumbnail: preview,
        file: file
      })


    } catch (error) {
      alert(JSON.stringify(error))
    }
    
  }
  /* handle callback */
  handlePublish && handlePublish(data)



/* ================================================================================================ */



  return (
    <div className="flex">
      <Button onClick={() => fetch({ onSuccess: (result) => _handlePublishAction(result) }) } disabled={isFetching} isLoading={isLoading || isSaving}>Publish</Button>

    </div>
  );
}