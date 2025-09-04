import type { INodeProperties } from 'n8n-workflow';

export const variablegroupsfields: INodeProperties[] = [
  {
    displayName: 'Nome',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['createlist'],
      },
    },
    description: 'O nome do grupo de variáveis',
		routing:{send:{type:'body', property:'name'}}
  },
  {
    displayName: 'ID Do Grupo',
    name: 'groupid',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getgroup', 'updategroup', 'deletegroup'],
      },
    },
    description: 'O identificador único do grupo de variáveis',
		routing:{send:{type:'body', property:'group_id'}}
  },
  {
    displayName: 'Novo Nome Do Grupo',
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
    description: 'O novo nome a ser atribuído ao grupo de variáveis',
		routing:{send:{type:'body', property:'name'}}
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
    description: 'Selecione quais relacionamentos opcionais devem ser incluídos na requisição',
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getgroup', 'getlists'],
      },
    },
		routing: { send: { type: 'query', property: 'include' } },
  },
  {
    displayName: 'Filtrar',
    name: 'variablefilter',
    type: 'collection',
    placeholder: 'Escolha',
    default: {},
    options: [
      {
        displayName: 'Nome',
        name: 'namefilter',
        type: 'string',
        default: '',
        description: 'Filtra pelo nome',
      },
    ],
    displayOptions: {
      show: {
        resource: ['variablegroups'],
        operation: ['getlists'],
      },
    },
    description: 'Defina filtros para buscar leads específicos dentro da lista',
		routing:{request:{qs:{'filter[name]':'={{$value.namefilter}}'}}}
  },
];
