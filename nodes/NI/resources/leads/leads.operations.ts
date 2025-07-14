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
        name: 'Criar Lead',
        value: 'createLead',
        action: 'Criar lead',
        description: 'Cria um novo lead no sistema',
        routing: {
          request: {
            method: 'POST',
            url: '/leads',
            body: {
              name: '={{$parameter.name}}',
              phone: '={{$parameter.phone}}',
              email: '={{$parameter.email}}',
              notes: '={{$parameter.notes}}',
              tags: '={{ $parameter.addtags.optiontags.map(v => (v.tags1)) }}',
              custom_variables_to_add_or_update:
                '={{ $parameter.customVariables.variable.map(variable => ({ slug: variable.slug, value: variable.value })) }}',
            },
          },
        },
      },
      {
        name: 'Buscar Todos Os Leads',
        value: 'getAll',
        action: 'Buscar leads',
        description: 'Lista todos os leads existentes no sistema',
        routing: {
          request: {
            method: 'GET',
            url: '/leads',
            qs: {
              include: '={{$parameter.aditionalfilter}}',
              'filter[name]': '={{$parameter.filters.namefilter}}',
              'filter[phone]': '={{$parameter.filters.phonefilter}}',
              'filter[email]': '={{$parameter.filters.emailfilter}}',
              'filter[tags]': ['={{$parameter.filters.tagfilter}}'],
            },
          },
        },
      },
      {
        name: 'Buscar Lead Por ID',
        value: 'getonelead',
        action: 'Buscar lead',
        description: 'Busca um lead específico utilizando seu identificador único (ID)',
        routing: {
          request: {
            method: 'GET',
            url: '=/leads/{{$parameter.id}}',
            qs: { include: '={{$parameter.aditionalfilter}}' },
          },
        },
      },
      {
        name: 'Apagar Lead',
        value: 'deletelead',
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
        name: 'Editar Lead',
        value: 'editlead',
        action: 'Editar lead',
        description: 'Edita as informações de um lead existente',
        routing: {
          request: {
            method: 'PUT',
            url: '=/leads/{{$parameter.id}}',
            body: {
              name: '={{$parameter.name}}',
              email: '={{$parameter.email}}',
              notes: '={{$parameter.notes}}',
              custom_variables_to_add_or_update:
                '={{ $parameter.customVariables.variable.map(variable => ({ slug: variable.slug, value: variable.value })) }}',
            },
          },
        },
      },
      {
        name: 'Adicionar Listas A Um Lead',
        value: 'addlisttolead',
        action: 'Adicionar listas ao lead',
        description: 'Adiciona as listas informadas a um lead específico',
        routing: {
          request: {
            method: 'POST',
            url: '=/leads/{{$parameter.id}}/lists/attach',
            body: {
              lists: '={{$parameter.listsid.split(",").map(item => parseInt(item.trim(), 10))}}',
            },
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
        value: 'removelisttolead',
        action: 'Remover listas do lead',
        description: 'Remove as listas informadas de um contato específico',
        routing: {
          request: {
            method: 'POST',
            url: '=/leads/{{$parameter.id}}/lists/detach',
            body: {
              lists: '={{$parameter.listsid.split(",").map(item => parseInt(item.trim(), 10))}}',
            },
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
    default: 'createLead',
  },
];
