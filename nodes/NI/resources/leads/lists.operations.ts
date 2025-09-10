/* eslint-disable n8n-nodes-base/node-param-option-name-wrong-for-get-many */
import type { INodeProperties } from 'n8n-workflow';

export const listsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['leadslist'] },
    },
    options: [
      {
        name: 'Create List',
        value: 'createList',
        action: 'Create list',
        description: 'Create a new contact list in the system',
        routing: {
          request: { method: 'POST', url: '/lists' },
          output: {
            postReceive: [
              async function (this, items, response) {
                if ([200, 201, 204].includes(response.statusCode)) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'List created successfully!',
                        response: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create list'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Get All Lists',
        value: 'getAllLists',
        action: 'Get lists',
        description: 'Retrieve all existing contact lists',
        routing: {
          request: { method: 'GET', url: '/lists' },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{ !!$response.body?.links?.next }}',
                request: {
                  qs: {
                    page: '={{ Number($response.body?.meta?.current_page || 0) + 1 }}',
                    include: '={{ $request.qs.include}}',
                    append: '={{ $request.qs.append }}',
                    'filter[name]': '={{ $request.qs["filter[name]"] }}',
                    'filter[type]': '={{ $request.qs["filter[type]"] }}',
                  },
                },
              },
            },
          },
          send: { paginate: true },
          output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] }, // concatenate all pages
        },
      },

      {
        name: 'Get List by ID',
        value: 'getList',
        action: 'Get list',
        description: 'Retrieve a specific contact list by ID',
        routing: {
          request: { method: 'GET', url: '=/lists/{{$parameter.listId}}' },
        },
      },

      {
        name: 'Delete List',
        value: 'deleteList',
        action: 'Delete list',
        description: 'Remove a specific contact list by ID',
        routing: {
          request: { method: 'DELETE', url: '=/lists/{{$parameter.listId}}' },
          output: {
            postReceive: [
              async function (this, items, response) {
                if ([200, 201, 204].includes(response.statusCode)) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'List deleted successfully!',
                        response: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to delete list'}`
                );
              },
            ],
          },
        },
      },

      {
        name: 'List Leads in List',
        value: 'listLeads',
        action: 'List leads in list',
        description: 'List all leads belonging to a specific list',
        routing: {
          request: {
            method: 'GET',
            url: '=/lists/{{$parameter.listId}}/leads',
          },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{ !!$response.body?.links?.next }}',
                request: {
                  qs: {
                    page: '={{ Number($response.body?.meta?.current_page ?? $request.qs?.page ?? 0) + 1 }}',
                    include: '={{ $request.qs.include }}',
                    'filter[name]': '={{ $request.qs["filter[name]"] }}',
                    'filter[phone]': '={{ $request.qs["filter[phone]"] }}',
                    'filter[email]': '={{ $request.qs["filter[email]"] }}',
                  },
                },
              },
            },
          },
          send: { paginate: true },
          output: {
            postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
          },
        },
      },
      {
        name: 'Add Leads to List',
        value: 'addLeads',
        action: 'Add leads to list',
        description: 'Add one or more leads to a specific list',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listId}}/leads/attach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                const idsRaw = this.getNodeParameter('leadIds', 0);
                const idsString = (typeof idsRaw === 'string' ? idsRaw : String(idsRaw)).trim();
                const arr = idsString
                  .split(',')
                  .map((i) => parseInt(i.trim(), 10))
                  .filter((n) => Number.isFinite(n) && n > 0);

                if (!arr.length) {
                  throw new Error('Invalid or empty ID. Provide at least one valid lead ID.');
                }

                if ([200, 204].includes(response.statusCode)) {
                  return [{ json: { success: true, message: 'Lead(s) added successfully!' } }];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to add lead(s)'}`
                );
              },
            ],
          },
        },
      },

      {
        name: 'Remove Leads From List',
        value: 'removeLeads',
        action: 'Remove leads from list',
        description: 'Remove one or more leads from a specific list',
        routing: {
          request: {
            method: 'POST',
            url: '=/lists/{{$parameter.listId}}/leads/detach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if ([200, 204].includes(response.statusCode)) {
                  return [{ json: { success: true, message: 'Lead(s) removed successfully!' } }];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to remove lead(s)'}`
                );
              },
            ],
          },
        },
      },
    ],
    default: 'createList',
  },
];
