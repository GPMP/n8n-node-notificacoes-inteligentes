import type { INodeProperties } from 'n8n-workflow';

export const customvariablefields: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable'],
      },
    },
    description: 'The name of the custom variable',
    routing: { send: { type: 'body', property: 'name' } },
  },
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['updatecustomvariable'],
      },
    },
    description: 'The unique identifier of the variable group',
    routing: { send: { type: 'body', property: 'group_id' } },
  },
  {
    displayName: 'Custom Variable ID',
    name: 'customVariableId',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['updatecustomvariable', 'deletecustomvariable', 'getvariable'],
      },
    },
    description: 'The unique identifier for the custom variable',
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    required: true,
    typeOptions: {
      rows: 4,
    },
    default: '',
    description: 'A brief description of the custom variable',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable', 'updatecustomvariable'],
      },
    },
    routing: { send: { type: 'body', property: 'description' } },
  },
  {
    displayName: 'Variable Type',
    name: 'variableType',
    type: 'options',
    options: [
      { name: 'CNPJ', value: 'cnpj' },
      { name: 'CPF', value: 'cpf' },
      { name: 'Email', value: 'email' },
      { name: 'Integer', value: 'integer' },
      { name: 'Multi Select', value: 'multi_select' },
			{ name: 'Numeric', value: 'numeric' },
			{ name: 'Option List', value: 'option_list' },
      { name: 'Text', value: 'text' },
    ],
    default: 'cpf',
    description: 'Select the data type for the custom variable',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable'],
      },
    },
    routing: { send: { type: 'body', property: 'type' } },
  },
  {
    displayName: 'Additional Parameters',
    name: 'additionalParameters',
    type: 'multiOptions',
    options: [
      { name: 'Organization', value: 'organization' },
      { name: 'Author', value: 'author' },
      { name: 'Last Edited By', value: 'lastEditedBy' },
      { name: 'Variable Group', value: 'variableGroup' },
    ],
    default: [],
    description: 'Select optional parameters to include in the request',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['getvariable', 'getcustomvariables'],
      },
    },
    routing: { request:{qs:{include:'={{$value}}'}}},
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Select',
    default: {},
    options: [
      { displayName: 'Slug', name: 'slugFilter', type: 'string', default: '' },
      {
        displayName: 'Type',
        name: 'typeFilter',
        description: 'Set the type: cpf | cnpj | email | integer | option_list | multi_select | numeric | text',
        type: 'string',
        default: '',
      },
      { displayName: 'Variable Group Name', name: 'variableGroupNameFilter', type: 'string', default: '' },
    ],
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['getcustomvariables'],
      },
    },
    routing: {
      request: {
        qs: {
          'filter[slug]': '={{$value.slugFilter}}',
          'filter[type]': '={{$value.typeFilter}}',
          'filter[variable_group_name]': '={{$value.variableGroupNameFilter}}',
        },
      },
    },
  },
];
