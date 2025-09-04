import type { INodeProperties } from 'n8n-workflow';
export const leadsFields: INodeProperties[] = [
  {
    displayName: 'ID Do Lead',
    name: 'id',
    type: 'string',
		required:true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads','leadslist'],
        operation: ['get_lead','delete_lead','addlist','addlisttolead','removelisttolead'],
      },
    },
    description: 'Identificado do Lead',
  },
  {
    displayName: 'Modo De Operação',
    name: 'operationMode',
    type: 'options',
    options: [
      { name: 'Criar Novo Lead', value: 'create' },
      { name: 'Editar Lead Existente', value: 'update' }
    ],
    default: 'create',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['manage_lead'],
      },
    },
    description: 'Escolha se deseja criar um novo lead ou editar um existente',
  },
	{
    displayName: 'ID Do Lead',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['manage_lead'],
        operationMode: ['update'],
      },
    },
    description: 'O identificador único do lead a ser editado',
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
        operation: ['manage_lead','deletegroup'],
      },
    },
    routing: { send: { type: 'body', property: 'name' } },
    description: 'O nome completo do lead',
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
        operation: ['manage_lead'],
        operationMode: ['create'],
      },
    },
    routing: { send: { type: 'body', property: 'phone' } },
    description: 'O número de telefone do lead, incluindo o DDD (obrigatório para criar)',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
		required:true,
    placeholder: 'name@email.com',
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['manage_lead'],
				operationMode:['create']
      },
    },
    routing: { send: { type: 'body', property: 'email' } },
    description: 'O endereço de e-mail do lead (obrigatório para criar)',   //Dupliquei email pois o email do update não é required
  },
	{
  displayName: 'Email',
  name: 'email',
  type: 'string',
	placeholder: 'name@email.com',
	  default: '',
  displayOptions: {
    show: {
      resource: ['leads'],
      operation: ['manage_lead'],
      operationMode: ['update'],
    },
  },
  routing: { send: { type: 'body', property: 'email' } },
  description: 'Email opcional ao editar lead',
},
  {
    displayName: 'Notas',
    name: 'notes',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['manage_lead'],
      },
    },
    routing: { send: { type: 'body', property: 'notes' } },
    description: 'Notas adicionais ou observações sobre o lead',
  },
  {
    displayName: 'Variáveis Customizadas',
    name: 'customVariables',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    placeholder: 'Adicionar Variável',
    default: {},
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['manage_lead'],
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
            description: 'O slug da variável customizada a ser editada',
          },
          {
            displayName: 'Valor',
            name: 'value',
            type: 'string',
            default: '',
            description: 'O valor a ser atribuído à variável customizada',
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          custom_variables_to_add_or_update:'={{ Array.isArray($value.variable) ? $value.variable.map(v => ({ slug: v.slug, value: v.value })) : (Array.isArray($value) ? $value.map(v => ({ slug: v.slug, value: v.value })) : []) }}',
        },
      },
    },
  },
  {
    displayName: 'Tags',
    name: 'addtags',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    placeholder: 'Adicionar Tags',
    default: {},
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['manage_lead','createList'],
				operationMode:['create']
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
            description: 'Nome da tag',
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          tags: '={{ Array.isArray($value.optiontags) ? $value.optiontags.map(o => o.tags1).filter(Boolean) : (Array.isArray($value) ? $value.map(o => o.tags1).filter(Boolean) : []) }}',
        },
      },
    },
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
        description: 'Filtra leads pelo nome',
      },
      {
        displayName: 'Telefone',
        name: 'phonefilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo número de telefone',
      },
      {
        displayName: 'Email',
        name: 'emailfilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo endereço de e-mail',
      },
      {
        displayName: 'Tag ID',
        name: 'tagfilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo ID da tag',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['getAll']
      }
    },
    description: 'Defina filtros para buscar leads específicos',
    routing:{
      request:{
        qs:{
          'filter[name]': '={{$value.namefilter}}',
          'filter[phone]': '={{$value.phonefilter}}',
          'filter[email]': '={{$value.emailfilter}}',
          'filter[tags]': ['={{$value.tagfilter}}']
        }
      }
    }
  },
  {
    displayName: 'Incluir Relacionamentos',
    name: 'aditionalfilter',
    type: 'multiOptions',
    options: [
      { name: 'Listas', value: 'lists' },
      { name: 'Fonte Das Listas', value: 'lists.source' },
      { name: 'Tags', value: 'tags' },
      { name: 'Usuários', value: 'users' },
    ],
    default: [],
    description: 'Selecione quais relacionamentos devem ser incluídos na requisição (ex: listas, tags, usuários)',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['getAll','getonelead']
      }
    },
    routing:{
      request:{
        qs:{
          include: '={{$value}}'
        }
      }
    }
  },
  {
    displayName: 'ID(s) Da(s) Lista(s)',
    name: 'lists_id',
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
    description: 'O(s) ID(s) da(s) lista(s) para associar ou remover do lead (separados por vírgula)',
    routing:{
      request:{
        body:{
          lists: '={{$value.split(",").map(item => parseInt(item.trim(), 10))}}',
        }
      }
    }
  }
];
