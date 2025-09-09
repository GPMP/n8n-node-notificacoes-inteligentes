import type { INodeProperties } from 'n8n-workflow';

export const listsFields: INodeProperties[] = [
  // getAllLists — include (source | leadsCount)
  {
    displayName: 'Include Relationships',
    name: 'include',
    type: 'multiOptions',
    placeholder: 'Choose',
    options: [
      { name: 'Source', value: 'source' },
      { name: 'Lead Count', value: 'leadsCount' },
    ],
    default: [],
    description: 'Relationships to include in the request',
    displayOptions: { show: { resource: ['leadslist'], operation: ['getAllLists'] } },
    routing: { request: { qs: { include: '={{$value}}' } } },
  },

  // getAllLists — append (has_leads)
  {
    displayName: 'Additional Relationships',
    name: 'append',
    type: 'multiOptions',
    placeholder: 'Choose',
    options: [{ name: 'Has Leads', value: 'has_leads' }],
    default: [],
    description: 'Properties to include in the response',
    displayOptions: { show: { resource: ['leadslist'], operation: ['getAllLists'] } },
    routing: { request: { qs: { append: '={{$value}}' } } },
  },

  // getAllLists — filters
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Choose',
    default: {},
    options: [
      { displayName: 'Name', type: 'string', name: 'nameFilter', default: '', description: 'Filter lists by name' },
      { displayName: 'Type', type: 'string', name: 'typeFilter', default: '', description: 'Filter lists by type' },
    ],
    displayOptions: { show: { resource: ['leadslist'], operation: ['getAllLists'] } },
    description: 'Set filters to search for specific lists',
    routing: {
      request: {
        qs: {
          'filter[name]': '={{ $value.nameFilter }}',
          'filter[type]': '={{ $value.typeFilter }}',
        },
      },
    },
  },

  // listId used by multiple operations
  {
    displayName: 'List ID',
    name: 'listId',
    type: 'string',
    required: true,
    default: '',
    description: 'Unique identifier of the list',
    displayOptions: {
      show: {
        resource: ['leadslist'],
        operation: ['getList', 'listLeads', 'deleteList', 'addLeads', 'removeLeads'],
      },
    },
  },

  // addLeads/removeLeads — lead IDs
  {
    displayName: 'Leads (IDs)',
    name: 'leadIds',
    type: 'string',
    required: true,
    placeholder: 'Example: 17, 25, 33',
    default: '',
    description: 'Identifiers of leads to be added or removed',
    displayOptions: { show: { resource: ['leadslist'], operation: ['addLeads', 'removeLeads'] } },
    routing: {
      request: {
				body: {
            leads:'={{ String($value).split(",").map(i => parseInt(i.trim(), 10)).filter(id => Number.isFinite(id) && id > 0) }}',
          }
      },
    },
  },

  // createList — name + dynamic type (in body)
  {
    displayName: 'List Name',
    name: 'listName',
    type: 'string',
    required: true,
    default: '',
    description: 'Name of the new list to create',
    displayOptions: { show: { resource: ['leadslist'], operation: ['createList'] } },
    routing: {
      request: {
        body: {
          name: '={{ $value }}',
          type: '={{ "dynamic" }}', // static and hidden from the user
        },
      },
    },
  },

  // getList — include=source
  {
    displayName: 'Include Source Details',
    name: 'includeSource',
    type: 'options',
    placeholder: 'Choose',
    options: [{ name: 'Source', value: 'source' }],
    default: 'source',
    description: 'Additional parameters to fetch the list’s source details',
    displayOptions: { show: { resource: ['leadslist'], operation: ['getList'] } },
    routing: { request: { qs: { include: '={{ $value }}' } } },
  },

  // listLeads — include extra
  {
    displayName: 'Include Relationships',
    name: 'includeRelations',
    type: 'multiOptions',
    options: [
      { name: 'Lists', value: 'lists' },
      { name: 'List Source', value: 'lists.source' },
    ],
    default: [],
    displayOptions: { show: { resource: ['leadslist'], operation: ['listLeads'] } },
    routing: { send: { type: 'query', property: 'include' } },
  },

  // listLeads — filters
  {
    displayName: 'Filter Leads In List By',
    name: 'leadFilters',
    type: 'collection',
    default: {},
    options: [
      { displayName: 'Lead Name', name: 'nameFilter', type: 'string', default: '' },
      { displayName: 'Lead Phone', name: 'phoneFilter', type: 'string', default: '' },
      { displayName: 'Lead Email', name: 'emailFilter', type: 'string', default: '' },
    ],
    displayOptions: { show: { resource: ['leadslist'], operation: ['listLeads'] } },
    routing: {
      request: {
        qs: {
          'filter[name]': '={{ $value.nameFilter || undefined }}',
          'filter[phone]': '={{ $value.phoneFilter || undefined }}',
          'filter[email]': '={{ $value.emailFilter || undefined }}',
        },
      },
    },
  },
];
