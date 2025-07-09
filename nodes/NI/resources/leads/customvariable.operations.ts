import type { INodeProperties } from 'n8n-workflow';

export const customvariableoperations:INodeProperties[]=[
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['customvariables'],
      },
    },
    options:
    [
      {
        name: 'Criar Variável Customizada',
        value: 'createcustomvariable',
        action: 'Create a custom variable',
        description: 'Cria uma nova variável customizada no sistema.',
        routing: {
          request: {
            method: 'POST',
            url: '/organizations/custom-variables',
            body: {
              name: '={{$parameter.name}}',
              description:'={{$parameter.description}}',
              type:'={{$parameter.selecaotipo}}'
            }
          },
        },
      },
      {
        name: 'Buscar Todas as Variáveis Customizadas',
        value: 'getcustomvariables',
        action: 'Get all custom variables',
        description: 'Busca e retorna todas as variáveis customizadas disponíveis.',
        routing: {
          request: {
            method: 'GET',
            url: '/organizations/custom-variables',
            qs: {
              include:'={{$parameter.include}}',
              'filter[slug]': '={{$parameter.filters.slugfilter}}',
              'filter[type]':'={{$parameter.filters.typefilter}}',
              'filter[variable_group_name]':'={{$parameter.filters.variablegroupnamefilter}}'
            },
          },
        },
      },
      {
        name: 'Buscar Variável Customizada por ID',
        value: 'getvariable',
        action: 'Get a custom variable',
        description: 'Busca e retorna uma variável customizada específica utilizando seu ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/organizations/custom-variables/{{$parameter.customvariableid}}',
            qs: {include: '={{$parameter.include}}'},
          },
        },
      },
      {
        name: 'Editar Variável Customizada',
        value: 'updatecustomvariable',
        action: 'Change custom variable name',
        description: 'Edita as propriedades de uma variável customizada existente.',
        routing: {
          request: {
            method: 'PUT',
            url: '=/organizations/custom-variables/{{$parameter.customvariableid}}',
            body: {
              description: '{{$parameter.description}}',
              options: [['']],
              group_id: '{{$parameter.groupid}}',
            }
          },
        },
      },
      {
        name: 'Apagar Variável Customizada',
        value: 'deletecustomvariable',
        action: 'Change group name',
        description: 'Apaga uma variável customizada do sistema de forma permanente.',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/organizations/custom-variables/{{$parameter.customvariableid}}',
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
                      message:'Variável apagada com sucesso!'
                    },
                  },
                ]
                }
                throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível excluir a variável'}`)
              }
            ],
          },
        },
      },
    ],
    default:'Escolha uma Opção'
  },
]
