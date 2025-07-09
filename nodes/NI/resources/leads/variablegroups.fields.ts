import type { INodeProperties } from 'n8n-workflow';

export const variablegroupsfields:INodeProperties [] =[
  {
    displayName: 'Nome',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['createlist',],
      },
    },
    description: 'O nome do grupo de variáveis.',
  },
  {
    displayName: 'ID do Grupo',
    name: 'groupid',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups', 'customvariables'],
        operation: ['getgroup', 'updategroup', 'deletegroup','updatecustomvariable'],
      },
    },
    description: 'O identificador único do grupo de variáveis.',
  },
  {
    displayName: 'Novo Nome do Grupo',
    name: 'newname',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['updategroup'],
      },
    },
    description: 'O novo nome a ser atribuído ao grupo de variáveis.',
  },
  {
    displayName: 'Incluir Relacionamentos',
    name: 'parameteradd',
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
    ],
    default: [],
    description: 'Selecione quais relacionamentos opcionais devem ser incluídos na requisição.',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getgroup','getlists']
      }
    },
  },
	{
    displayName: 'Filtrar',
    name: 'variablefilter',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      {
        displayName: 'Nome do Lead',
        name: 'namefilter',
        type: 'string',
        default: '',
        description: 'Filtra leads pelo nome dentro da lista.',
      },
    ],
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getlists']
      }
    },
    description: 'Defina filtros para buscar leads específicos dentro da lista.',
  },
];
