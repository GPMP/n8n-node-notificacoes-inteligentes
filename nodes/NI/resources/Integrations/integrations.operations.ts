/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */
import type { INodeProperties } from 'n8n-workflow';

export const integrationsOperations: INodeProperties[] = [
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
    options:[
      {
        name: 'Apagar Uma Integração',
        value: 'delete_integration',
        action: 'Excluir Integração',
        description: 'Remove Uma Integração',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/integrations/{{$parameter.id}}',
          },
					output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Integração apagada com sucesso!',
												response: response.body
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível excluir a integração'}`
                );
              },
            ],
          },

        },
      },
      {
  name: 'Buscar Todas Integrações',
  value: 'get_all_integrations',
  action: 'Buscar Todas Integrações',
  description: 'Mostra todas as integrações',
  routing: {
  request: {
    method: 'GET',
    url: '/integrations',
  },
  operations: {
    pagination: {
      type: 'generic',
      properties: {
        continue: '={{!!$response.body?.links?.next}}',
        request: {
          qs: {
            page: '={{Number($response.body?.meta?.current_page || 0) + 1 }}'
          },
        },
      },
    },
  },
  send: { paginate: true },
  output: {
    postReceive: [
      { type: 'rootProperty', properties: { property: 'data' } }, // concatena todas as páginas
    ],
  },
}
},
{
  name: 'Criar Integração',
  value: 'create_integration',
  action: 'Criar Integração',
  description: 'Cria uma nova integração ou edita o nome de uma existente',
			routing:{
				request:{
					method:'POST',
					url:'/integrations',
				},
				output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Integração criada com sucesso!',
												data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível criar a integração'}`
                );
              },
            ],
          },
			}
},
{
  name: 'Editar Nome Da Integração',
  value: 'edit_integration',
  action: 'Editar Integração',
  description: 'Cria uma nova integração ou edita o nome de uma existente',
			routing:{
				request:{
					method:'PUT',
					url:'=/integrations/{{$parameter.id}}',
				},
				output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Integração editada com sucesso!',
												data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível editar a integração'}`
                );
              },
            ],
          },
			}
},
{
  name: 'Buscar Integração',
  value: 'get_integration',
  action: 'Busca Uma Integração',
  description: 'Busca uma integração pelo seu ID',
			routing:{
				request:{
					method:'GET',
					url:'=/integrations/{{$parameter.id}}',
				}
			}
}
    ],
    default: 'create_integration',
  },
];
