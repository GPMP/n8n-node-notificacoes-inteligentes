import type { INodeProperties } from 'n8n-workflow';

export const leadsFields: INodeProperties[] = [
  {
    displayName: 'ID do Lead',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads','leadslist'],
        operation: ['getonelead', 'editlead','deletelead','addlist','addlisttolead','removelisttolead'],
      },
    },
    description: 'O identificador único do lead.',
  },
  {
    displayName: 'Nome',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['createLead', 'editlead','deletegroup'],
      },
    },
    description: 'O nome completo do lead.',
  },
  {
    displayName: 'Telefone',
    name: 'phone',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['createLead'],
      },
    },
    description: 'O número de telefone do lead, incluindo o DDD.',
  },
  {
    displayName: 'E-mail',
    name: 'email',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['createLead', 'editlead'],
      },
    },
    description: 'O endereço de e-mail do lead.',
  },
  {
    displayName: 'Notas',
    name: 'notes',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['createLead','editlead'],
      },
    },
    description: 'Notas adicionais ou observações sobre o lead.',
  },
  {
    displayName: 'Variáveis Customizadas',
    name: 'customVariables',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    placeholder: 'Adicionar Variável',
		required:false,
    default: [],
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['createLead', 'editlead'],
      },
    },
    options: [
      {
        name: 'variable',
        displayName: 'Variável',
        values: [
          {
            displayName: 'Slug',
            name: 'slug',
            type: 'string',
            default: '',
            description: 'O slug da variável customizada a ser editada.',
          },
          {
            displayName: 'Valor',
            name: 'value',
            type: 'string',
            default: '',
            description: 'O valor a ser atribuído à variável customizada.',
          },
        ],
      },
    ],
  },
	{
    displayName: 'Tags',
    name: 'addtags',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    placeholder: 'Adicionar Tags',
    default: [''],
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['createLead','createList'],
      },
    },
    options: [
      {
        name: 'optiontags',
        displayName: 'Adicionar Tags',
        values: [
          {
            displayName: 'Tags',
            name: 'tags1',
            type: 'string',
            default: '',
            description: 'O slug da variável customizada a ser editada.',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Filtros',
    name: 'filters',
    type: 'collection',
    default: {},
		placeholder:'Escolha',
    options: [
      {
        displayName: 'Nome',
        name: 'namefilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo nome.',
      },
      {
        displayName: 'Telefone',
        name: 'phonefilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo número de telefone.',
      },
      {
        displayName: 'E-mail',
        name: 'emailfilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo endereço de e-mail.',
      },
      {
        displayName: 'Tag ID',
        name: 'tagfilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo ID da tag.',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['getAll']
      }
    },
    description: 'Defina filtros para buscar leads específicos.',
  },
  {
    displayName: 'Incluir Relacionamentos',
    name: 'aditionalfilter',
    type: 'multiOptions',
    options: [
      {
        name: 'Listas',
        value: 'lists',
      },
      {
        name: 'Fonte das Listas',
        value: 'lists.source',
      },
      {
        name: 'Tags',
        value: 'tags',
      },
      {
        name: 'Usuários',
        value: 'users',
      },
    ],
    default: [],
    description: 'Selecione quais relacionamentos devem ser incluídos na requisição (ex: listas, tags, usuários).',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['getAll','getonelead']
      }
    },
  },
  {
    displayName: 'ID(s) da(s) Lista(s)',
    name: 'listsid',
		placeholder:'1234, 5678, 9101112',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['addlisttolead','removelisttolead'],
      },
    },
    description: 'O(s) ID(s) da(s) lista(s) para associar ou remover do lead.',
  }
];
