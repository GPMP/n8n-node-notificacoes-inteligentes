import type { INodeProperties } from 'n8n-workflow';

export const integrationsFields: INodeProperties[] = [
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration', 'events'],
        operation: [
          'get_integration', 'createnewevent', 'canceledorder', 'orderpaid', 'createnewticket',
          'orderreceived', 'refundorder', 'orderdispatched', 'orderprocessed', 'orderout',
          'orderprocessupdated', 'orderwaiting', 'orderwaitingcharge', 'accessevent',
          'changepasswordevent', 'eventclientscore', 'eventclientsearch', 'delete_integration',
          'edit_integration'
        ],
      },
    },
    description: 'The ID of the existing integration',
    routing: { send: { type: 'body', property: 'id' } },
  },
  {
    displayName: 'Integration Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['create_integration'],
      },
    },
    routing: { send: { type: 'body', property: 'name' } },
    description: 'The name of the integration (maximum 100 characters)',
  },
  {
    displayName: 'Platform',
    name: 'platform',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['create_integration'],
      },
    },
    routing: { send: { type: 'body', property: 'platform' } },
    description:
      'The platform of the integration. Examples: "abmex", "active-campaign", "api-next", "app-max", "asaas", "assiny", "astronmembers", "azcend", "bagy-checkout-abandoned", "beeviral", "bling-orders-2", "blitzpay", "bonifiq", "braavo", "braip", "brasil-na-web", "brevo", "builder-all", "buzz-lead", "cakto", "calendly", "cartpanda", "celetus", "climba", "compra-rapida", "convertize", "convvert", "digital-manager-guru", "dinamize", "disrupty", "dooca", "doppus", "doppus-v3", "e-com-plus", "e-goi", "ead-plataforma", "eduzz-2", "elementor", "ensinio", "fidelimax", "fidelizar", "find-my-pack-next", "flexy", "forms-app", "funnel-kit", "galax-pay", "greatpages", "greenn", "growth-machine", "hero-spark", "hopy", "hotmart-v2", "hubla", "hubspot", "infusionsoft", "inlead", "inter", "irroba", "iset-2", "istpay", "iugu", "jet", "kapsula", "kirvano", "kiwify-2", "lastlink", "lead-lovers", "loja-integrada", "lpqv", "luna-checkout", "macro", "magazord", "mailchimp", "manychat", "mautic", "member-kit", "mercado-pago", "monetizze-2", "moovin", "notazz", "nuvem-shop", "omie", "pagali-2", "pagar-me-1", "pagar-me-2", "pag-hiper", "paypal", "payt", "pepper", "perfect-pay", "pluga", "prestashop", "rd-station", "shopify-next", "shoppub", "simplo-7", "spedy", "stripe", "thrivecart", "ticto-3", "tiny", "track-co", "tray", "tray-corp", "troquecommerce", "typeform", "via-shop-moda", "vindi", "vnda", "voomp", "vtex", "wapstore", "wbuy-2", "we-help", "webstore", "wide-pay", "woocommerce", "woocommerce-cart-abandonment-recovery", "yampi", "yapay", "yever", "zoppy", "zouti".',
  },
  {
    displayName: 'New Name',
    name: 'new_name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['edit_integration'],
      },
    },
    description: 'The new name of the integration in the dashboard (maximum 100 characters)',
    routing: { send: { type: 'body', property: 'name' } },
  },
];
