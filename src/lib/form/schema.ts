import { UiSchema } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';


export const uiSchema: UiSchema = {
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

export const schema: JSONSchema7 = {
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