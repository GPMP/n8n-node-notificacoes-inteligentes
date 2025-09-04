/* eslint-disable n8n-nodes-base/node-param-option-name-wrong-for-get-many */
import type { INodeProperties } from 'n8n-workflow';

export const leadsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['leads'],
      },
    },
    options: [

      {
        name: 'Buscar Todos Os Leads',
        value: 'get_all_leads',
        action: 'Buscar leads',
        description: 'Lista todos os leads existentes no sistema',
        routing: {
          request: {
            method: 'GET',
            url: '/leads',
          },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{!!$response.body?.links?.next}}',
                request: {
                  qs: {
                    page: '={{Number($response.body?.meta?.current_page || 0) + 1 }}',
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
        },
      },
      {
        name: 'Buscar Lead Por ID',
        value: 'get_lead',
        action: 'Buscar lead',
        description: 'Busca um lead específico utilizando seu identificador único (ID)',
        routing: {
          request: {
            method: 'GET',
            url: '=/leads/{{$parameter.id}}',
          },
        },
      },
      {
        name: 'Apagar Lead',
        value: 'delete_lead',
        action: 'Excluir lead',
        description: 'Apaga um lead permanentemente do sistema',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/leads/{{$parameter.id}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Contato apagado com sucesso!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível excluir o contato'}`
                );
              },
            ],
          },
        },
      },
{
  name: 'Criar/editar Lead',
  value: 'manage_lead',
  action: 'Criar ou editar lead',
  description: 'Cria um novo lead ou edita um existente',
  routing: {
    send: {
      preSend: [
        async function (this, requestOptions) {
          const id = this.getNodeParameter('id', 0) as string;
          const isUpdate = id && id.trim() !== '';

          if (isUpdate) {
            // Modo UPDATE - editar lead existente
            requestOptions.method = 'PUT';
            requestOptions.url = `/leads/${id}`;

            // Para update, você pode querer enviar todos os campos ou apenas os alterados
            requestOptions.body = {
              name: this.getNodeParameter('name', 0) as string,
              phone: this.getNodeParameter('phone', 0) as string,
              email: this.getNodeParameter('email', 0) as string,
              notes: this.getNodeParameter('notes', 0) as string,
            };

            // Adicionar tags se fornecidas
            const tagsParam = this.getNodeParameter('addtags', 0) as any;
            if (tagsParam && tagsParam.optiontags && Array.isArray(tagsParam.optiontags)) {
              const tags = tagsParam.optiontags.map((tag: any) => tag.tags1).filter(Boolean);
              if (tags.length > 0) {
                requestOptions.body.tags = tags;
              }
            }

            // Adicionar variáveis customizadas se fornecidas
            const customVarsParam = this.getNodeParameter('customVariables', 0) as any;
            if (customVarsParam && customVarsParam.variable && Array.isArray(customVarsParam.variable)) {
              const customVars = customVarsParam.variable.map((v: any) => ({
                slug: v.slug,
                value: v.value
              }));
              if (customVars.length > 0) {
                requestOptions.body.custom_variables_to_add_or_update = customVars;
              }
            }

          } else {
            // Modo CREATE - criar novo lead
            requestOptions.method = 'POST';
            requestOptions.url = '/leads';

            requestOptions.body = {
              name: this.getNodeParameter('name', 0) as string,
              phone: this.getNodeParameter('phone', 0) as string,
              email: this.getNodeParameter('email', 0) as string,
              notes: this.getNodeParameter('notes', 0) as string,
            };

            // Adicionar tags
            const tagsParam = this.getNodeParameter('addtags', 0) as any;
            if (tagsParam && tagsParam.optiontags && Array.isArray(tagsParam.optiontags)) {
              const tags = tagsParam.optiontags.map((tag: any) => tag.tags1).filter(Boolean);
              requestOptions.body.tags = tags;
            }

            // Adicionar variáveis customizadas
            const customVarsParam = this.getNodeParameter('customVariables', 0) as any;
            if (customVarsParam && customVarsParam.variable && Array.isArray(customVarsParam.variable)) {
              const customVars = customVarsParam.variable.map((v: any) => ({
                slug: v.slug,
                value: v.value
              }));
              requestOptions.body.custom_variables = customVars;
            }
          }

          return requestOptions;
        }
      ]
    },
    output: {
      postReceive: [
        async function (this, items, response) {
          const id = this.getNodeParameter('id', 0) as string;
          const isUpdate = id && id.trim() !== '';
          const isCreate = !isUpdate;

          // Verifica se a operação foi bem-sucedida
          const isSuccess = isCreate
            ? response.statusCode === 201
            : (response.statusCode === 200 || response.statusCode === 204);

          if (isSuccess) {
            return [
              {
                json: {
                  success: true,
                  message: isCreate
                    ? 'Lead criado com sucesso!'
                    : 'Lead editado com sucesso!',
                  data: response.body,
                  operation: isCreate ? 'create' : 'update',
                },
              },
            ];
          }

          // Em caso de erro
          return [
            {
              json: {
                success: false,
                message: isCreate
                  ? `Não foi possível criar o lead: ${response.body?.message || 'Erro desconhecido'}`
                  : `Não foi possível editar o lead: ${response.body?.message || 'Erro desconhecido'}`,
                errorCode: response.statusCode,
                errorData: response.body,
                operation: isCreate ? 'create' : 'update',
              },
            },
          ];
        },
      ],
    },
  },
},
      {
        name: 'Adicionar Listas A Um Lead',
        value: 'add_list_lead',
        action: 'Adicionar listas ao lead',
        description: 'Adiciona as listas informadas a um lead específico',
        routing: {
          request: {
            method: 'POST',
            url: '=/leads/{{$parameter.id}}/lists/attach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Lead adicionado com sucesso!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível remover o lead'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Remover Listas De Um Lead',
        value: 'remove_list_lead',
        action: 'Remover listas do lead',
        description: 'Remove as listas informadas de um contato específico',
        routing: {
          request: {
            method: 'POST',
            url: '=/leads/{{$parameter.id}}/lists/detach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Listas foram removidas com sucesso!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Ops! Não foi possível remover as listas do lead'}`
                );
              },
            ],
          },
        },
      },
    ],
    default: 'manage_lead',
  },
];
