import type { INodeProperties } from "n8n-workflow";

export const eventsOperations:INodeProperties[] =
[
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
        name: 'Criar Evento de Carrinho Abandonado',
        value: 'createnewevent',
        action: 'Cria um novo evento de carrinho abandonado na integração',
        description: 'Cria um evento indicando que um carrinho de compras foi abandonado na integração.',
        routing:
     {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/abandoned-cart',
            body:{
              checkout: {
                url:'={{$parameter.checkoutparameter.checkout.url}}',
                id:'={{$parameter.checkoutparameter.checkout.cartid}}',
              },
              customer: {
              first_name:'={{$parameter.first_name}}',
              last_name:'={{$parameter.last_name}}',
              birthdate:'={{$parameter.birthdate}}',
              currency:'={{$parameter.currency}}',
              gender:'={{$parameter.gender}}',
              phone:'={{$parameter.phone}}',
              email:'={{$parameter.email}}',
              cpf_cnpj:'={{$parameter.cpf_cnpj}}',
              ip:'={{$parameter.ip}}',
            },
            order: {
            products:'={{$parameter.products.metadataValues.map(variable=> ({name: variable.productname, quantity: variable.productquantity, value: variable.productvalue }))}}'
          },
          },
        },
      },
    },
    {
      name: 'Criar Evento de Boleto Impresso',
      value: 'createnewticket',
      action: 'Cria um novo evento de carrinho abandonado na integração',
      description: 'Cria um evento para registrar que um boleto foi impresso na integração.',
      routing:
   {
        request: {
          method: 'POST',
          url: '=/integrations/{{$parameter.id}}/events/billet-printed',
          body:{
            address: {
              city:'={{$parameter.addressparameter.address.city}}',
              complement:'={{$parameter.addressparameter.address.complement}}',
              country:'={{$parameter.addressparameter.address.country}}',
              neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
              number:'={{$parameter.addressparameter.address.number}}',
              postal_code:'={{$parameter.addressparameter.address.postal_code}}',
              state:'={{$parameter.addressparameter.address.state}}',
              street:'={{$parameter.addressparameter.address.street}}'
            },
            customer: {
            first_name:'={{$parameter.first_name}}',
            last_name:'={{$parameter.last_name}}',
            birthdate:'={{$parameter.birthdate}}',
            currency:'={{$parameter.currency}}',
            gender:'={{$parameter.gender}}',
            phone:'={{$parameter.phone}}',
            email:'={{$parameter.email}}',
            cpf_cnpj:'={{$parameter.cpf_cnpj}}',
            ip:'={{$parameter.ip}}',
          },
          order: {
            id: '={{$parameter.orderid}}',
            products_total:'={{$parameter.products_total}}',
            total:'={{$parameter.total}}',
            discount:'={{$parameter.discount}}',
						billet_url:'={{$parameter.billet_url}}',
            billet_pdf:'={{$parameter.billet_pdf}}',
            billet_barcode:'={{$parameter.billet_barcode}}',
            billet_value:'={{$parameter.billet_value}}',
            billet_due_date:'={{$parameter.billet_due_date}}',
            status:'={{$parameter.status}}',
          products:[
          {
            name: '={{$parameter.productname}}',
            quantity: '={{$parameter.productquantity}}',
            value:'={{$parameter.productvalue}}'
          }
          ]
        },
          },
        },
      },
    },
    {
      name: 'Criar Evento de Pedido Cancelado',
      value: 'canceledorder',
      action: 'Cria um novo evento de pedido cancelado na integração',
      description: 'Cria um evento para notificar que um pedido foi cancelado na integração.',
      routing:
 {
      request: {
        method: 'POST',
        url: '=/integrations/{{$parameter.id}}/events/order-canceled',
        body:{
          address: {
            city:'={{$parameter.addressparameter.address.city}}',
            complement:'={{$parameter.addressparameter.address.complement}}',
            country:'={{$parameter.addressparameter.address.country}}',
            neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
            number:'={{$parameter.addressparameter.address.number}}',
            postal_code:'={{$parameter.addressparameter.address.postal_code}}',
            state:'={{$parameter.addressparameter.address.state}}',
            street:'={{$parameter.addressparameter.address.street}}'
          },
          customer: {
          first_name:'={{$parameter.first_name}}',
          last_name:'={{$parameter.last_name}}',
          birthdate:'={{$parameter.birthdate}}',
          currency:'={{$parameter.currency}}',
          gender:'={{$parameter.gender}}',
          phone:'={{$parameter.phone}}',
          email:'={{$parameter.email}}',
          cpf_cnpj:'={{$parameter.cpf_cnpj}}',
          ip:'={{$parameter.ip}}',
        },
        order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
          delivery:{
            fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
            description:'={{$parameter.deliveryparameter.description}}',
            code:'={{$parameter.deliveryparameter.trackingcode}}',
            url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
            estimate:'={{$parameter.deliveryparameter.orderdate}}',
            message: '={{$parameter.deliveryparameter.messageorder}}',
          },
        products:[
        {
          name: '={{$parameter.productname}}',
          quantity: '={{$parameter.productquantity}}',
          value:'={{$parameter.productvalue}}'
        }
        ]
      },
      },
    },
  },
},
{
  name: 'Criar Evento de Pedido Pago',
  value: 'orderpaid',
  action: 'Cria um novo evento de pedido pago na integração',
  description: 'Cria um evento para registrar que um pedido foi pago na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/order-paid',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Pedido Estornado',
  value: 'refundorder',
  action: 'Cria um novo evento de pedido cancelado na integração',
  description: 'Cria um evento para registrar que um pedido foi estornado na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/order-refunded',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Pedido Entregue',
  value: 'orderreceived',
  action: 'Cria um novo evento de pedido cancelado na integração',
  description: 'Cria um evento para indicar que um pedido foi entregue ao cliente na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/order-delivered',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Pedido Despachado',
  value: 'orderdispatched',
  action: 'Cria um novo evento de pedido cancelado na integração',
  description: 'Cria um evento para registrar que um pedido foi despachado para entrega na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/order-fulfilled',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Pedido Processando',
  value: 'orderprocessed',
  action: 'Cria um novo evento de pedido cancelado na integração',
  description: 'Cria um evento para indicar que um pedido está em processamento na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/order-processing',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Pacote Saiu para Entrega',
  value: 'orderout',
  action: 'Cria um novo evento de pedido cancelado na integração',
  description: 'Cria um evento para registrar que o pacote saiu para entrega na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/shipping-out-for-delivery',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Progresso de Envio',
  value: 'orderprocessupdated',
  action: 'Cria um novo evento de Pacote com Progresso Atualizado',
  description: 'Cria um evento para registrar a atualização do progresso de envio de um pacote na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/shipping-progress',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Pacote Aguardando Retirada',
  value: 'orderwaiting',
  action: 'Cria um novo evento de Pacote Aguardando Retirada',
  description: 'Cria um evento para notificar que o pacote aguarda retirada na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/shipping-arrived-for-withdrawal',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Aguardando Pagamento',
  value: 'orderwaitingcharge',
  action: 'Cria um novo evento de pedido que está aguardando o pagamento ser efetuado',
  description: 'Cria um evento para registrar que um pedido está aguardando o pagamento na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/waiting-payment',
      body:{
        address: {
          city:'={{$parameter.addressparameter.address.city}}',
          complement:'={{$parameter.addressparameter.address.complement}}',
          country:'={{$parameter.addressparameter.address.country}}',
          neighborhood:'={{$parameter.addressparameter.address.neighborhood}}',
          number:'={{$parameter.addressparameter.address.number}}',
          postal_code:'={{$parameter.addressparameter.address.postal_code}}',
          state:'={{$parameter.addressparameter.address.state}}',
          street:'={{$parameter.addressparameter.address.street}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      order: {
          id: '={{$parameter.orderid}}',
          products_total:'={{$parameter.products_total}}',
          total:'={{$parameter.total}}',
          discount:'={{$parameter.discount}}',
          status:'={{$parameter.status}}',
        delivery:{
          fee:'={{$parameter.deliveryparameter.delivery.trackingvalue}}',
          description:'={{$parameter.deliveryparameter.description}}',
          code:'={{$parameter.deliveryparameter.trackingcode}}',
          url:'={{$parameter.deliveryparameter.trackingcodeurl}}',
          estimate:'={{$parameter.deliveryparameter.orderdate}}',
          message: '={{$parameter.deliveryparameter.messageorder}}',
        },
				pix:{
					bacen_code:'={{$parameter.bacen_code}}',
					due_date:'={{$parameter.due_date}}',
					qr_code:'={{$parameter.qrcode}}',
					url:'={{$parameter.pixurl}}',
					value:'={{$parameter.pixvalue}}'
				},
				payment_type:'={{$parameter.payment_type}}',
      products:[
      {
        name: '={{$parameter.productname}}',
        quantity: '={{$parameter.productquantity}}',
        value:'={{$parameter.productvalue}}'
      }
      ]
    },
    },
  },
},
},
{
  name: 'Criar Evento de Acesso Concedido',
  value: 'accessevent',
  action: 'Cria um novo evento de acesso criado para membros',
  description: 'Cria um evento para registrar a concessão de acesso a um membro na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/access-created',
      body:{
        access:{
          url:'={{$parameter.memberurl}}',
          first_access_url:'={{$parameter.first_access_url}}',
          login:'={{$parameter.login}}',
          password:'={{$parameter.password}}',
          products:[
            {
              name: '={{$parameter.productname}}',
              quantity: '={{$parameter.productquantity}}',
              value:'={{$parameter.productvalue}}'
            }
            ]
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
    },
  },
},
},
{
  name: 'Criar Evento de Redefinição de Senha',
  value: 'changepasswordevent',
  action: 'Cria um novo evento de redefinição de senha',
  description: 'Cria um evento para registrar uma solicitação ou conclusão de redefinição de senha.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/reset-password',
      body:{
        reset_password:{
          url:'={{$parameter.urlchangepassword}}'
        },
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
    },
  },
},
},
{
  name: 'Criar Evento de Resposta NPS',
  value: 'eventclientscore',
  action: 'Cria um novo evento com a nota referente a disposição do cliente em recomendar algo a terceiros',
  description: 'Cria um evento para registrar a nota de recomendação (NPS) de um cliente na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/nps-answer',
      body:{
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
    },
		nps:{
			answer:{
				answered_at:'={{$parameter.answered_at}}',
				comment:'={{$parameter.comment}}',
				score:'={{$parameter.score}}'
			}
		},
    },
  },
},
},
{
  name: 'Criar Evento de Pesquisa NPS',
  value: 'eventclientsearch',
  action: 'Cria um novo evento com o link para pesquisa',
  description: 'Cria um evento para enviar um link de pesquisa de recomendação (NPS) ao cliente na integração.',
  routing:
{
    request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/nps-survery',
      body:{
        customer: {
        first_name:'={{$parameter.first_name}}',
        last_name:'={{$parameter.last_name}}',
        birthdate:'={{$parameter.birthdate}}',
        currency:'={{$parameter.currency}}',
        gender:'={{$parameter.gender}}',
        phone:'={{$parameter.phone}}',
        email:'={{$parameter.email}}',
        cpf_cnpj:'={{$parameter.cpf_cnpj}}',
        ip:'={{$parameter.ip}}',
      },
      nps:{
        survery:{
					url:'={{$parameter.surveryurl}}'
				},
      },
    },
  },
},
},
],
    default: 'Escolha uma Opção'
  }
]
