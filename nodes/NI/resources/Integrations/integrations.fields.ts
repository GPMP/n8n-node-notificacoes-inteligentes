import type { INodeProperties } from 'n8n-workflow';


export const integrationsFields: INodeProperties[] =
[
  {
    displayName: 'Nome',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['createintegration'],
      },
    },
    description: 'O nome da integração (limite de 100 caracteres).',
  },
  {
    displayName: 'Plataforma',
    name: 'platform',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['createintegration'],
      },
    },
    description: 'A plataforma da integração. Exemplos: "abmex", "active-campaign", "api-next", "app-max", "asaas", "assiny", "astronmembers", "azcend", "bagy-checkout-abandoned", "beeviral", "bling-orders-2", "blitzpay", "bonifiq", "braavo", "braip", "brasil-na-web", "brevo", "builder-all", "buzz-lead", "cakto", "calendly", "cartpanda", "celetus", "climba", "compra-rapida", "convertize", "convvert", "digital-manager-guru", "dinamize", "disrupty", "dooca", "doppus", "doppus-v3", "e-com-plus", "e-goi", "ead-plataforma", "eduzz-2", "elementor", "ensinio", "fidelimax", "fidelizar", "find-my-pack-next", "flexy", "forms-app", "funnel-kit", "galax-pay", "greatpages", "greenn", "growth-machine", "hero-spark", "hopy", "hotmart-v2", "hubla", "hubspot", "infusionsoft", "inlead", "inter", "irroba", "iset-2", "istpay", "iugu", "jet", "kapsula", "kirvano", "kiwify-2", "lastlink", "lead-lovers", "loja-integrada", "lpqv", "luna-checkout", "macro", "magazord", "mailchimp", "manychat", "mautic", "member-kit", "mercado-pago", "monetizze-2", "moovin", "notazz", "nuvem-shop", "omie", "pagali-2", "pagar-me-1", "pagar-me-2", "pag-hiper", "paypal", "payt", "pepper", "perfect-pay", "pluga", "prestashop", "rd-station", "shopify-next", "shoppub", "simplo-7", "spedy", "stripe", "thrivecart", "ticto-3", "tiny", "track-co", "tray", "tray-corp", "troquecommerce", "typeform", "via-shop-moda", "vindi", "vnda", "voomp", "vtex", "wapstore", "wbuy-2", "we-help", "webstore", "wide-pay", "woocommerce", "woocommerce-cart-abandonment-recovery", "yampi", "yapay", "yever", "zoppy", "zouti".',
  },
  {
    displayName: 'ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration', 'events'],
        operation: ['updateintegration', 'getintegration','createnewevent','canceledorder','orderpaid','createnewticket', 'orderreceived','refundorder','orderdispatched','orderprocessed', 'orderout','orderprocessupdated','orderwaiting','orderwaitingcharge','accessevent','changepasswordevent','eventclientscore','eventclientsearch'],
      },
    },
    description: 'O ID da integração existente.',
  },
  {
    displayName: 'Novo Nome',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['updateintegration'],
      },
    },
    description: 'O novo nome da integração no painel (limite de 100 caracteres).',
  },
  {
    displayName: 'Parâmetros Adicionais',
    name: 'parameteraddintegration',
    type: 'multiOptions',
    placeholder: 'Escolha',
    options: [
      {
        name: 'Setup Fields',
        value: 'setup_fields',
      },
      {
        name: 'Eventos Disponíveis',
        value: 'available_events',
      },
      {
        name: 'Checklist',
        value: 'checklist',
      },
    ],
    default: [],
    description: 'Relacionamentos opcionais a serem incluídos na requisição.',
    displayOptions: {
      show: {
        resource: ['integration'],
        operation: ['getintegration']
      }
    },
  },
]
