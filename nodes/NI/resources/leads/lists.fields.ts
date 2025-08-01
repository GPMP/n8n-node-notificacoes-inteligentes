import type { INodeProperties } from 'n8n-workflow';

export const listsFields: INodeProperties[] = [
  {
    displayName: 'Incluir Relacionamentos',
    name: 'parameteraddlist',
    type: 'multiOptions',
    placeholder: 'Escolha',
    options: [
      {
        name: 'Fonte (Source)',
        value: 'source'
      },
      {
        name: 'Contagem De Leads',
        value: 'leadsCount'
      },
    ],
    default: [],
    description: 'Selecione quais relacionamentos devem ser incluídos na requisição (ex: fonte, contagem de leads)',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['getAlllists']
      }
    },
  },
  {
    displayName: 'Mais Propriedades',
    name: 'properties',
    type: 'multiOptions',
    placeholder: 'Escolha',
    options: [
      {
        name: 'Contém Leads',
        value: 'has_leads',
      },
    ],
    default: [],
    description: 'Selecione a propriedade da lista para filtrar',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['getAlllists']
      }
    },
  },
  {
    displayName: 'ID(s) Do(s) Lead(s)',
    name: 'id',
    type: 'string',
    required: true,
    placeholder: 'Exemplo: 17, 25, 33',
    default: '',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['addLEADS', 'removeLEADS'],
      },
    },
    description: 'O identificador único do lead',
  },
  {
    displayName: 'Filtros',
    name: 'listfilters',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      {
        displayName: 'Nome',
        name: 'nameFilter',
        type: 'string',
        default: '',
        description: 'Filtra as listas pelo nome',
      },
      {
        displayName: 'Tipo',
        name: 'typeFilter',
        type: 'string',
        default: '',
        description: 'Filtra as listas pelo tipo',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['getAlllists']
      }
    },
    description: 'Defina filtros para buscar listas específicas',
  },
  {
    displayName: 'ID Da Lista',
    name: 'listID',
    type: 'string',
    required: true,
    default: '',
    description: 'O identificador único da lista',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['getList', 'listLeads', 'addLEADS', 'removeLEADS', 'deleteList']
      }
    },
  },
  {
    displayName: 'Nome Da Lista',
    name: 'listName',
    type: 'string',
    required: true,
    default: '',
    description: 'O nome da nova lista a ser criada',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['createList']
      }
    },
  },
  {
    displayName: 'Incluir Detalhes Da Fonte',
    name: 'parameteraddlist2',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      {
        displayName: 'Detalhe A Incluir',
        name: 'parameterchoose',
        type: 'options',
        options: [
          {
            name: 'Fonte',
            value: 'source',
          },
        ],
        default: 'source',
        description: 'Selecione o detalhe da fonte a ser incluído na requisição',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['getList']
      }
    },
    description: 'Parâmetros adicionais para buscar detalhes da fonte da lista',
  },
  {
    displayName: 'Incluir Relacionamentos',
    name: 'parameteraddlist3',
    type: 'multiOptions',
    placeholder: 'Escolha',
    options: [
      {
        name: 'Listas',
        value: 'lists',
      },
      {
        name: 'Fonte Das Listas',
        value: 'lists.source',
      },
    ],
    default: [],
    description: 'Parâmetros adicionais para incluir relacionamentos dos leads da lista',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['listLeads']
      }
    },
  },
  {
    displayName: 'Filtrar Leads Da Lista Por:',
    name: 'filterlist',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      {
        displayName: 'Nome Do Lead',
        name: 'namefilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo nome dentro da lista',
      },
      {
        displayName: 'Telefone Do Lead',
        name: 'phonefilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo número de telefone dentro da lista',
      },
      {
        displayName: 'Email Do Lead',
        name: 'emailfilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo endereço de e-mail dentro da lista',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['listLeads']
      }
    },
    description: 'Defina filtros para buscar leads específicos dentro da lista',
  },
]
