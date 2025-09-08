import type { INodeProperties } from 'n8n-workflow';

export const variablegroupsfields: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['createlist'],
      },
    },
    description: 'Name of the variable group',
    routing: { send: { type: 'body', property: 'name' } },
  },
  {
    displayName: 'Group ID',
    name: 'groupid',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getgroup', 'updategroup', 'deletegroup'],
      },
    },
    description: 'Unique identifier of the variable group',
    routing: { send: { type: 'body', property: 'group_id' } },
  },
  {
    displayName: 'New Group Name',
    name: 'newname',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['updategroup'],
      },
    },
    description: 'New name to assign to the variable group',
    routing: { send: { type: 'body', property: 'name' } },
  },
  {
    displayName: 'Include Relationships',
    name: 'parameteradd',
    type: 'multiOptions',
    options: [
      { name: 'Organization', value: 'organization' },
      { name: 'Author', value: 'author' },
      { name: 'Last Edited By', value: 'lastEditedBy' },
    ],
    default: [],
    description: 'Select which optional relationships to include in the request',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getgroup', 'getlists'],
      },
    },
    routing: { send: { type: 'query', property: 'include' } },
  },
  {
    displayName: 'Filters',
    name: 'variablefilter',
    type: 'collection',
    placeholder: 'Choose',
    default: {},
    options: [
      {
        displayName: 'Name',
        name: 'namefilter',
        type: 'string',
        default: '',
        description: 'Filter by name',
      },
    ],
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getlists'],
      },
    },
    description: 'Set filters to search for specific variable groups in the list',
    routing: { request: { qs: { 'filter[name]': '={{$value.namefilter}}' } } },
  },
];
