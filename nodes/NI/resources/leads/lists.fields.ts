import type { INodeProperties } from 'n8n-workflow';

export const listsFields: INodeProperties[] = [
  // getAllLists — include (source | leadsCount)
  {
    displayName: 'Incluir Relacionamentos',
    name: 'include',
    type: 'multiOptions',
    placeholder: 'Escolha',
    options: [
      { name: 'Fonte (Source)', value: 'source' },
      { name: 'Contagem De Leads', value: 'leadsCount' },
    ],
    default: [],
    description: 'Relacionamentos a incluir na requisição',
    displayOptions: { show: { resource: ['leadslist'], operation: ['getAllLists'] } },
		routing:{request:{qs:{include:'={{$value}}'}}}
  },

  // getAllLists — append (has_leads)
  {
    displayName: 'Mais Propriedades',
    name: 'append',
    type: 'multiOptions',
    placeholder: 'Escolha',
    options: [{ name: 'Contém Leads', value: 'has_leads' }],
    default: [],
    description: 'Propriedades a incluir na resposta',
    displayOptions: { show: { resource: ['leadslist'], operation: ['getAllLists'] } },
		routing:{request:{qs:{append:'={{$value}}'}}}
  },

  // getAllLists — filtros
  {
    displayName: 'Filtros',
    name: 'filters',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      { displayName: 'Nome', name: 'nameFilter', type: 'string', default: '', description: 'Filtra as listas pelo nome' },
      { displayName: 'Tipo', name: 'typeFilter', type: 'string', default: '', description: 'Filtra as listas pelo tipo' },
    ],
    displayOptions: { show: { resource: ['leadslist'], operation: ['getAllLists'] } },
    description: 'Defina filtros para buscar listas específicas',
		routing:{request:{qs:{'filter[name]': '={{ $value.nameFilter }}','filter[type]': '={{ $value.typeFilter }}',}}}
  },


  // listId usado por várias operações
  {
    displayName: 'ID Da Lista',
    name: 'listId',
    type: 'string',
    required: true,
    default: '',
    description: 'O identificador único da lista',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['getList', 'listLeads', 'deleteList', 'addLeads', 'removeLeads'],
      },
    },
  },

  // addLeads/removeLeads — IDs de leads
  {
    displayName: 'Leads (IDs)',
    name: 'leadIds',
    type: 'string',
    required: true,
    placeholder: 'Exemplo: 17, 25, 33',
    default: '',
    description: 'Identificadores de leads a serem adicionados/removidos',
    displayOptions: { show: { resource: ['leadslist'], operation: ['addLeads', 'removeLeads'] } },
		routing:{request:{qs:{body: {leads:'={{ String($parameter.leadIds).split(",").map(i => parseInt(i.trim(), 10)).filter(id => Number.isFinite(id) && id > 0) }}',},}}}
  },

  // createList — nome + type dinâmico (no body)
  {
    displayName: 'Nome Da Lista',
    name: 'listName',
    type: 'string',
    required: true,
    default: '',
    description: 'O nome da nova lista a ser criada',
    displayOptions: { show: { resource: ['leadslist'], operation: ['createList'] } },
    routing: {
      request: {
        body: {
          name: '={{ $value }}',
          type: '={{ "dynamic" }}', // estático e oculto ao usuário
        },
      },
    },
  },

  // getList — include=source
  {
    displayName: 'Incluir Detalhes Da Fonte',
    name: 'includeSource',
    type: 'options',
    placeholder: 'Escolha',
    options: [{ name: 'Fonte', value: 'source' }],
    default: 'source',
    description: 'Parâmetros adicionais para buscar detalhes da fonte da lista',
    displayOptions: { show: { resource: ['leadslist'], operation: ['getList'] } },
    routing: { request: { qs: { include: '={{ $value }}' } } },
  },

  // listLeads — include extra
  {
  displayName: 'Incluir Relacionamentos',
  name: 'includeRelations',
  type: 'multiOptions',
  options: [
    { name: 'Listas', value: 'lists' },
    { name: 'Fonte Das Listas', value: 'lists.source' },
  ],
  default: [],
  displayOptions: { show: { resource: ['leadslist'], operation: ['listLeads'] } },
  routing: { send: { type: 'query', property: 'include' } },
},

  // listLeads — filtros
  {
  displayName: 'Filtrar Leads a Lista Por:',
  name: 'leadFilters',
  type: 'collection',
  default: {},
  options: [
    { displayName: 'Nome Do Lead',   name: 'nameFilter',  type: 'string', default: '' },
    { displayName: 'Telefone Do Lead', name: 'phoneFilter', type: 'string', default: '' },
    { displayName: 'Email Do Lead',  name: 'emailFilter', type: 'string', default: '' },
  ],
  displayOptions: { show: { resource: ['leadslist'], operation: ['listLeads'] } },
  routing: {
    request: {
      qs: {
        'filter[name]':  '={{ $value.nameFilter || undefined }}',
        'filter[phone]': '={{ $value.phoneFilter || undefined }}',
        'filter[email]': '={{ $value.emailFilter || undefined }}',
      },
    },
  },
}
];
