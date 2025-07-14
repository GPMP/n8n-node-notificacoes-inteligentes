import type { INodeProperties } from 'n8n-workflow';



export const accountmanagementoperations:INodeProperties[] =

[
	{

		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['accountmanagement'],
			},
		},
		options: [

			{
				name: 'Buscar Endereço',
				value: 'searchaddress',
				action: 'Busca CEP',
				description: 'Busca o Endereço Referente ao CEP',
				routing: {
					request: {
						method: 'GET',
						url: '=/addresses/{{$parameter.postalcode}}',
					},
				},
			},

		],
		default: 'searchaddress'
	}
]
