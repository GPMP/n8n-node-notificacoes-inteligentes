/* eslint-disable n8n-nodes-base/node-param-collection-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';

export const leadsFields: INodeProperties[] = [
  {
    displayName: 'Lead ID',
    name: 'id',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads', 'leadslist'],
        operation: ['get_lead', 'delete_lead', 'addlist', 'add_list_lead', 'remove_list_lead','update_lead', 'add_tags', 'update_tags', 'remove_tags'],
      },
    },
    description: 'Lead identifier',
  },
	{
    displayName: 'Lead Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_lead','update_lead','create_update_lead'],
      },
    },
    routing: { send: { type: 'body', property: 'name' } },
    description: 'Lead’s full name',
  },
	{
    displayName: 'Phone',
    name: 'phone',
    type: 'string',
    required: true,
		placeholder: "+55 (Brasil), +1 (EUA), +54 (Argentina)...",
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_lead','update_lead','create_update_lead'],
      },
    },
    routing: { send: { type: 'body', property: 'phone' } },
    description: "Phone country code with + prefix is required. Examples: +55, +1, +54, +52.",
  },
	{
  displayName: 'WARNING! You must include the plus sign (+) prefix with the number; Ex: | +55 | +1',
  name: 'notice',
  type: 'notice',
  default: '',
	displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_lead','update_lead','create_update_lead'],
      },
},
	},

  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    required: true,
    placeholder: 'name@email.com',
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_lead','create_update_lead'],
      },
    },
    routing: { send: { type: 'body', property: 'email' } },
    description: 'Lead’s email address (required for create)', // Dupliquei email pois o email do update não é required
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['update_lead'],
      },
    },
    routing: { send: { type: 'body', property: 'email' } },
    description: 'Optional email when editing a lead',
  },
  {
    displayName: 'Notes',
    name: 'notes',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_lead','update_lead','create_update_lead']

      },
    },
    routing: { send: { type: 'body', property: 'notes' } },
    description: 'Additional notes or remarks about the lead',
  },
  {
    displayName: 'Custom Variables',
    name: 'customVariables',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    placeholder: 'Add Variable',
    default: {},
    displayOptions: {
      show: {
        resource: ['leads'],
         operation: ['create_lead','update_lead','create_update_lead'],

      },
    },
    options: [
      {
        name: 'variable',
        displayName: 'Variable',
        values: [
          {
            displayName: 'Slug',
            name: 'slug',
            type: 'string',
            default: '',
            description: 'Slug of the custom variable to edit',
          },
          {
            displayName: 'Value',
            name: 'value',
            type: 'string',
            default: '',
            description: 'Value to assign to the custom variable',
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          custom_variables_to_add_or_update:
            '={{ Array.isArray($value.variable) ? $value.variable.map(v => ({ slug: v.slug, value: v.value })) : (Array.isArray($value) ? $value.map(v => ({ slug: v.slug, value: v.value })) : []) }}',
        },
      },
    },
  },
  // {
  //   displayName: 'Tags',
  //   name: 'addtags',
  //   type: 'fixedCollection',
  //   typeOptions: {
  //     multipleValues: true,
  //   },
  //   placeholder: 'Add Tags',
  //   default: {},
  //   displayOptions: {
  //     show: {
  //       resource: ['leads'],
  //       operation: ['create_lead','create_update_lead'],

  //     },
  //   },
  //   options: [
  //     {
  //       name: 'optiontags',
  //       displayName: 'Add Tags',
  //       values: [
  //         {
  //           displayName: 'Tags',
  //           name: 'tags1',
  //           type: 'string',
  //           default: '',
  //           description: 'Tag name',
  //         },
  //       ],
  //     },
  //   ],
  //   routing: {
  //     request: {
  //       body: {
  //         tags:
  //           '={{ Array.isArray($value.optiontags) ? $value.optiontags.map(o => o.tags1).filter(Boolean) : (Array.isArray($value) ? $value.map(o => o.tags1).filter(Boolean) : []) }}',
  //       },
  //     },
  //   },
  // },
	{
    displayName: 'Tags',
    name: 'action_tag',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['add_tags', 'update_tags', 'remove_tags','create_lead','create_update_lead'],
      },
    },
    description: 'Tags to be Added/Updated or Removed from Lead',
		// routing:{request:{
		// 	body: {tags:'={{$value.split(",").map(item => item.trim())}}'},}}
  },
	{
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
    displayName: 'Selectable Tags',
    name: 'selectable_tag',
    type: 'multiOptions',
    default: [],
		typeOptions:{
			loadOptionsMethod:'getTags'
		},
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['add_tags', 'update_tags', 'remove_tags','create_lead','create_update_lead'],
      },
    },
    // eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-dynamic-multi-options, n8n-nodes-base/node-param-description-missing-final-period
    description: 'Tags already created and available in your account. Choose from the list',
		routing:{request:{
			body: {tags:'={{$value}}'},}}
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    default: {},
    placeholder: 'Choose',
    options: [
      {
        displayName: 'Name',
        name: 'namefilter',
        type: 'string',
        default: '',
        description: 'Filter leads by name',
      },
      {
        displayName: 'Phone',
        name: 'phonefilter',
        type: 'string',
        default: '',
        description: 'Filter leads by phone number',
      },
      {
        displayName: 'Email',
        name: 'emailfilter',
        type: 'string',
        default: '',
        description: 'Filter leads by email address',
      },
      {
        displayName: 'Tag ID',
        name: 'tagfilter',
        type: 'string',
        default: '',
        description: 'Filter leads by tag ID',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['get_all_leads'],
      },
    },
    description: 'Set filters to search for specific leads',
    routing: {
      request: {
        qs: {
          'filter[name]': '={{$value.namefilter}}',
          'filter[phone]': '={{$value.phonefilter}}',
          'filter[email]': '={{$value.emailfilter}}',
          'filter[tags]': ['={{$value.tagfilter}}'],
        },
      },
    },
  },
	{
    displayName: 'Tracking Data',
    name: 'tracking_data',
    type: 'collection',
    default: {},
    placeholder: 'Add Tracking Data',
    options: [
      {
        displayName: 'Tracking User Agent',
        name: 'tracking_user_agent',
        type: 'string',
        default: '',
        description: 'Collecting information about a users browser and device from the "User Agent" string it sends to websites',
      },
      {
        displayName: 'Tracking IP Address',
        name: 'tracking_ip_address',
        type: 'string',
        default: '',
        description: 'Origin IP address of the click or conversion',
      },
      {
        displayName: 'Tracking Bing Muid',
        name: 'tracking_bing_muid',
        type: 'string',
        default: '',
        description: 'It identifies a users browser and device for website customization and analytics',
      },
      {
        displayName: 'Tracking Meta ADS Fbid',
        name: 'tracking_meta_ads_fbid',
        type: 'string',
        default: '',
        description: 'Facebook Ads click identifier',
      },
			{
        displayName: 'Tracking Meta Ads Fbp',
        name: 'tracking_meta_ads_fbp',
        type: 'string',
        default: '',
        description: 'Facebook Pixel browser identifier',
      },
			{
        displayName: 'Tracking Meta Ads Fbc',
        name: 'tracking_meta_ads_fbc',
        type: 'string',
        default: '',
        description: 'Facebook click browser identifier',
      },
			{
        displayName: 'Tracking Google Ga',
        name: 'tracking_google_ga',
        type: 'string',
        default: '',
        description: 'Google Analytics identifier',
      },
			{
        displayName: 'Tracking Google Gbraid',
        name: 'tracking_google_gbraid',
        type: 'string',
        default: '',
        description: 'Google AdWords (web-to-app)',
      },
			{
        displayName: 'Tracking Google Gclid',
        name: 'tracking_google_gclid',
        type: 'string',
        default: '',
        description: 'Google Ads click identifier',
      },
			{
        displayName: 'Tracking Google Gclsrc',
        name: 'tracking_google_gclsrc',
        type: 'string',
        default: '',
        description: 'Google DoubleClick platform',
      },
			{
        displayName: 'Tracking Google Dclid',
        name: 'tracking_google_dclid',
        type: 'string',
        default: '',
        description: 'Google Display Ads click ID',
      },
			{
        displayName: 'Tracking Google Wbraid',
        name: 'tracking_google_wbraid',
        type: 'string',
        default: '',
        description: 'Google AdWords (app-to-web)',
      },
			{
        displayName: 'Tracking Linkedin Bcookie',
        name: 'tracking_linkedin_bcookie',
        type: 'string',
        default: '',
        description: 'LinkedIn browser cookie identifier',
      },
			{
        displayName: 'Tracking Taboola T Gid',
        name: 'tracking_taboola_t_gid',
        type: 'string',
        default: '',
        description: 'Taboola global user identifier',
      },
			{
        displayName: 'Tracking Tiktok Ttlid',
        name: 'tracking_tiktok_ttlid',
        type: 'string',
        default: '',
        description: 'TikTok Ads click identifier',
      },
			{
        displayName: 'Tracking Tiktok Ttp',
        name: 'tracking_tiktok_ttp',
        type: 'string',
        default: '',
        description: 'TikTok tracking parameter identifier',
      },
			{
        displayName: 'Tracking Twitter Personalization ID',
        name: 'tracking_twitter_personalization_id',
        type: 'string',
        default: '',
        description: 'Twitter/X Ads personalization identifier',
      },
			{
        displayName: 'Tracking Utm Campaign',
        name: 'tracking_utm_campaign',
        type: 'string',
        default: '',
        description: 'Campaign to which the link is related',
      },
			{
        displayName: 'Tracking Utm Content',
        name: 'tracking_utm_content',
        type: 'string',
        default: '',
        description: 'The content where the link came from',
      },
			{
        displayName: 'Tracking Utm ID',
        name: 'tracking_utm_id',
        type: 'string',
        default: '',
        description: 'Campaign identifier',
      },
			{
        displayName: 'Tracking Utm Medium',
        name: 'tracking_utm_medium',
        type: 'string',
        default: '',
        description: 'Medium through which the link was published',
      },
			{
        displayName: 'Tracking Utm Source',
        name: 'tracking_utm_source',
        type: 'string',
        default: '',
        description: 'Origem do link',
      },
      {
        displayName: 'Tracking Utm Term',
        name: 'tracking_utm_term',
        type: 'string',
        default: '',
        description: 'Keyword related to the link',
      },
			{
        displayName: 'Tracking Ctwa Clid',
        name: 'tracking_ctwa_clid',
        type: 'string',
        default: '',
        description: 'WhatsApp Business Ads click identifier (Click to WhatsApp)',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_lead','update_lead','create_update_lead'],
      },
    },
    description: 'Set filters to search for specific leads',
    routing: {
      request: {
        qs: {
          'tracking_user_agent':'={{$value.tracking_user_agent}}',
          'tracking_ip_address':'={{$value.tracking_ip_address}}',
          'tracking_bing_muid':'={{$value.tracking_bing_muid}}',
          'tracking_meta_ads_fbid':'={{$value.tracking_meta_ads_fbid}}',
					'tracking_meta_ads_fbp':'={{$value.tracking_meta_ads_fbp}}',
					'tracking_meta_ads_fbc':'={{$value.tracking_meta_ads_fbc}}',
					'tracking_google_ga':'={{$value.tracking_google_ga}}',
					'tracking_google_gbraid':'={{$value.tracking_google_gbraid}}',
					'tracking_google_gclid':'={{$value.tracking_google_gclid}}',
					'tracking_google_gclsrc':'={{$value.tracking_google_gclsrc}}',
					'tracking_google_dclid':'={{$value.tracking_google_dclid}}',
					'tracking_google_wbraid':'={{$value.tracking_google_wbraid}}',
					'tracking_linkedin_bcookie':'={{$value.tracking_linkedin_bcookie}}',
					'tracking_taboola_t_gid':'={{$value.tracking_taboola_t_gid}}',
					'tracking_tiktok_ttlid':'={{$value.tracking_tiktok_ttlid}}',
					'tracking_tiktok_ttp':'={{$value.tracking_tiktok_ttp}}',
					'tracking_twitter_personalization_id':'={{$value.tracking_twitter_personalization_id}}',
					'tracking_utm_campaign':'={{$value.tracking_utm_campaign}}',
					'tracking_utm_content':'={{$value.tracking_utm_content}}',
					'tracking_utm_id':'={{$value.tracking_utm_id}}',
					'tracking_utm_medium':'={{$value.tracking_utm_medium}}',
					'tracking_utm_source':'={{$value.tracking_utm_source}}',
					'tracking_utm_term':'={{$value.tracking_utm_term}}',
					'tracking_ctwa_clid':'={{$value.tracking_ctwa_clid}}',
        },
      },
    },
  },
  {
    displayName: 'Include Relationships',
    name: 'aditionalfilter',
    type: 'multiOptions',
    options: [
      { name: 'Lists', value: 'lists' },
      { name: 'List Source', value: 'lists.source' },
      { name: 'Tags', value: 'tags' },
    ],
    default: [],
    description: 'Select which relationships to include in the request (e.g., lists, tags)',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['get_all_leads', 'get_lead'],
      },
    },
    routing: {
      request: {
        qs: {
          include: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'List ID(s)',
    name: 'lists_id',
    placeholder: '1234, 5678, 9101112',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['add_list_lead', 'remove_list_lead'],
      },
    },
    description: 'List ID(s) to associate with or remove from the lead (comma-separated)',
    routing: {
      request: {
        body: {
          lists: '={{$value.split(",").map(item => parseInt(item.trim(), 10))}}',
        },
      },
    },
  },
	{
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    default: {},
    placeholder: 'Choose',
    options: [
      {
        displayName: 'Scope',
        name: 'scope_filter',
        type: 'string',
        default: '',
        description: 'Filter leads by scope',
      },
      {
        displayName: 'Label',
        name: 'label_filter',
        type: 'string',
        default: '',
        description: 'Filter leads by label',
      },
    ],
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['get_all_tags'],
      },
    },
    description: 'Set filters to search for specific leads',
    routing: {
      request: {
        qs: {
          'filter[scope]': '={{$value.scope_filter}}',
          'filter[label]': '={{$value.label_filter}}',
        },
      },
    },
  },
];
