import type { INodeProperties } from "n8n-workflow";

export const eventsFields: INodeProperties[] = [

	// =============================================================CUSTOMER DATA=============================================================================
  {
    displayName: 'First Name',
    name: 'first_name',
    type: 'string',
    required: true,
    default: '',
    description: 'Customer’s first name',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.first_name'}}
  },
  {
    displayName: 'Phone',
    name: 'phone',
    type: 'string',
    required: true,
    default: '',
    description: 'Customer phone number including country and area code',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.phone'}}
  },
  {
    displayName: 'Last Name',
    name: 'last_name',
    type: 'string',
    default: '',
    description: 'Customer’s last name',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.last_name'}}
  },
  {
    displayName: 'Birth Date',
    name: 'birthdate',
    type: 'string',
    default: '',
    placeholder:'Format: Year-Month-Day | Example: 2001-08-20',
    description: 'Customer’s birth date',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.birthdate'}}
  },
  {
    displayName: 'Currency',
    name: 'currency',
    type: 'string',
    placeholder:'BRL | USD | GBP ...',
    default: '',
    description: 'Currency used by the customer',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.currency'}}
  },
  {
    displayName: 'Gender',
    name: 'gender',
    type: 'string',
    default: '',
    description: 'Customer’s gender',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.gender'}}
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    description: 'Customer’s email address',
		placeholder:'name@email.com',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.email'}}
  },
  {
    displayName: 'Tax ID (CPF/CNPJ)',
    name: 'cpf_cnpj',
    type: 'string',
    default: '',
    description: 'Customer’s tax document (CPF/CNPJ)',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.cpf_cnpj'}}
  },
  {
    displayName: 'IP Address',
    name: 'ip',
    type: 'string',
    default: '',
    description: 'Customer’s IP address',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','eventclientscore','eventclientsearch','accessevent','orderwaitingcharge','changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'customer.ip'}}
  },
  // ================================================================EVENTS PRODUCT DATA=======================================================================
  {
    displayName: 'Products',
    name: 'products',
    placeholder: 'Add Product Data',
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
            displayName: 'Product Name',
            name: 'name',
            type: 'string',
            required: true,
            default:'',
          },
          {
            displayName: 'Product Quantity',
            name: 'quantity',
            type: 'number',
            required: true,
            default:0,
          },
          {
            displayName: 'Product Value',
            name: 'value',
            type: 'number',
            required: true,
            default:0,
          },
        ],
      },
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewevent','accessevent','createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
		routing:{send: {
        type: 'body',
        property: 'order.products',
        value: '={{$value.metadataValues.map(product => ({ name: product.name, quantity: product.quantity, value: product.value }))}}'
      }
		}
  },
	//===================================================================ACCESS EVENT PRODUCT DATA==============================================================
  {
    displayName: 'Products Field Is Required',
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
  // ==========================================================================ORDER OBJECT=======================================================================
	{
    displayName: 'Order ID',
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
		routing:{send:{type:'body', property:'order.id'}}
  },
  {
    displayName: 'Order Products Total Value',
    name: 'products_total',
    type: 'number',
    required: true,
    default: 0,
    description: 'Sum of the product values',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket','canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.products_total'}}
  },
  {
    displayName: 'Order Total Value',
    name: 'total',
    type: 'number',
    required: true,
    default: 0,
    description: 'Order total amount',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.total'}}
  },
  {
    displayName: 'Discount',
    name: 'discount',
    type: 'number',
    required: true,
    default: 0,
    description: 'Total discount amount',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.discount'}}
  },
  {
    displayName: 'Status',
    name: 'status',
    type: 'string',
    default: '',
    description: 'Current order status description for enrichment',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket', 'canceledorder', 'orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting','orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.status'}}
  },
	// =========================================================================OPCIONAL ORDERS=====================================================================
  {
    displayName: 'Billet HTML URL',
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
		routing:{send:{type:'body', property:'order.billet_url'}}
  },
  {
    displayName: 'Billet PDF URL',
    name: 'billet_pdf',
    type: 'string',
    default: '',
    description: 'URL to view the billet in PDF',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
		routing:{send:{type:'body', property:'order.billet_pdf'}}
  },
  {
    displayName: 'Billet Digitable Line',
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
		routing:{send:{type:'body', property:'order.billet_barcode'}}
  },
  {
    displayName: 'Billet Amount',
    name: 'billet_value',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
		routing:{send:{type:'body', property:'order.billet_value'}}
  },
  {
    displayName: 'Billet Due Date',
    name: 'billet_due_date',
    type: 'dateTime',
    default: '',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['createnewticket']
      }
    },
		routing:{send:{type:'body', property:'order.billet_due_date', value:'={{ new Date($value).toISOString().slice(0,10) }}'}}
  },
  {
    displayName: 'Payment Method',
    name: 'payment_type',
    type: 'options',
    options: [
      {
        name: 'Credit Card',
        value: 'credit-card',
      },
      {
        name: 'Bank Deposit',
        value: 'deposit',
      },
      {
        name: 'PIX',
        value: 'pix',
      },
    ],
    default: 'deposit',
    description: 'Order payment type. Each type dispatches a corresponding event. For example, payment_type = deposit results in a bank deposit pending event.',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.payment_type'}}
  },
  {
    displayName: 'BACEN Code',
    name: 'bacen_code',
    type: 'string',
    required: true,
    default: '',
    description: 'BACEN code for PIX payment',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.pix.bacen_code'}}
  },
  {
    displayName: 'PIX Due Date',
    name: 'due_date',
    type: 'dateTime',
    required: true,
    default: '',
    description: 'PIX due date in UTC +0 timezone (required for PIX reminder to work)',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.pix.due_date', value:'={{ new Date($value).toISOString().replace("T", " ").split(".")["0"] }}'}}
  },
  {
    displayName: 'QR Code',
    name: 'qrcode',
    type: 'string',
    required: true,
    default: '',
    description: 'QR code for PIX payment',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.pix.qr_code'}}
  },
  {
    displayName: 'PIX Payment URL',
    name: 'pixurl',
    type: 'string',
    required: true,
    default: '',
    description: 'URL for PIX payment',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.pix.url'}}
  },
  {
    displayName: 'PIX Amount',
    name: 'pixvalue',
    type: 'number',
    required: true,
    default: 0,
    description: 'PIX payment amount',
    displayOptions: {
      show: {
        payment_type: ['pix'],
        resource: ['events'],
        operation: ['orderwaitingcharge']
      }
    },
		routing:{send:{type:'body', property:'order.pix.value'}}
  },
  //==========================================================================CHECKOUT DATA========================================================================
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
        description: 'Add order details',
        placeholder: 'Add order details',
        values: [
          {
            displayName: 'URL',
            name: 'url',
            type: 'string',
            description: 'Checkout URL to return the customer to the purchase',
            default: ''
          },
          {
            displayName: 'ID',
            name: 'cartid',
            type: 'string',
            default: '',
            description: 'Cart identifier code',
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
		routing:{request:{body:{checkout:{url:'={{$value.checkout.url}}', id:'={{$value.checkout.cartid}}'}}}}
  },
  //=========================================================================ADDRESS DATA==========================================================================
  {
    displayName: 'Address Parameters',
    name: 'addressparameter',
    placeholder: 'Customer Address',
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
            displayName: 'City',
            name: 'city',
            type: 'string',
            default: '',
            description: 'Customer city',
          },
          {
            displayName: 'Complement',
            name: 'complement',
            type: 'string',
            default: '',
            description: 'Customer address complement',
          },
          {
            displayName: 'Country',
            name: 'country',
            type: 'string',
            default: '',
            description: 'Customer country',
          },
          {
            displayName: 'Neighborhood',
            name: 'neighborhood',
            type: 'string',
            default: '',
            description: 'Customer neighborhood',
          },
          {
            displayName: 'Number',
            name: 'number',
            type: 'string',
            default: '',
            description: 'Customer house number',
          },
          {
            displayName: 'Postal Code',
            name: 'postal_code',
            type: 'string',
            default: '',
            description: 'Customer postal code',
          },
          {
            displayName: 'State',
            name: 'state',
            type: 'string',
            default: '',
            description: 'Customer state',
          },
          {
            displayName: 'Street',
            name: 'street',
            type: 'string',
            default: '',
            description: 'Customer street',
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
		routing:{request:{body:{address:{city:'={{$value.address.city}}', complement:'={{$value.address.complement}}', country:'={{$value.address.country}}', neighborhood:'={{$value.address.neighborhood}}',number:'={{$value.address.number}}',postal_code:'={{$value.address.postal_code}}',state:'={{$value.address.state}}',street:'={{$value.address.street}}'}}}}
  },
  //=====================================================================DELIVERY DATA===========================================================================
  {
    displayName: 'Delivery Parameters',
    name: 'deliveryparameter',
    placeholder: 'Delivery',
    type: 'fixedCollection',
    default: {},
    typeOptions: {
      multipleValues: false,
    },
    options: [
      {
  name: 'delivery',
  displayName: 'Delivery',
  values: [
    {
      displayName: 'Delivery Description',
      name: 'description',
      type: 'string',
      typeOptions: {
        rows: 4,
      },
      default: '',
      description: 'Field for delivery information such as timeframe or method',
    },
    {
      displayName: 'Delivery Fee Amount',
      name: 'trackingvalue',
      type: 'string',
      default: '',
      description: 'Total shipping fee amount',
    },
    {
      displayName: 'Delivery Message',
      name: 'messageorder',
      type: 'string',
      default: '',
      description: 'Field for a delivery message',
    },
    {
      displayName: 'Delivery Tracking Code',
      name: 'trackingcode',
      type: 'string',
      default: '',
      description: 'Field to inform the delivery tracking code',
    },
    {
      displayName: 'Delivery Tracking URL',
      name: 'trackingcodeurl',
      type: 'string',
      default: '',
      description: 'Field to inform the delivery tracking URL',
    },
    {
      displayName: 'Estimated Delivery Date',
      name: 'orderdate',
      type: 'dateTime',
      default: '',
      description: 'Estimated delivery date in UTC +0 timezone',
    },
  ]
}
    ],
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['canceledorder','orderpaid','refundorder','orderreceived','orderdispatched','orderprocessed','orderout','orderprocessupdated','orderwaiting']
      }
    },
		routing:{request:{body:{order:{delivery:{fee:'={{$value.delivery.trackingvalue}}',description:'={{$value.delivery.description}}',code:'={{$value.delivery.trackingcode}}',url:'={{$value.delivery.trackingcodeurl}}',estimate: '={{ new Date($value.delivery.orderdate).toISOString().slice(0,10) }}',message:'={{$value.delivery.messageorder}}'}}}}}
  },
  //=====================================================NPS DATA =======================================================================================
  {
    displayName: 'Customer Score',
    name: 'score',
    type: 'number',
    required: true,
    default: 0,
    description: 'Score given by the customer',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
		routing:{send:{type:'body',property:'nps.answer.score'}}
  },
  {
    displayName: 'Customer Comment',
    name: 'comment',
    type: 'string',
    default: '',
    description: 'Comment provided by the customer',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
		routing:{send:{type:'body',property:'nps.answer.comment'}}
  },
  {
    displayName: 'Answered At',
    name: 'answered_at',
    type: 'dateTime',
    default: '',
    description: 'Answer date/time in UTC +0',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientscore']
      }
    },
		routing:{send:{type:'body',property:'nps.answer.answered_at', value:'={{ new Date($value).toISOString().replace("T", " ").split(".")["0"] }}'}}
  },
  {
    displayName: 'Survey URL',
    name: 'surveryurl',
    type: 'string',
    required: true,
    default: '',
    description: 'URL to access the survey',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['eventclientsearch']
      }
    },
		routing:{send:{type:'body',property:'nps.survery.url'}}
  },
  //===============================================================ACCESS DATA================================================================================
  {
    displayName: 'Members Page URL',
    name: 'memberurl',
    type: 'string',
    required: true,
    default: '',
    description: 'Redirect URL for the members page',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
		routing:{send:{type:'body',property:'access.url'}}
  },
  {
    displayName: 'Customer First Access URL',
    name: 'first_access_url',
    type: 'string',
    required: true,
    default: '',
    description: 'First access URL for the customer to create a password',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
		routing:{send:{type:'body',property:'access.first_access_url'}}
  },
  {
    displayName: 'Login',
    name: 'login',
    type: 'string',
    required: true,
    default: '',
    description: 'User login on the members page',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
		routing:{send:{type:'body',property:'access.login'}}
  },
  {
    displayName: 'Password',
    name: 'password',
    type: 'string',
    required: true,
    default: '',
    description: 'User password on the members page',
    typeOptions: {
      password: true
    },
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['accessevent']
      }
    },
		routing:{send:{type:'body',property:'access.password'}}
  },
  //=================================================================ACCESS DATA END=============================================================================
  {
    displayName: 'Password Reset URL',
    name: 'urlchangepassword',
    // eslint-disable-next-line n8n-nodes-base/node-param-type-options-password-missing
    type: 'string',
    required: true,
    default: '',
    description: 'Link to reset the password',
    displayOptions: {
      show: {
        resource: ['events'],
        operation: ['changepasswordevent']
      }
    },
		routing:{send:{type:'body',property:'reset_password.url'}}
  },
];
