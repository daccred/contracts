import React, { useState, useEffect } from 'react';
import Form, { UiSchema } from '@rjsf/core';


const FieldWrapper: React.FC = ({ children, ...rest }): JSX.Element => {
    return (
        <section
        className="flex justify-center w-full px-10 py-6 mx-auto my-6 align-middle bg-white border-2 rounded-md"
            {...rest}
        >
            {children}
        </section>
    );
};

export default function FormSample(): JSX.Element {
    const [formSchema, setFormSchema] = useState<ISchema>({ '': '' });

    const uiSchema: UiSchema = {
        toggle: {
            "ui:widget": "radio"
        },
        name: {
            'ui:widget': 'text',
        },
        collegeName: {
            'ui:placeholder': 'Meltwater',
        },
    };

    interface ISchema {
        [key: string]: string | Record<any, string> | any;
    }

    const schema: ISchema = {
        title: '',
        description: 'Short Form Description',
        type: 'object',
        properties: {
            name: {
                type: 'string',
                title: 'Your Full Name',
                description: 'Enter your full name',
            },
            toggle: {
                title: 'Gender',
                description: 'Are you Male or Female?',
                type: 'boolean',
                // enum: ['Male', 'Female'],
                "oneOf": [
                    {
                        "title": "True",
                        "const": true
                    },
                    {
                        "title": "False",
                        "const": false
                    }
                ]
            },
            dropdown: {
                type: 'string',
                title: 'Country',
                description: 'Select from a list of available options',
                default: 'Country',
                enum: ['South Africa', 'Kenya', 'Ghana', 'Nigeria'],
            },
            age: {
                type: 'number',
                title: 'Age',
                description: 'Type your full age in numbers',
            },
        },
        required: ['name', 'age'],
    };
    useEffect(() => {
        // Set Form Schema to default to defined schema in page
        setFormSchema(schema);

        // Try to retrieve existing schema from localstorage
        // const storageForm = JSON.parse(localStorage.getItem('__rjsForm') || '');

        setTimeout(() => {
            // setFormSchema(storageForm)
        }, 3000);

        // return () => {
        //     cleanup
        // };
    }, []);

    // const storageForm = JSON.parse(localStorage.getItem("__rjsForm") || "")
    // console.warn(localStorage.getItem("__rjsForm") || "")

    return (
        <section className="flex flex-col items-start w-full min-h-full align-top" >


            {/* === section to render the form Heading and Description with Divider ==== */}
            <FieldWrapper>
                <h1>
                    Advocacy Database Form
                </h1>

            </FieldWrapper>
            {/* === section to render the form Heading and Description with Divider ==== */}

            {/* =========== Section to generate Form Fields for Public Forms =================== */}
            <FieldWrapper>
                <Form
                    schema={formSchema}
                    uiSchema={uiSchema}
                    onSubmit={(data) => {
                        alert("DATA SUBMITTED" + JSON.stringify(data.formData))
                        window.location.replace('/workspaces/office/survey')
                    }
                    }
                />
            </FieldWrapper>
            {/* =========== Section to generate Form Fields for Public Forms =================== */}

            {/* === Section to render the form Button  === */}

            {/* <MainBox
                width="40rem"
                margin={'auto'}
                my={2}
                pb={10}
                alignItems="center"
                justifyContent="center"
            >
                <SubmitButton
                    mt="4"
                    withIcon
                    analyticName="Click Submit Form"
                    buttonName="Submit"
                // border={theme.custom.altBorder}
                />
            </MainBox> */}
            {/* === Section to render the form Button  === */}
        </section>
    );
}
