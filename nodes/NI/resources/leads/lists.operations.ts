import type { INodeProperties } from 'n8n-workflow';

export const listsOperations:INodeProperties[]=[
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['leadslist'],
      },
    },
    options: [
      {
        name: 'Buscar Todas as Listas',
        value: 'getAlllists',
        action: 'Get All Contacts lists',
        description: 'Busca e retorna todas as listas de contatos existentes.',
        routing: {
          request: {
            method: 'GET',
            url: '/lists',
            qs:{include: '={{$parameter.parameteraddlist}}',
                append:'={{$parameter.properties}}',
                'filter[name]': '={{$parameter.listfilters.nameFilter}}',
                'filter[type]': '={{$parameter.listfilters.typeFilter}}',
            },

          },
        },
      },
      {
        name: 'Criar Lista',
        value: 'createList',
        description: 'Cria uma nova lista de contatos no sistema.',
        routing: {
          request: {
            method: 'POST',
            url: '/lists',
            body: {
              name:'={{$parameter.listName}}',
              tags:'={{ $parameter.addtags.optiontags.map(v => (v.tags1)) }}',
              type: 'dynamic'
            },

          },


        },
      },
      {
        name: 'Buscar Lista por ID',
        value: 'getList',
        action: 'Get a list contact',
        description: 'Busca e exibe uma lista de contatos específica utilizando seu ID.',
        routing: {
          request: {
            method: 'GET',
            url: '=/lists/{{$parameter.listID}}',
            qs:{include: '={{$parameter.parameteraddlist2.parameterchoose}}',
            },

          },
        },
      },
      {
        name: 'Listar Leads da Lista',
        value: 'listLeads',
        description: 'Lista todos os leads pertencentes a uma lista específica.',
        routing: {
          request: {
            method: 'GET',
            url: '=/lists/{{$parameter.listID}}/leads',
            qs:{include: '={{$parameter.parameteraddlist3}}',
              'filter[name]': '={{$parameter.filterlist.namefilter}}',
							'filter[phone]': '={{$parameter.filterlist.phonefilter}}',
							'filter[email]': '={{$parameter.filterlist.emailfilter}}',

            },

          },
        },
      },
      {
        name: 'Adicionar Leads à Lista',
        value: 'addLEADS',
        action: 'Add Leads in a List',
        description: 'Adiciona um ou mais leads a uma lista específica.',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listID}}/leads/attach',
            body: {leads: '={{$parameter.id.split(",").map(item => parseInt(item.trim(), 10))}}'}

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
                      message:'Lead(s) adicionado(s) com sucesso!'
                    },
                  },
                ]
              }
              throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Não foi possível adicionar o lead'}`)
            }
          ],
        },
        },
      },
      {
        name: 'Remover Leads da Lista',
        value: 'removeLEADS',
        action: 'Remove Leads in a List',
        description: 'Remove um ou mais leads de uma lista específica.',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listID}}/leads/detach',
            body: {leads: '={{$parameter.id.split(",").map(item => parseInt(item.trim(), 10))}}'}

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
                      message:'Lead(s) removidos(s) com sucesso!'
                    },
                  },
                ]
              }
              throw new Error(`Erro ${response.statusCode}: ${response.body?.message || 'Ops! Não foi possível remover o(s) lead(s)'}`)
            }
          ],
        },
        },
      },
    ],
    default: 'Escolha uma Opção',
  }
]
