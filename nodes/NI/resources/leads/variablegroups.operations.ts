import type { INodeProperties } from 'n8n-workflow';

export const variablegroupsoperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['variablegroups'],
      },
    },
    options: [
      {
        name: 'Create Group',
        value: 'createlist',
        action: 'Create group',
        description: 'Create a new group for custom variables',
        routing: {
          request: {
            method: 'POST',
            url: '/variable-groups',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Variable group created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create variable group'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Get All Groups',
        value: 'getlists',
        action: 'Get groups',
        description: 'Retrieve all active variable groups in the system',
        routing: {
          request: {
            method: 'GET',
            url: '/variable-groups',
          },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{!!$response.body?.links?.next}}',
                request: {
                  qs: {
                    include: '={{ $request.qs.include }}',
                    'filter[name]': '={{ $request.qs["filter[name]"] }}',
                    page: '={{Number($response.body?.meta?.current_page || 0) + 1 }}',
                  },
                },
              },
            },
          },
          send: { paginate: true },
          output: {
            postReceive: [
              { type: 'rootProperty', properties: { property: 'data' } }, // concatenate all pages
            ],
          },
        },
      },
      {
        name: 'Get Group by ID',
        value: 'getgroup',
        action: 'Get group',
        description: 'Retrieve a specific variable group by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/variable-groups/{{$parameter.groupid}}',
          },
        },
      },
      {
        name: 'Update Group Name',
        value: 'updategroup',
        action: 'Edit group',
        description: 'Change the name of an existing variable group',
        routing: {
          request: {
            method: 'PUT',
            url: '=/variable-groups/{{$parameter.groupid}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Variable group updated successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to update variable group'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Delete Group',
        value: 'deletegroup',
        action: 'Delete group',
        description: 'Permanently delete a variable group from the system',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/variable-groups/{{$parameter.groupid}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Variable group deleted successfully!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to delete variable group'}`
                );
              },
            ],
          },
        },
      },
    ],
    default: 'createlist',
  },
];
