import type { INodeProperties } from 'n8n-workflow';

export const listsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['leadslist'] },
    },
    options: [
      {
        name: 'Criar Lista',
        value: 'createList',
        action: 'Criar lista',
        description: 'Cria uma nova lista de contatos no sistema',
        routing: {
          request: { method: 'POST', url: '/lists' },
          output: {
            postReceive: [
              async function (this, items, response) {
                if ([200, 201, 204].includes(response.statusCode)) {
                  return [{ json: { success: true, message: 'Lista criada com sucesso!', response: response.body } }];
                }
                throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível criar a lista'}`);
              },
            ],
          },
        },
      },
      {
        name: 'Buscar Todas as Listas',
        value: 'getAllLists',
        action: 'Buscar listas',
        description: 'Busca e retorna todas as listas de contatos existentes',
        routing: {
          request: { method: 'GET', url: '/lists' },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{ !!$response.body?.links?.next }}',
                request: {
                  qs: {
                    page: '={{ Number($response.body?.meta?.current_page || 0) + 1 }}',
                    include: '={{ $request.qs.include}}',
                    append: '={{ $request.qs.append }}',
                    'filter[name]': '={{ $request.qs["filter[name]"] }}',
                    'filter[type]': '={{ $request.qs["filter[type]"] }}',
                  },
                },
              },
            },
          },
          send: { paginate: true },
          output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] },
        },
      },

      {
        name: 'Buscar Lista Por ID',
        value: 'getList',
        action: 'Buscar lista',
        description: 'Busca e exibe uma lista de contatos específica utilizando seu ID',
        routing: {
          request: { method: 'GET', url: '=/lists/{{$parameter.listId}}' },
        },
      },

      {
        name: 'Apagar Lista Por ID',
        value: 'deleteList',
        action: 'Excluir lista',
        description: 'Remove uma lista de contatos específica utilizando seu ID',
        routing: {
          request: { method: 'DELETE', url: '=/lists/{{$parameter.listId}}' },
					output: {
            postReceive: [
              async function (this, items, response) {
                if ([200, 201, 204].includes(response.statusCode)) {
                  return [{ json: { success: true, message: 'Lista apagada com sucesso!', response: response.body } }];
                }
                throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível apagar a lista'}`);
              },
            ],
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
			url: '=/lists/{{$parameter.listId}}/leads'
    },
    operations: {
      pagination: {
        type: 'generic',
        properties: {
          continue: '={{ !!$response.body?.links?.next }}',
          request: {
            qs: {
              page: '={{ Number($response.body?.meta?.current_page ?? $request.qs?.page ?? 0) + 1 }}',
              include:'={{ $request.qs.include }}',
              'filter[name]': '={{ $request.qs["filter[name]"] }}',
              'filter[phone]':'={{ $request.qs["filter[phone]"] }}',
              'filter[email]':'={{ $request.qs["filter[email]"] }}',
            },
          },
        },
      },
    },
    send: { paginate: true },
    output: {
      postReceive: [
        { type: 'rootProperty', properties: { property: 'data' } },
      ],
    },
  },
},
      {
        name: 'Adicionar Leads À Lista',
        value: 'addLeads',
        action: 'Adicionar leads a lista',
        description: 'Adiciona um ou mais leads a uma lista específica',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listId}}/leads/attach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                const idsRaw = this.getNodeParameter('leadIds', 0);
                const idsString = (typeof idsRaw === 'string' ? idsRaw : String(idsRaw)).trim();
                const arr = idsString.split(',').map(i => parseInt(i.trim(), 10)).filter(n => Number.isFinite(n) && n > 0);
                if (!arr.length) throw new Error('ID incompatível ou nulo. Informe pelo menos um LEAD ID válido.');
                if ([200, 204].includes(response.statusCode)) return [{ json: { success: true, message: 'Lead(s) adicionado(s) com sucesso!' } }];
                throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível adicionar o lead'}`);
              },
            ],
          },
        },
      },

      {
        name: 'Remover Leads Da Lista',
        value: 'removeLeads',
        action: 'Remover leads da lista',
        description: 'Remove um ou mais leads de uma lista específica',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listId}}/leads/detach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if ([200, 204].includes(response.statusCode)) return [{ json: { success: true, message: 'Lead(s) removido(s) com sucesso!' } }];
                throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Ops! Não foi possível remover o(s) lead(s)'}`);
              },
            ],
          },
        },
      },
    ],
    default: 'createList',
  },
];
