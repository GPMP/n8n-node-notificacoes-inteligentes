import type { INodeProperties } from 'n8n-workflow';

export const customvariablefields:INodeProperties[] = [
  {
    displayName: 'Nome',
    name: 'name',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable'],
      },
    },
    description: 'O nome da variável customizada.',
  },
  {
    displayName: 'ID da Variável Customizada',
    name: 'customvariableid',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['updatecustomvariable', 'deletecustomvariable','getvariable'],
      },
    },
    description: 'O identificador único para a variável customizada.',
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
    description: 'Uma breve descrição da variável customizada.',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable','updatecustomvariable']
      }
    },
  },
  {
    displayName: 'Tipo de Variável',
    name: 'selecaotipo',
    type: 'options',
    options: [
      {
        name: 'Email',
        value: 'email',
      },
      {
        name: 'Texto',
        value: 'text',
      },
      {
        name: 'CNPJ',
        value: 'cnpj',
      },
      {
        name: 'CPF',
        value: 'cpf',
      },
      {
        name: 'Inteiro',
        value: 'integer',
      },
      {
        name: 'Numérico',
        value: 'numeric',
      },
      {
        name: 'Múltipla Seleção',
        value: 'multi_select',
      },
      {
        name: 'Lista de Opções',
        value: 'option_list',
      },
    ],
    default: 'Selecione o Tipo de Variável',
    description: 'Selecione o tipo de dado para a variável customizada.',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['createcustomvariable']
      }
    },
  },
  {
    displayName: 'Parâmetros Adicionais',
    name: 'include',
    type: 'multiOptions',
    options: [
      {
        name: 'Organização',
        value: 'organization',
      },
      {
        name: 'Autor',
        value: 'author',
      },
      {
        name: 'Última Edição Por',
        value: 'lastEditedBy',
      },
      {
        name: 'Grupo de Variáveis',
        value: 'variableGroup',
      },
    ],
    default: [],
    description: 'Selecione parâmetros opcionais para incluir na requisição.',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['getvariable', 'getcustomvariables']
      }
    },
  },
  {
    displayName: 'Nome do Grupo de Variáveis Customizadas',
    name: 'variable_group_name',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: [''],
      },
    },
    description: 'Exibe todas as variáveis customizadas pertencentes a um grupo específico.',
  },
  {
    displayName: 'Slug',
    name: 'slug',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: [''],
      },
    },
    description: 'Filtra as variáveis customizadas pelo seu slug.',
  },
  {
    displayName: 'Filtros',
    name: 'filters',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      {
        displayName: 'Slug',
        name: 'slugfilter',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Tipo',
        name: 'typefilter',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Nome do Grupo de Variáveis',
        name: 'variablegroupnamefilter',
        type: 'string',
        default: '',
      },
    ],
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['getcustomvariables']
      }
    },
  }
];
