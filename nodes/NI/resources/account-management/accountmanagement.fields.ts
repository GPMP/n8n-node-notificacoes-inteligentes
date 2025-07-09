import type { INodeProperties } from 'n8n-workflow';


export const accountmanagementfields:INodeProperties[]=
[
	{
    displayName: 'Código Postal',
    name: 'postalcode',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['accountmanagement'],
        operation: ['searchaddress'],
      },
    },
    description: 'Digite o CEP',
  },

]
