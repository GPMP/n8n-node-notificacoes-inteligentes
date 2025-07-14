import type { INodeProperties } from "n8n-workflow";

export const eventsFields: INodeProperties[] = [
  // ================================================CUSTOMER DATA===============================================
  {
    displayName: 'Primeiro Nome',
    name: 'first_name',
    type: 'string',
    required: true,
    default: '',
    description: 'Primeiro nome do cliente',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'Telefone',
    name: 'phone',
    type: 'string',
    required: true,
    default: '',
    description: 'Número de telefone do cliente contendo DDD e código do país',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'Sobrenome',
    name: 'last_name',
    type: 'string',
    default: '',
    description: 'Sobrenome do cliente',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'Data De Nascimento',
    name: 'birthdate',
    type: 'string',
    default: '',
    placeholder:'Formato: Ano-Mês-Dia | Exemplo: 2001-08-20',
    description: 'Data de nascimento do cliente',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'Moeda',
    name: 'currency',
    type: 'string',
    placeholder:'BRL | USD | GPB ...',
    default: '',
    description: 'Tipo da moeda utilizada pelo cliente',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'Gênero',
    name: 'gender',
    type: 'string',
    default: '',
    description: 'Gênero do cliente',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    description: 'Email do cliente',
		placeholder:'name@email.com',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','changepasswordevent']
      }
    },
  },
  {
    displayName: 'CPF/CNPJ',
    name: 'cpf_cnpj',
    type: 'string',
    default: '',
    description: 'Documento do cliente (CPF/CNPJ)',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'IP',
    name: 'ip',
    type: 'string',
    default: '',
    description: 'Endereço de IP do cliente',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  // ================================================PRODUCT DATA===============================================
  {
    displayName: 'Produtos',
    name: 'products',
    placeholder: 'Adicionar Dados Do(s) Produto(s)',
    type: 'fixedCollection',
    required: true,
    default: {},
    typeOptions: {
      multipleValues: true,
    },
    options: [
      {
        name: 'metadataValues',
        displayName: 'Metadata',
        values: [
          {
            displayName: 'Nome Do Produto',
            name: 'productname',
            type: 'string',
            required: true,
            default:''
          },
          {
            displayName: 'Quantidade Do Produto',
            name: 'productquantity',
            type: 'number',
            required: true,
            default:0
          },
          {
            displayName: 'Valor Do Produto',
            name: 'productvalue',
            type: 'number',
            required: true,
            default:0
          },
        ],
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','accessevent','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Campo Produtos Obrigatório',
    name: 'notice',
    type: 'notice',
    default: '',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','accessevent','orderwaitingcharge']
      }
    }
  },
  // ================================================ORDER OBJECT===============================================
  {
    displayName: 'ID Do Pedido',
    name: 'orderid',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Valor Somado Dos Produtos Do Pedido',
    name: 'products_total',
    type: 'number',
    required: true,
    default: 0,
    description: 'Somatória dos valores dos produtos',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Valor Do Pedido Total',
    name: 'total',
    type: 'number',
    required: true,
    default: 0,
    description: 'Total do valor do pedido',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Desconto',
    name: 'discount',
    type: 'number',
    required: true,
    default: 0,
    description: 'Desconto total do pedido',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'string',
    default: '',
    description: 'Descrição atual do estado do pedido para enriquecimento das informações',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Link Para O Boleto Em HTML',
    name: 'billet_url',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Link Para O Boleto Em PDF',
    name: 'billet_pdf',
    type: 'string',
    default: '',
    description: 'Link para visualizar o boleto em PDF',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Linha Digitável Do Boleto',
    name: 'billet_barcode',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Valor Do Boleto',
    name: 'billet_value',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Data Do Vencimento Do Boleto',
    name: 'billet_due_date',
    type: 'string',
    default: '',
    description: 'Data de vencimento do boleto em timezone UTC +0 (necessário para o funcionamento do lembrador de boletos)',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Método De Pagamento',
    name: 'payment_type',
    type: 'options',
    options: [
      {
        name: 'Cartão De Crédito',
        value: 'credit-card',
      },
      {
        name: 'Depósito',
        value: 'deposit',
      },
      {
        name: 'PIX',
        value: 'pix',
      },
    ],
    default: 'deposit',
    description: 'Tipo de pagamento do pedido. Para cada tipo de pagamento, um evento daquele tipo será despachado. Ex: um pedido com payment_type = deposit irá resultar em um evento do tipo aguardando depósito bancário',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Código Bacen',
    name: 'bacen_code',
    type: 'string',
    required: true,
    default: '',
    description: 'Código Bacen para o pagamento do PIX',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Data Do Vencimento Do Pix',
    name: 'due_date',
    type: 'dateTime',
    required: true,
    default: '',
    description: 'Data de vencimento do PIX em timezone UTC +0 (necessário para o funcionamento do lembrador de PIX)',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'QR Code',
    name: 'qrcode',
    type: 'string',
    required: true,
    default: '',
    description: 'QR Code para o pagamento do PIX',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'URL De Pagamento Do Pix',
    name: 'pixurl',
    type: 'string',
    required: true,
    default: '',
    description: 'URL para o pagamento do PIX',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Valor Do Pix',
    name: 'pixvalue',
    type: 'number',
    required: true,
    default: 0,
    description: 'Valor do pagamento do PIX',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
  },
  //=================================================CHECKOUT DATA=================================================
  {
    displayName: 'Checkout',
    name: 'checkoutparameter',
    placeholder: 'Checkout',
    type: 'fixedCollection',
    default: {},
    typeOptions: {
      multipleValues: false,
    },
    options: [
      {
        name: 'checkout',
        displayName: 'Checkout',
        description: 'Adiciona informações sobre o pedido',
        placeholder: 'Adiciona informações sobre o pedido',
        values: [
          {
            displayName: 'Url',
            name: 'url',
            type: 'string',
            description: 'URL do checkout para retornar o cliente para a compra',
            default: ''
          },
          {
            displayName: 'ID',
            name: 'cartid',
            type: 'string',
            default: '',
            description: 'Código de identificação do carrinho',
          },
        ],
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent']
      }
    },
  },
  //================================================ADDRESS DATA==================================================
  {
    displayName: 'Parâmetros Adicionais',
    name: 'addressparameter',
    placeholder: 'Endereço Do Cliente',
    type: 'fixedCollection',
    default: {},
    typeOptions: {
      multipleValues: false,
    },
    options: [
      {
        name: 'address',
        displayName: 'Address',
        values: [
          {
            displayName: 'Cidade',
            name: 'city',
            type: 'string',
            default: '',
            description: 'Cidade do cliente',
          },
          {
            displayName: 'Complemento',
            name: 'complement',
            type: 'string',
            default: '',
            description: 'Complemento do cliente',
          },
          {
            displayName: 'País',
            name: 'country',
            type: 'string',
            default: '',
            description: 'País do cliente',
          },
          {
            displayName: 'Bairro',
            name: 'neighborhood',
            type: 'string',
            default: '',
            description: 'Bairro do cliente',
          },
          {
            displayName: 'Número',
            name: 'number',
            type: 'string',
            default: '',
            description: 'Número da casa do cliente',
          },
          {
            displayName: 'CEP',
            name: 'postal_code',
            type: 'string',
            default: '',
            description: 'CEP do cliente',
          },
          {
            displayName: 'Estado',
            name: 'state',
            type: 'string',
            default: '',
            description: 'Estado do cliente',
          },
          {
            displayName: 'Rua',
            name: 'street',
            type: 'string',
            default: '',
            description: 'Rua do cliente',
          },
        ],
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting']
      },

    },
  },
  //=================================================DELIVERY DATA===================================================
  {
    displayName: 'Parâmetros Adicionais',
    name: 'deliveryparameter',
    placeholder: 'Entrega',
    type: 'fixedCollection',
    default: {},
    typeOptions: {
      multipleValues: false,
    },
    options: [
      {
        name: 'delivery',
        displayName: 'Entrega',
        values: [
					{
						displayName: 'Código De Rastreio Da Entrega',
						name: 'trackingcode',
						type: 'string',
						default: '',
						description: 'Campo para informar o código de rastreio da entrega',
					},
					{
						displayName: 'Data De Estimativa De Entrega Do Pedido',
						name: 'orderdate',
						type: 'string',
						placeholder: 'ANO-MÊS-DIA',
						default: '',
						description: 'Data de estimativa de entrega do pedido em timezone UTC +0',
					},
					{
						displayName: 'Descrição Da Entrega',
						name: 'description',
						type: 'string',
						typeOptions: {
							rows: 4,
						},
						default: '',
						description: 'Campo para informações sobre a entrega, como prazo ou método',
					},
					{
						displayName: 'Mensagem Da Entrega',
						name: 'messageorder',
						type: 'string',
						default: '',
						description: 'Campo para mensagem sobre entrega',
					},
					{
						displayName: 'URL De Rastreio Da Entrega',
						name: 'trackingcodeurl',
						type: 'string',
						default: '',
						description: 'Campo para informar a URL de rastreio da entrega',
					},
					{
						displayName: 'Valor Do Frete Da Entrega',
						name: 'trackingvalue',
						type: 'string',
						default: '',
						description: 'Valor total do frete',
					},
				]
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting']
      }
    },
  },
  //=====================================================NPS DATA =======================================================================================
  {
    displayName: 'Nota Dada Pelo Cliente',
    name: 'score',
    type: 'number',
    required: true,
    default: 0,
    description: 'Nota Que o Cliente Deu',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
  },
  {
    displayName: 'Comentário Feito Pelo Cliente',
    name: 'comment',
    type: 'string',
    default: '',
    description: 'Comentário que Foi Feito Pelo Cliente',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
  },
  {
    displayName: 'Data Da Resposta',
    name: 'answered_at',
    type: 'string',
    default: '',
    description: 'Data da resposta em timezone UTC +0',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
  },
  {
    displayName: 'URL Da Pesquisa',
    name: 'surveryurl',
    type: 'string',
    required: true,
    default: '',
    description: 'URL para acesso a pesquisa',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientsearch']
      }
    },
  },
  //===============================================================ACCESS DATA================================================================================
  {
    displayName: 'URL Da Página De Membros',
    name: 'memberurl',
    type: 'string',
    required: true,
    default: '',
    description: 'URL para Redirecionamento da Página de Membros',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
  },
  {
    displayName: 'URL De Primeiro Acesso Do Cliente',
    name: 'first_access_url',
    type: 'string',
    required: true,
    default: '',
    description: 'URL do primeiro acesso do cliente para criação de senha',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
  },
  {
    displayName: 'Login',
    name: 'login',
    type: 'string',
    required: true,
    default: '',
    description: 'Login do usuário na página de membros',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
  },
  {
    displayName: 'Senha',
    name: 'password',
    type: 'string',
    required: true,
    default: '',
    description: 'Senha do usuário na página de membros',
    typeOptions: {
      password: true
    },
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
  },
  //=================================================================ACCESS DATA END=============================================================================
  {
    displayName: 'URL Para Redefinição De Senha',
    name: 'urlchangepassword',
    // eslint-disable-next-line n8n-nodes-base/node-param-type-options-password-missing
    type: 'string',
    required: true,
    default: '',
    description: 'Link para redefinir a senha',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['changepasswordevent']
      }
    },
  },
];
