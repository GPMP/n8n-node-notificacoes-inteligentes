/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */
import type { INodeProperties } from 'n8n-workflow';

export const integrationsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['integration'],
      },
    },
    options:[
			{
        name: 'Create Integration',
        value: 'create_integration',
        action: 'Create Integration',
        description: 'Creates a new integration',
        routing: {
          request: {
            method: 'POST',
            url: '/integrations',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Integration created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Could not create the integration'}`
                );
              },
            ],
          },
        },
      },
			{
        name: 'Get All Integrations',
        value: 'get_all_integrations',
        action: 'Get All Integrations',
        description: 'Retrieves all integrations',
        routing: {
          request: {
            method: 'GET',
            url: '/integrations',
          },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{!!$response.body?.links?.next}}',
                request: {
                  qs: {
                    page: '={{Number($response.body?.meta?.current_page || 0) + 1 }}'
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
        name: 'Get Integration',
        value: 'get_integration',
        action: 'Get Integration',
        description: 'Retrieves an integration by its ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/integrations/{{$parameter.id}}',
          },
        },
      },
      {
        name: 'Edit Integration Name',
        value: 'edit_integration',
        action: 'Edit Integration',
        description: 'Edits the name of an existing integration',
        routing: {
          request: {
            method: 'PUT',
            url: '=/integrations/{{$parameter.id}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Integration updated successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Could not edit the integration'}`
                );
              },
            ],
          },
        },
      },
			{
        name: 'Delete Integration',
        value: 'delete_integration',
        action: 'Delete Integration',
        description: 'Deletes an existing integration',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/integrations/{{$parameter.id}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Integration deleted successfully!',
                        response: response.body
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Could not delete the integration'}`
                );
              },
            ],
          },
        },
      },
    ],
    default: 'create_integration',
  },
];
