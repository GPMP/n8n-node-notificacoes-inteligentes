import type { INodeProperties } from 'n8n-workflow';

export const customvariablefields: INodeProperties[] = [
  {
    displayName: 'Nome',
    name: 'name',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable'],
      },
    },
    description: 'O nome da variável customizada',
    routing: { send: { type: 'body', property: 'name' } },
  },
  {
    displayName: 'ID Do Grupo',
    name: 'groupId',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['updatecustomvariable'],
      },
    },
    description: 'O identificador único do grupo de variáveis',
    routing: { send: { type: 'body', property: 'group_id' } },
  },
  {
    displayName: 'ID Da Variável Customizada',
    name: 'customVariableId',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['updatecustomvariable', 'deletecustomvariable', 'getvariable'],
      },
    },
    description: 'O identificador único para a variável customizada',
  },
  {
    displayName: 'Descrição',
    name: 'description',
    type: 'string',
    required: true,
    typeOptions: {
      rows: 4,
    },
    default: '',
    description: 'Uma breve descrição da variável customizada',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable', 'updatecustomvariable'],
      },
    },
    routing: { send: { type: 'body', property: 'description' } },
  },
  {
    displayName: 'Tipo De Variável',
    name: 'variableType',
    type: 'options',
    options: [
      { name: 'CNPJ', value: 'cnpj' },
      { name: 'CPF', value: 'cpf' },
      { name: 'Email', value: 'email' },
      { name: 'Inteiro', value: 'integer' },
      { name: 'Lista De Opções', value: 'option_list' },
      { name: 'Múltipla Seleção', value: 'multi_select' },
      { name: 'Numérico', value: 'numeric' },
      { name: 'Texto', value: 'text' },
    ],
    default: 'cpf',
    description: 'Selecione o tipo de dado para a variável customizada',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable'],
      },
    },
    routing: { send: { type: 'body', property: 'type' } },
  },
  {
    displayName: 'Parâmetros Adicionais',
    name: 'additionalParameters',
    type: 'multiOptions',
    options: [
      { name: 'Organização', value: 'organization' },
      { name: 'Autor', value: 'author' },
      { name: 'Última Edição Por', value: 'lastEditedBy' },
      { name: 'Grupo De Variáveis', value: 'variableGroup' },
    ],
    default: [],
    description: 'Selecione parâmetros opcionais para incluir na requisição',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['getvariable', 'getcustomvariables'],
      },
    },
    routing: { request:{qs:{include:'={{$value}}'}}},
  },
  {
    displayName: 'Filtros',
    name: 'filters',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      { displayName: 'Slug', name: 'slugFilter', type: 'string', default: '' },
      {
        displayName: 'Tipo',
        name: 'typeFilter',
        description: 'Defina o tipo: cpf | cnpj | email | integer | option_list | multi_select | numeric | text',
        type: 'string',
        default: '',
      },
      { displayName: 'Nome Do Grupo De Variáveis', name: 'variableGroupNameFilter', type: 'string', default: '' },
    ],
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['getcustomvariables'],
      },
    },
    routing: {
      request: {
        qs: {
          'filter[slug]': '={{$value.slugFilter}}',
          'filter[type]': '={{$value.typeFilter}}',
          'filter[variable_group_name]': '={{$value.variableGroupNameFilter}}',
        },
      },
    },
  },
];
