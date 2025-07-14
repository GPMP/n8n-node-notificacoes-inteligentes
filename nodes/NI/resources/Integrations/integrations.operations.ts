import type { INodeProperties } from 'n8n-workflow';

export const integrationsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['integration'],
      },
    },
    options:[
      {
        name: 'Apagar Uma Integração',
        value: 'delete',
        action: 'Excluir integracao',
        description: 'Remove uma integração',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/integrations/{{$parameter.id}}',
          },
        },
      },
      {
        name: 'Buscar Todas Integrações',
        value: 'getAllIntegrations',
        action: 'Buscar integracoes',
        description: 'Mostra todas as integrações',
        routing: {
          request: {
            method: 'GET',
            url: '/integrations',
          },
        },
      },
      {
        name: 'Buscar Uma Integração',
        value: 'getintegration',
        action: 'Buscar integracao',
        description: 'Busca uma determinada integração específica',
        routing: {
          request: {
            method: 'GET',
            url: '=/integrations/{{$parameter.id}}',
            qs: {
              append: '={{$parameter.parameteraddintegration}}'
            },
          },
        },
      },
      {
        name: 'Criar Nova Integração',
        value: 'createintegration',
        action: 'Criar integracao',
        description: 'Cria uma nova integração',
        routing: {
          request: {
            method: 'POST',
            url: '/integrations',
            body: {
              name: '={{$parameter.name}}',
              platform: '={{$parameter.platform}}'
            },
          },
        },
      },
      {
        name: 'Mudar O Nome De Uma Integração',
        value: 'updateintegration',
        action: 'Atualizar integracao',
        description: 'Muda o nome de uma integração',
        routing: {
          request: {
            method: 'PUT',
            url: '=/integrations/{{$parameter.id}}',
            body: {
              name: '={{$parameter.newname}}',
            },
          },
        },
      },
    ],
    default: 'createintegration',
  },
];
