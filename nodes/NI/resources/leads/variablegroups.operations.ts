import type { INodeProperties } from 'n8n-workflow';

export const variablegroupsoperations:INodeProperties[]=
[{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['variablegroups'],
    },
  },
  options:
  [ {
    name: 'Criar Grupo',
    value: 'createlist',
    action: 'Create a new list',
    description: 'Cria um novo grupo para variáveis customizadas.',
    routing: {
      request: {
        method: 'POST',
        url: '/variable-groups',
        body: {
          name: '={{$parameter.name}}',
        }
      },
    },
  },
  {
    name: 'Buscar Todos os Grupos',
    value: 'getlists',
    action: 'Get all variable lists',
    description: 'Busca e retorna todos os grupos de variáveis ativos no sistema.',
    routing: {
      request: {
        method: 'GET',
        url: '/variable-groups',
				qs:{include:'={{$parameter.parameteradd}}',
					'filter[name]': '={{$parameter.variablefilter}}'
				},
      },
    },
  },
  {
    name: 'Buscar Grupo por ID',
    value: 'getgroup',
    action: 'Get all variable lists',
    description: 'Busca e retorna um grupo de variáveis específico utilizando seu ID.',
    routing: {
      request: {
        method: 'GET',
        url: '=/variable-groups/{{$parameter.groupid}}',
        qs:{include:'={{$parameter.parameteradd}}'},
      },
    },
  },
  {
    name: 'Editar Nome do Grupo',
    value: 'updategroup',
    action: 'Change group name',
    description: 'Altera o nome de um grupo de variáveis existente.',
    routing: {
      request: {
        method: 'PUT',
        url: '=/variable-groups/{{$parameter.groupid}}',
        body: {
          name: '={{$parameter.newname}}',
        }
      },
    },
  },
  {
    name: 'Apagar Grupo',
    value: 'deletegroup',
    action: 'Change group name',
    description: 'Apaga um grupo de variáveis permanentemente do sistema.',
    routing: {
      request: {
        method: 'DELETE',
        url: '=/variable-groups/{{$parameter.groupid}}',
      },
      output:{
        postReceive:[
          async function(this, items, response)
          {
          if (response.statusCode === 200 || response.statusCode === 204)
          {
              return[{
                json:{
                  success:true,
                  message:'Contato apagado com sucesso!'
                },
              },
            ]
          }
          throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível excluir o contato'}`)
        }
      ],
    },
    },
  },
  ],
  default:'Escolha uma Opção'
},
]
