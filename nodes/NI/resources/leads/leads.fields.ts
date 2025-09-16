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
        operation: ['get_lead', 'delete_lead', 'addlist', 'add_list_lead', 'remove_list_lead',],
      },
    },
    description: 'Lead identifier',
  },
  {
    displayName: 'Operation Mode',
    name: 'operationMode',
    type: 'options',
    options: [
      { name: 'Create New Lead', value: 'create' },
      { name: 'Edit Existing Lead', value: 'update' },
			{ name: 'Auto Create/Edit Lead', value: 'create_edit' }
    ],
    default: 'create',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_edit_lead'],
      },
    },
    description: 'Choose whether to create a new lead or edit an existing one',
  },
  {
    displayName: 'Lead ID',
    name: 'id',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_edit_lead'],
        operationMode: ['update'],
      },
    },
    description: 'Unique identifier of the lead to edit',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['deletegroup'],
      },
    },
    routing: { send: { type: 'body', property: 'name' } },
    description: 'Lead’s full name',
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
        operation: ['create_edit_lead'],
				operationMode:['create','update','create_edit']
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
    default: '',
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_edit_lead'],
        operationMode:['create','update','create_edit']
      },
    },
    routing: { send: { type: 'body', property: 'phone' } },
    description: 'Lead’s phone number including area code (required for create)',
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
        operation: ['create_edit_lead'],
        operationMode: ['create'],
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
        operation: ['create_edit_lead'],
        operationMode: ['update', 'create_edit'],
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
        operation: ['create_edit_lead'],
				operationMode:['create','update','create_edit']
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
         operation: ['create_edit_lead'],
        operationMode:['create','update','create_edit']
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
  {
    displayName: 'Tags',
    name: 'addtags',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    placeholder: 'Add Tags',
    default: {},
    displayOptions: {
      show: {
        resource: ['leads'],
        operation: ['create_edit_lead'],
        operationMode:['create','update','create_edit']
      },
    },
    options: [
      {
        name: 'optiontags',
        displayName: 'Add Tags',
        values: [
          {
            displayName: 'Tags',
            name: 'tags1',
            type: 'string',
            default: '',
            description: 'Tag name',
          },
        ],
      },
    ],
    routing: {
      request: {
        body: {
          tags:
            '={{ Array.isArray($value.optiontags) ? $value.optiontags.map(o => o.tags1).filter(Boolean) : (Array.isArray($value) ? $value.map(o => o.tags1).filter(Boolean) : []) }}',
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
];
