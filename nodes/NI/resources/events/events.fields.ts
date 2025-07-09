import type { INodeProperties } from "n8n-workflow";

export const eventsFields:INodeProperties[] =
[
  // ================================================CUSTOMER DATA===============================================
  {
    displayName: 'Primeiro Nome',
    name: 'first_name',
    type: 'string',
    required: true,
    default: '',
    description: 'Primeiro nome do cliente.',
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
    description: 'Número de telefone do cliente contendo DDD e código do país.',
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
    required: false,
    default: '',
    description: 'Sobrenome do cliente.',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },
  {
    displayName: 'Data de Nascimento',
    name: 'birthdate',
    type: 'string',
    required: false,
    default: '',
		placeholder:'Formato: Ano-Mês-Dia | Exemplo: 2001-08-20',
    description: 'Data de nascimento do cliente.',
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
    required: false,
    default: '',
    description: 'Tipo da moeda utilizada pelo cliente.',
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
    required: false,
    default: '',
    description: 'Gênero do cliente.',
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
    required: false,
    default: '',
    description: 'Email do cliente.',
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
    required: false,
    default: '',
    description: 'Documento do cliente (CPF/CNPJ).',
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
    required: false,
    default: '',
    description: 'Endereço de IP do cliente.',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
  },

  // ================================================CUSTOMER DATA END===============================================


  // ================================================PRODUCT DATA===============================================

  // {
  //   displayName: 'Nome do Produto',
  //   name: 'productname',
  //   type: 'string',
  //   required: true,
  //   default: '',
  //   description: 'Nome do produto.',
  //   displayOptions: {
  //     show: {
  //       resource: ['events'],
  //       operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','accessevent','orderwaitingcharge']
  //     }
  //   },
  // },
  // {
  //   displayName: 'Quantidade do Produto',
  //   name: 'productquantity',
  //   type: 'number',
  //   required: true,
  //   default: 0,
  //   description: 'Quantidade de itens do produto.',
  //   displayOptions: {
  //     show: {
  //       resource: ['events'],
  //       operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','accessevent','orderwaitingcharge']
  //     }
  //   },
  // },
  // {
  //   displayName: 'Valor do Produto',
  //   name: 'productvalue',
  //   type: 'number',
  //   required: true,
  //   default: 0,
  //   description: 'Valor unitário do produto.',
  //   displayOptions: {
  //     show: {
  //       resource: ['events'],
  //       operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','accessevent','orderwaitingcharge']
  //     }
  //   },
  // },


	{
		displayName: 'Produtos',
		name: 'products',
		placeholder: 'Adicionar dados do(s) produto(s)',
		type: 'fixedCollection',
		required:true,
		default: '',
		typeOptions: {
			multipleValues: true,
		},
		description: '',
		options: [
			{
				name: 'metadataValues',
				displayName: 'Metadata',
				values: [
					{
						displayName: 'Nome do Produto',
		name: 'productname',
		type: 'string',
		required: true,
		default:''
					},
					{
						displayName: 'Quantidade do Produto',
		name: 'productquantity',
		type: 'number',
		required: true,
		default:'0'
					},
					{
						displayName: 'Valor do Produto',
		name: 'productvalue',
		type: 'number',
		required: true,
		default:'0'
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
		displayName: 'Campo Produtos obrigatório!',
		name: 'notice',
		type: 'notice',
		default: '',

		displayOptions:
		{show:{
			resource: ['events'],
			operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','accessevent','orderwaitingcharge']
		}
		}
	},

  // ================================================PRODUCT DATA END===============================================================

  //=================================================ORDER OBJECT====================================================================
  {
    displayName: 'ID do Pedido',
    name: 'orderid',
    type: 'string',
    required: true,
    default: '',
    description: 'ID do pedido.',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Valor Somado dos Produtos do Pedido',
    name: 'products_total',
    type: 'number',
    required: true,
    default: 0,
    description: 'Somatória dos valores dos produtos.',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Valor do Pedido Total',
    name: 'total',
    type: 'number',
    required: true,
    default: 0,
    description: 'Total do valor do pedido.',
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
    description: 'Desconto total do pedido.',
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
    required: false,
    default: '',
    description: 'Descrição atual do estado do pedido para enriquecimento das informações.',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Link para o Boleto em HTML',
    name: 'billet_url',
    type: 'string',
    required: true,
    default: '',
    description: 'Link para o boleto em HTML.',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Link para o Boleto em PDF',
    name: 'billet_pdf',
    type: 'string',
    required: false,
    default: '',
    description: 'Link para visualizar o boleto em PDF.',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Linha Digitável do Boleto',
    name: 'billet_barcode',
    type: 'string',
    required: true,
    default: '',
    description: 'Linha digitável do boleto.',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Valor do Boleto',
    name: 'billet_value',
    type: 'number',
    required: false,
    default: 0,
    description: 'Valor do boleto.',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Data do Vencimento do Boleto',
    name: 'billet_due_date',
    type: 'string',
    required: false,
    default: '',
    description: 'Data de vencimento do boleto em timezone UTC +0 (necessário para o funcionamento do lembrador de boletos).',
    displayOptions: {
      show: {
        resource: ['events'],
    operation: ['createnewticket']
      }
    },
  },
  {
    displayName: 'Método de Pagamento',
    name: 'payment_type',
    type: 'options',
    options: [
      {
        name: 'Cartão de Crédito',
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
    default: '',
    description: 'Tipo de pagamento do pedido. Para cada tipo de pagamento, um evento daquele tipo será despachado. Ex: um pedido com payment_type = deposit irá resultar em um evento do tipo aguardando depósito bancário.',
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
    description: 'Código Bacen para o pagamento do PIX.',
    displayOptions: {
      show: {
        payment_type:['pix'],
        resource: ['events'],
    operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Data do Vencimento do Pix ',
    name: 'due_date',
    type: 'dateTime',
    required: true,
    default: '',
    description: 'Data de vencimento do PIX em timezone UTC +0 (necessário para o funcionamento do lembrador de PIX).',
    displayOptions: {
      show: {
        payment_type:['pix'],
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
    description: 'QR Code para o pagamento do PIX.',
    displayOptions: {
      show: {
        payment_type:['pix'],
        resource: ['events'],
    operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'URL de Pagamento do Pix',
    name: 'pixurl',
    type: 'string',
    required: true,
    default: '',
    description: 'URL para o pagamento do PIX.',
    displayOptions: {
      show: {
        payment_type:['pix'],
        resource: ['events'],
    operation: ['orderwaitingcharge']
      }
    },
  },
  {
    displayName: 'Valor do Pix',
    name: 'pixvalue',
    type: 'number',
    required: true,
    default: 0,
    description: 'Valor do pagamento do PIX.',
    displayOptions: {
      show: {
        payment_type:['pix'],
        resource: ['events'],
    operation: ['orderwaitingcharge']
      }
    },
  },


  //=====================================================CHECKOUT DATA==============================================================================
  {
    displayName: 'Checkout',
    name: 'checkoutparameter',
    placeholder: 'Checkout',
    type: 'fixedCollection',
    required: false,
    default: '',
    typeOptions: {
      multipleValues: false,
    },
    description: '',
    options: [
      {
        name: 'checkout',
        displayName: 'Checkout',
				description:'Adiciona informações sobre o pedido.',
				placeholder:'Adiciona informações sobre o pedido',
        values: [
          {
            displayName: 'Url',
            name: 'url',
            type: 'string',
            required:false,
            description: 'URL do checkout para retornar o cliente para a compra.',
            default:''
          },
          {
            displayName: 'ID',
            name: 'cartid',
            type: 'string',
            required:false,
            default: '',
            description: 'Código de identificação do carrinho.',
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

  //===============================================================CHECKOUT DATA END=======================================================================

  //=============================================================ADDRESS DATA=================================================================================
  {
    displayName: 'Parâmetros Adicionais',
    name: 'addressparameter',
    placeholder: 'Endereço do Cliente',
    type: 'fixedCollection',
    required:false,
    default: '',
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
            required:false,
            description: 'Cidade do cliente.',
            default:''
          },
          {
            displayName: 'Complemento',
            name: 'complement',
            type: 'string',
            required:false,
            default: '',
            description: 'Complemento do cliente.',
          },
          {
            displayName: 'País',
            name: 'country',
            type: 'string',
            required:false,
            default: '',
            description: 'País do cliente.',
          },
          {
            displayName: 'Bairro',
            name: 'neighborhood',
            type: 'string',
            required:false,
            default: '',
            description: 'Bairro do cliente.',
          },
          {
            displayName: 'Número',
            name: 'number',
            type: 'string',
            required:false,
            default: '',
            description: 'Número da casa do cliente.',
          },
          {
            displayName: 'CEP',
            name: 'postal_code',
            type: 'string',
            required:false,
            default: '',
            description: 'CEP do cliente.',
          },
          {
            displayName: 'Estado',
            name: 'state',
            type: 'string',
            required:false,
            default: '',
            description: 'Estado do cliente.',
          },
          {
            displayName: 'Rua',
            name: 'street',
            type: 'string',
            required:false,
            default: '',
            description: 'Rua do cliente.',
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

  //=================================================ADDRESS DATA END================================================
  //=================================================DELIVERY DATA===================================================
  {
    displayName: 'Parâmetros Adicionais',
    name: 'deliveryparameter',
    placeholder: 'Entrega',
    type: 'fixedCollection',
    required: false,
    default: '',
    typeOptions: {
      multipleValues: false,
    },
    options: [
      {
        name: 'delivery',
        displayName: 'Entrega',
        values: [
          {
            displayName: 'Valor do Frete da Entrega',
            name: 'trackingvalue',
            type: 'string',
            required:false,
            description: 'Valor total do frete.',
            default:''
          },
          {
            displayName: 'Descrição da Entrega',
            name: 'description',
            type: 'string',
            required:false,
            typeOptions:{
              rows:4
            },
            default: '',
            description: 'Campo para informações sobre a entrega, como prazo ou método.',
          },
          {
            displayName: 'Código de Rastreio da Entrega',
            name: 'trackingcode',
            type: 'string',
            required:false,
            default: '',
            description: 'Campo para informar o código de rastreio da entrega.',
          },
          {
            displayName: 'URL de Rastreio da Entrega',
            name: 'trackingcodeurl',
            type: 'string',
            required:false,
            default: '',
            description: 'Campo para informar a URL de rastreio da entrega.',
          },
          {
            displayName: 'Data de Estimativa de Entrega do Pedido',
            name: 'orderdate',
            type: 'string',
            required:false,
						placeholder:'ANO-MÊS-DIA',
            default: '',
            description: 'Data de estimativa de entrega do pedido em timezone UTC +0.',
          },
          {
            displayName: 'Mensagem da Entrega',
            name: 'messageorder',
            type: 'string',
            required:false,
            default: '',
            description: 'Campo para mensagem sobre entrega.',
          },

        ],
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting']
      }
    },
  },

  //=====================================================DELIVERY DATA END ==============================================================================

  //=====================================================NPS DATA =======================================================================================
  {
    displayName: 'Nota Dada pelo Cliente',
    name: 'score',
    type: 'number',
    required: true,
    default: 0,
    description: 'Nota dada pelo cliente.',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore',]
      }
    },
  },
  {
    displayName: 'Comentário Feito Pelo Cliente',
    name: 'comment',
    type: 'string',
    required: false,
    default: '',
    description: 'Comentário feito pelo cliente.',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
  },
  {
    displayName: 'Data da Resposta',
    name: 'answered_at',
    type: 'string',
    required: false,
    default: '',
    description: 'Data da resposta em timezone UTC +0.',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
  },
	{
    displayName: 'URL da Pesquisa',
    name: 'surveryurl',
    type: 'string',
    required: true,
    default: '',
    description: 'URL para acesso a pesquisa.',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientsearch']
      }
    },
  },
//==============================================================NPS DATA END================================================================================

//===============================================================ACCESS DATA================================================================================
{
  displayName: 'URL da Página de Membros',
  name: 'memberurl',
  type: 'string',
  required: true,
  default: '',
  description: 'URL da página de membros.',
  displayOptions: {
    show: {
      resource: ['events'],
      operation: ['accessevent']
    }
  },
},
{
  displayName: 'URL de Primeiro Acesso do Cliente',
  name: 'first_access_url',
  type: 'string',
  required: true,
  default: '',
  description: 'URL do primeiro acesso do cliente para criação de senha.',
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
  description: 'Login do usuário na página de membros.',
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
  description: 'Senha do usuário na página de membros.',
	typeOptions:{
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
  displayName: 'URL para Redefinição de Senha',
  name: 'urlchangepassword',
  type: 'string',
  required: true,
  default: '',
  description: 'Link para redefinir a senha.',
  displayOptions: {
    show: {
      resource: ['events'],
      operation: ['changepasswordevent']
    }
  },
},
]
