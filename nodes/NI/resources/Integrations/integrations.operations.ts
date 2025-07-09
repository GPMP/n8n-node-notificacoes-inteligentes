import type { INodeProperties } from 'n8n-workflow';

export const integrationsOperations: INodeProperties[] =[
{

	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['integration'],
		},
	},
	options: [
		{
			name: 'Criar Nova Integração',
			value: 'createintegration',
			action: 'Create a integration',
			description: 'Cria uma Nova Integração',
			routing: {
				request: {
					method: 'POST',
					url: '/integrations',
					body: {
						name: '={{$parameter.name}}',
						platform: '={{$parameter.platform}}'
					},
				},
			},
		},
		{
			name: 'Buscar Todas Integrações',
			value: 'getAllIntegrations',
			action: 'Get all integrations',
			description: 'Mostra Todas as Integrações',
			routing: {
				request: {
					method: 'GET',
					url: '/integrations',
				},
			},
		},
		{
			name: 'Buscar uma Integração',
			value: 'getintegration',
			action: 'Search for  a integration',
			description: 'Busca uma Determinada Integração Específica',
			routing: {
				request: {
					method: 'GET',
					url: '=/integrations/{{$parameter.id}}',

					qs: {
						  append: '={{$parameter.parameteraddintegration}}'
					},
					body: {
					},
				},
			},
		},
		{
			name: 'Mudar o Nome de uma Integração',
			value: 'updateintegration',
			action: 'Update integration',
			description: 'Muda o nome de uma Integração',
			routing: {
				request: {
					method: 'PUT',
					url: '=/integrations/{{$parameter.id}}',
					body: {
						name: '={{$parameter.newname}}',
					},
				},
			},
		},


	],
	default:'Escolha uma Opção',
},
];
