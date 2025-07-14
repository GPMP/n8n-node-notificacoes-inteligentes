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
  },
  {
    displayName: 'ID Da Variável Customizada',
    name: 'customvariableid',
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
        operation: ['createcustomvariable', 'updatecustomvariable']
      }
    },
  },
  {
    displayName: 'Tipo De Variável',
    name: 'selecaotipo',
    type: 'options',
    options: [
      {
				name: 'CNPJ',
				value: 'cnpj',
			},
			{
				name: 'CPF',
				value: 'cpf',
			},
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'Inteiro',
				value: 'integer',
			},
			{
				name: 'Lista De Opções',
				value: 'option_list',
			},
			{
				name: 'Múltipla Seleção',
				value: 'multi_select',
			},
			{
				name: 'Numérico',
				value: 'numeric',
			},
			{
				name: 'Texto',
				value: 'text',
			},
    ],
    default: 'cpf',
    description: 'Selecione o tipo de dado para a variável customizada',
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
        name: 'Grupo De Variáveis',
        value: 'variableGroup',
      },
    ],
    default: [],
    description: 'Selecione parâmetros opcionais para incluir na requisição',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: ['getvariable', 'getcustomvariables']
      }
    },
  },
  {
    displayName: 'Nome Do Grupo De Variáveis Customizadas',
    name: 'variable_group_name',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: [''],
      },
    },
    description: 'Exibe todas as variáveis customizadas pertencentes a um grupo específico',
  },
  {
    displayName: 'Slug',
    name: 'slug',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['customvariables'],
        operation: [''],
      },
    },
    description: 'Filtra as variáveis customizadas pelo seu slug',
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
        displayName: 'Nome Do Grupo De Variáveis',
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
