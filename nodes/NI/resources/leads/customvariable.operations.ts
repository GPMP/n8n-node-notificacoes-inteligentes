import type { INodeProperties } from 'n8n-workflow';

export const customvariableoperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['customvariables'],
      },
    },
    options: [
      {
        name: 'Criar Variável Customizada',
        value: 'createcustomvariable',
        action: 'Criar variavel',
        description: 'Cria uma nova variável customizada no sistema',
        routing: {
          request: {
            method: 'POST',
            url: '/organizations/custom-variables',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Variável customizada criada com sucesso!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível criar a variável'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Buscar Todas as Variáveis Customizadas',
        value: 'getcustomvariables',
        action: 'Buscar variaveis',
        description: 'Busca e retorna todas as variáveis customizadas disponíveis',
        routing: {
          request: {
            method: 'GET',
            url: '/organizations/custom-variables',
          },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{!!$response.body?.links?.next}}',
                request: {
                  qs: {
                    include: '={{$request.qs.include}}',
                    'filter[slug]': '={{$request.qs["filter[slug]"]}}',
                    'filter[type]': '={{$request.qs["filter[type]"]}}',
                    'filter[variable_group_name]': '={{$request.qs["filter[variable_group_name]"]}}',
                    page: '={{Number($response.body?.meta?.current_page || 0) + 1 }}',
                    per_page: '={{ $request.qs.per_page }}',
                  },
                },
              },
            },
          },
        },
      },
      {
        name: 'Buscar Variável Customizada Por ID',
        value: 'getvariable',
        action: 'Buscar variavel',
        description: 'Busca e retorna uma variável customizada específica utilizando seu ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/organizations/custom-variables/{{$parameter.customVariableId}}',
          },
        },
      },
      {
        name: 'Editar Variável Customizada',
        value: 'updatecustomvariable',
        action: 'Editar variavel',
        description: 'Edita as propriedades de uma variável customizada existente',
        routing: {
          request: {
            method: 'PUT',
            url: '=/organizations/custom-variables/{{$parameter.customvariableid}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Variável editada com sucesso!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível editar a variável'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Apagar Variável Customizada',
        value: 'deletecustomvariable',
        action: 'Excluir variavel',
        description: 'Apaga uma variável customizada do sistema de forma permanente',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/organizations/custom-variables/{{$parameter.customvariableid}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Variável apagada com sucesso!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível excluir a variável'}`
                );
              },
            ],
          },
        },
      },
    ],
    default: 'createcustomvariable',
  },
];
