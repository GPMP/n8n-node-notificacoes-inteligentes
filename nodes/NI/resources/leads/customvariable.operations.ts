import type { INodeProperties } from 'n8n-workflow';

export const customvariableoperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['customvariables'],
      },
    },
    options: [
      {
        name: 'Create Custom Variable',
        value: 'createcustomvariable',
        action: 'Create variable',
        description: 'Creates a new custom variable in the system',
        routing: {
          request: {
            method: 'POST',
            url: '/organizations/custom-variables',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Custom variable created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Failed to create the variable'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Get All Custom Variables',
        value: 'getcustomvariables',
        action: 'Get variables',
        description: 'Fetches and returns all available custom variables',
        routing: {
          request: {
            method: 'GET',
            url: '/organizations/custom-variables',
          },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{!!$response.body?.links?.next}}',
                request: {
                  qs: {
                    include: '={{$request.qs.include}}',
                    'filter[slug]': '={{$request.qs["filter[slug]"]}}',
                    'filter[type]': '={{$request.qs["filter[type]"]}}',
                    'filter[variable_group_name]': '={{$request.qs["filter[variable_group_name]"]}}',
                    page: '={{Number($response.body?.meta?.current_page || 0) + 1 }}',
                    per_page: '={{ $request.qs.per_page }}',
                  },
                },
              },
            },
          },
        },
      },
      {
        name: 'Get Custom Variable By ID',
        value: 'getvariable',
        action: 'Get variable',
        description: 'Fetches and returns a specific custom variable by its ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/organizations/custom-variables/{{$parameter.customVariableId}}',
          },
        },
      },
      {
        name: 'Edit Custom Variable',
        value: 'updatecustomvariable',
        action: 'Update variable',
        description: 'Updates the properties of an existing custom variable',
        routing: {
          request: {
            method: 'PUT',
            url: '=/organizations/custom-variables/{{$parameter.customVariableId}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Custom variable updated successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Failed to update the variable'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Delete Custom Variable',
        value: 'deletecustomvariable',
        action: 'Delete variable',
        description: 'Permanently deletes a custom variable from the system',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/organizations/custom-variables/{{$parameter.customVariableId}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Custom variable deleted successfully!',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Failed to delete the variable'}`
                );
              },
            ],
          },
        },
      },
    ],
    default: 'createcustomvariable',
  },
];
