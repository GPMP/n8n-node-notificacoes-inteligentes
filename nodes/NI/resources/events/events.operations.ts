import type { INodeProperties } from 'n8n-workflow';

export const eventsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['events'],
      },
    },
    options: [
      {
        name: 'Criar Evento De Acesso Concedido',
        value: 'accessevent',
        action: 'Criar evento de acesso concedido na integracao',
        description: 'Cria um evento para registrar a concessao de acesso a um membro na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/access-created',
          },
        },
      },
      {
        name: 'Criar Evento De Aguardando Pagamento',
        value: 'orderwaitingcharge',
        action: 'Cria um novo evento de pedido que esta aguardando o pagamento ser efetuado',
        description: 'Cria um evento para registrar que um pedido está aguardando o pagamento na integração',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/waiting-payment',
          },
        },
      },
      {
        name: 'Criar Evento De Boleto Impresso',
        value: 'createnewticket',
        action: 'Criar evento de boleto impresso na integracao',
        description: 'Cria um evento para registrar que um boleto foi impresso na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/billet-printed',
          },
        },
      },
      {
        name: 'Criar Evento De Carrinho Abandonado',
        value: 'createnewevent',
        action: 'Criar evento de carrinho abandonado na integracao',
        description: 'Cria um evento indicando que um carrinho de compras foi abandonado na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/abandoned-cart',
          },
        },
      },
      {
        name: 'Criar Evento De Nota Nps',
        value: 'eventclientscore',
        action: 'Criar evento com a nota referente a disposicao do cliente em recomendar algo a terceiros',
        description: 'Cria um evento para registrar a nota de recomendacao NPS de um cliente na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/nps-answer',
          },
        },
      },
      {
        name: 'Criar Evento De Pacote Aguardando Retirada',
        value: 'orderwaiting',
        action: 'Criar evento de pacote aguardando retirada na integracao',
        description: 'Cria um evento para notificar que o pacote aguarda retirada na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/shipping-arrived-for-withdrawal',
          },
        },
      },
      {
        name: 'Criar Evento De Pacote Saiu Para Entrega',
        value: 'orderout',
        action: 'Criar evento de pacote saiu para entrega na integracao',
        description: 'Cria um evento para registrar que o pacote saiu para entrega na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/shipping-out-for-delivery',
          },
        },
      },
      {
        name: 'Criar Evento De Pedido Cancelado',
        value: 'canceledorder',
        action: 'Criar evento de pedido cancelado na integracao',
        description: 'Cria um evento para notificar que um pedido foi cancelado na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-canceled',
          },
        },
      },
      {
        name: 'Criar Evento De Pedido Despachado',
        value: 'orderdispatched',
        action: 'Criar evento de pedido despachado na integracao',
        description: 'Cria um evento para registrar que um pedido foi despachado para entrega na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-fulfilled',
          },
        },
      },
      {
        name: 'Criar Evento De Pedido Entregue',
        value: 'orderreceived',
        action: 'Criar evento de pedido entregue na integracao',
        description: 'Cria um evento para indicar que um pedido foi entregue ao cliente na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-delivered',
          },
        },
      },
      {
        name: 'Criar Evento De Pedido Estornado',
        value: 'refundorder',
        action: 'Criar evento de pedido estornado na integracao',
        description: 'Cria um evento para registrar que um pedido foi estornado na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-refunded',
          },
        },
      },
      {
        name: 'Criar Evento De Pedido Pago',
        value: 'orderpaid',
        action: 'Criar evento de pedido pago na integracao',
        description: 'Cria um evento para registrar que um pedido foi pago na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-paid',
          },
        },
      },
      {
        name: 'Criar Evento De Pedido Processando',
        value: 'orderprocessed',
        action: 'Criar evento de pedido processando na integracao',
        description: 'Cria um evento para indicar que um pedido esta em processamento na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-processing',
          },
        },
      },
      {
        name: 'Criar Evento De Pesquisa Nps',
        value: 'eventclientsearch',
        action: 'Criar evento com o link para pesquisa',
        description: 'Cria um evento para enviar um link de pesquisa de recomendacao NPS ao cliente na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/nps-survery',
          },
        },
      },
      {
        name: 'Criar Evento De Progresso De Envio',
        value: 'orderprocessupdated',
        action: 'Criar evento de progresso de envio na integracao',
        description: 'Cria um evento para registrar a atualizacao do progresso de envio de um pacote na integracao',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/shipping-progress',
          },
        },
      },
    ],
    default: 'createnewevent',
  },
];
