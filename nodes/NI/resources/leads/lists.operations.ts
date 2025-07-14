import type { INodeProperties } from 'n8n-workflow';

export const listsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['leadslist'],
      },
    },
    options: [
      {
        name: 'Criar Lista',
        value: 'createList',
        action: 'Criar lista',
        description: 'Cria uma nova lista de contatos no sistema',
        routing: {
          request: {
            method: 'POST',
            url: '/lists',
            body: {
              name: '={{$parameter.listName}}',
              tags: '={{ $parameter.addtags.optiontags.map(v => (v.tags1)) }}',
              type: 'dynamic'
            },
          },
        },
      },
      {
        name: 'Buscar Todas as Listas',
        value: 'getAlllists',
        action: 'Buscar listas',
        description: 'Busca e retorna todas as listas de contatos existentes',
        routing: {
          request: {
            method: 'GET',
            url: '/lists',
            qs: {
              include: '={{$parameter.parameteraddlist}}',
              append: '={{$parameter.properties}}',
              'filter[name]': '={{$parameter.listfilters.nameFilter}}',
              'filter[type]': '={{$parameter.listfilters.typeFilter}}',
            },
          },
        },
      },
      {
        name: 'Buscar Lista Por ID',
        value: 'getList',
        action: 'Buscar lista',
        description: 'Busca e exibe uma lista de contatos específica utilizando seu ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/lists/{{$parameter.listID}}',
            qs: {
              include: '={{$parameter.parameteraddlist2.parameterchoose}}',
            },
          },
        },
      },
      {
        name: 'Apagar Lista Por ID',
        value: 'deleteList',
        action: 'Excluir lista',
        description: 'Remove uma lista de contatos específica utilizando seu ID',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/lists/{{$parameter.listID}}',
          },
        },
      },
      {
        name: 'Listar Leads Da Lista',
        value: 'listLeads',
        action: 'Listar leads da lista',
        description: 'Lista todos os leads pertencentes a uma lista específica',
        routing: {
          request: {
            method: 'GET',
            url: '=/lists/{{$parameter.listID}}/leads',
            qs: {
              include: '={{$parameter.parameteraddlist3}}',
              'filter[name]': '={{$parameter.filterlist.namefilter}}',
              'filter[phone]': '={{$parameter.filterlist.phonefilter}}',
              'filter[email]': '={{$parameter.filterlist.emailfilter}}',
            },
          },
        },
      },
      {
        name: 'Adicionar Leads À Lista',
        value: 'addLEADS',
        action: 'Adicionar leads a lista',
        description: 'Adiciona um ou mais leads a uma lista específica',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listID}}/leads/attach',
            body: {
              leads:
                '={{String($parameter.id).split(",").map(item => parseInt(item.trim(), 10)).filter(id => Number.isFinite(id) && id > 0)}}',
            },
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                const idsRaw = this.getNodeParameter('id', 0);
                const idsString = (typeof idsRaw === 'string' ? idsRaw : String(idsRaw)).trim();

                const arrayIds = idsString
                  .split(',')
                  .map(item => parseInt(item.trim(), 10))
                  .filter(id => Number.isFinite(id) && id > 0);

                if (!arrayIds.length) {
                  throw new Error('ID incompatível ou nulo. Informe pelo menos um LEAD ID válido.');
                }
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Lead(s) adicionado(s) com sucesso!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível adicionar o lead'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Remover Leads Da Lista',
        value: 'removeLEADS',
        action: 'Remover leads da lista',
        description: 'Remove um ou mais leads de uma lista específica',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listID}}/leads/detach',
            body: {
              leads:
                '={{String($parameter.id).split(",").map(item => parseInt(item.trim(), 10)).filter(id => Number.isFinite(id) && id > 0)}}',
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
                        message: 'Lead(s) removidos(s) com sucesso!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Erro ${response.statusCode}: ${response.body?.message || 'Ops! Não foi possível remover o(s) lead(s)'}`
                );
              },
            ],
          },
        },
      },
    ],
    default: 'createList',
  },
];
