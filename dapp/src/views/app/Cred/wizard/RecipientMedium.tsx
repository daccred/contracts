import React, {useState} from 'react';
import { useRealm } from 'use-realm';
import { RiSurveyLine, RiFileExcel2Line, RiContactsBook2Line } from 'react-icons/ri';

import { FlatfileButton } from "@flatfile/react";

/* Import Page Components here */
import { CRED_WIZARD_STEP, WizardStepOpts } from '@/lib/realm';
import { useZustand } from '@/lib/zustand';
import RadioBox, { RadioBoxProps } from '@/components/fields/RadioBox';
import { ClaimOptionsVar } from '@/config/d';

/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ----------------------------------------------------------------------------------------- */

const mediums = [
  {
    disabled: false,
    id: '1',
    value: 'forms',
    title: 'Quick Forms',
    description: 'use a quick form to collect the data you need',
    icon: RiSurveyLine,
  },
  {
    disabled: false,
    id: '2',
    value: 'csv',
    title: 'Import from CSV/Excel',
    description: 'Import recipients from a .csv, .xlsx file',
    icon: RiFileExcel2Line,
  },
  {
    disabled: false,
    id: '3',
    value: 'contacts',
    title: 'Import from Contacts',
    description: 'Import recipients from your google contact',
    icon: RiContactsBook2Line,
  },
];
/*  ------------------------------------------  Menu Radio Options Array   --------------- */
/*  ---------------------------------------------------------------------------------------- */

const CreateNewCert = () => {
  const [selected, _selected] = React.useState<RadioBoxProps | undefined>(undefined);

  const [step, _step] = useRealm<WizardStepOpts[]>(CRED_WIZARD_STEP);

  /* hook forms */
  const _dispatchFormAction = useZustand((slice) => slice.dispatchNewCredentialAction);

  const _handleSubmission = async (launch: any, data: RadioBoxProps): Promise<void> => {
    _selected(data);

    if(data.value == 'csv') launch()

    const claim: Partial<ClaimOptionsVar> = {};
    claim.medium = data.value;

    try {
      await _dispatchFormAction(claim);
      await _step([...step, 'medium_preview']);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };


  const [results, setResults] = useState<any>();
  function FileApp() {
    return (
      <div className="App">
        <FlatfileButton
          settings={{
              type: "test import",
              fields: [
                  { label: "name", key: "name" },
                  { label: "Email", key: "email" }
              ]
          }}
          licenseKey={"7d991ac6-5689-4bb9-ae88-adc4093fc0c6"}
          customer={{
              companyId: "ABC-123",
              companyName: "ABC Corp.",
              email: "john@abc123.com",
              name: "John Smith",
              userId: "12345"
          }}
          onData={async (results) => {
            // do something with the results
            console.log(results);
          }}
          onRecordChange={(record) =>{return { name: { value: record.name + " from change" }}}
          }
          onRecordInit={(record) => {
            return { name: { value: record.name + " from init" }
          }}}
          fieldHooks={{
            email: (values) =>{
              return values.map(([item, index]) => [
                { value: item + ".au" },
                index
              ]);
            }
          }}
          onCancel={() => {
            console.log("cancel");
          }}
          render={(importer, launch) => {
            // return <button onClick={launch}>Upload file</button>;
      return <RadioBox value={selected} onChange={(d) => _handleSubmission(launch, d)} options={mediums} label={'Select a Medium'} />
      
          }}
        />
      </div>
    );
  }



  return (
    <section className='max-w-3xl mx-auto'>
      {/* ------- Form Heading section ------- */}
      <section className='justify-center my-4 mb-12 text-center align-center'>
        <h3>Add Credential Recipients</h3>
        <p className='max-w-2xl m-auto mt-2'>How do you want to populate the app with the data of your recipients</p>
      </section>
      {/* ------- Form Heading section ------- */}

      <FileApp />
    </section>
  );
};

export default CreateNewCert;



//  function FileApp() {
//   const [results, setResults] = useState<any>();
//   return (
//     <div className="App">
//       <FlatfileButton
//         settings={{
//             type: "test import",
//             fields: [
//                 { label: "name", key: "name" },
//                 { label: "Email", key: "email" }
//             ]
//         }}
//         licenseKey={"7d991ac6-5689-4bb9-ae88-adc4093fc0c6"}
//         customer={{
//             companyId: "ABC-123",
//             companyName: "ABC Corp.",
//             email: "john@abc123.com",
//             name: "John Smith",
//             userId: "12345"
//         }}
//         onData={async (results) => {
//           // do something with the results
//           console.log(results);
//         }}
//         onRecordChange={(record) =>{return { name: { value: record.name + " from change" }}}
//         }
//         onRecordInit={(record) => {
//           return { name: { value: record.name + " from init" }
//         }}}
//         fieldHooks={{
//           email: (values) =>{
//             return values.map(([item, index]) => [
//               { value: item + ".au" },
//               index
//             ]);
//           }
//         }}
//         onCancel={() => {
//           console.log("cancel");
//         }}
//         render={(importer, launch) => {
//           return <button onClick={launch}>Upload file</button>;
//         }}
//       />

//       {/* <pre style={{ padding: "20px", background: "#dadada" }}>
//         {results ? (
//           <ul>
//             {results.data.map((record: any) => (
//               <li>
//                 {record.name} &lt;{record.email}&gt;
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div>no data yet</div>
//         )}
//       </pre> */}
//     </div>
//   );
// }

