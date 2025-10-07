/* eslint-disable n8n-nodes-base/node-param-option-name-wrong-for-get-many */
import type { INodeProperties } from 'n8n-workflow';

export const leadsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['leads'],
      },
    },
    options: [
{
  name: 'Create Lead',
  value: 'create_lead',
  action: 'Create lead',
  description: 'Create a new lead',
  routing: {
    send: {
      preSend: [
        async function (this: any, requestOptions) {
          const body: any = {
            name: this.getNodeParameter('name', 0) as string,
            phone: this.getNodeParameter('phone', 0) as string,
            email: this.getNodeParameter('email', 0) as string,
            notes: this.getNodeParameter('notes', 0) as string,
          };

          let tagsToAdd: string[] = [];
const selectableTags = this.getNodeParameter('selectable_tag', 0, []) as string[];
if (Array.isArray(selectableTags) && selectableTags.length > 0) {
  tagsToAdd = [...selectableTags];
}
          // Remover duplicatas e adicionar ao body
          if (tagsToAdd.length > 0) {
            body.tags = [...new Set(tagsToAdd)];
          }

          const customVarsParam = this.getNodeParameter('customVariables', 0, undefined) as any;
          if (customVarsParam?.variable && Array.isArray(customVarsParam.variable)) {
            const customVars = customVarsParam.variable
              .map((v: any) => ({ slug: v.slug, value: v.value }))
              .filter((v: any) => v.slug);
            if (customVars.length > 0) body.custom_variables = customVars;
          }

          const trackingParam = this.getNodeParameter('tracking_data', 0, undefined) as any;
          if (trackingParam?.trackingOptions && Array.isArray(trackingParam.trackingOptions)) {
            const tracking = trackingParam.trackingOptions.map((track: any) => track.value).filter(Boolean);
            if (tracking.length > 0) body.tracking_data = tracking;
          }

          requestOptions.body = body;
          return requestOptions;
        },
      ],
    },
    request: {
      method: 'POST',
      url: '/leads',
    },
    output: {
      postReceive: [
        async function (this, items, response) {
          if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
            return [
              {
                json: {
                  success: true,
                  message: 'Lead created successfully.',
                  response: response.body,
                },
              },
            ];
          }
          throw new Error(
            `Error ${response.statusCode}: ${response.body?.message || 'Unable to create lead'}`
          );
        },
      ],
    },
  },
},
{
  name: 'Update',
  value: 'update_lead',
  action: 'Update lead',
  description: 'Update an existing lead',
  routing: {
		request:{
			method: 'PUT',
      url: '=/leads/{{$parameter.id}}',
		},
			output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201 ) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Lead updated successfully.',
												response: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to update lead'}`
                );
              },
            ],
          },
  },
},
{
  name: 'Create or Update',
  value: 'create_update_lead',
  action: 'Create or update lead',
  description: 'Create a new lead or update existing one based on phone number',
  routing: {
    send: {
      preSend: [
        async function (this: any, requestOptions) {
          const phone = (this.getNodeParameter('phone', 0) as string) ?? '';

          if (!phone) throw new Error('Para "Create or Update", o campo "phone" é obrigatório.');

          const body: any = {
            name: this.getNodeParameter('name', 0) as string,
            phone,
            email: this.getNodeParameter('email', 0) as string,
            notes: this.getNodeParameter('notes', 0) as string,
          };

          let tagsToAdd: string[] = [];
const selectableTags = this.getNodeParameter('selectable_tag', 0, []) as string[];
if (Array.isArray(selectableTags) && selectableTags.length > 0) {
  tagsToAdd = [...selectableTags];
}

// Remover duplicatas
if (tagsToAdd.length > 0) {
  body.tags = [...new Set(tagsToAdd)];
}

          const customVarsParam = this.getNodeParameter('customVariables', 0, undefined) as any;
          if (customVarsParam?.variable && Array.isArray(customVarsParam.variable)) {
            const customVars = customVarsParam.variable
              .map((v: any) => ({ slug: v.slug, value: v.value }))
              .filter((v: any) => v.slug);
            if (customVars.length > 0) body.custom_variables = customVars;
          }

          const trackingParam = this.getNodeParameter('tracking_data', 0, undefined) as any;
          if (trackingParam?.trackingOptions && Array.isArray(trackingParam.trackingOptions)) {
            const tracking = trackingParam.trackingOptions.map((track: any) => track.value).filter(Boolean);
            if (tracking.length > 0) body.tracking_data = tracking;
          }

          const existingLead = await this.helpers
            .httpRequestWithAuthentication!.call(this, 'niApi', {
              method: 'GET',
              baseURL: 'https://api.notificacoesinteligentes.com',
              url: '/leads',
              qs: { 'filter[exact_phone]': `${phone}` },
              timeout: 5000,
            });

          if (existingLead?.data?.length > 0) {
            const leadId = existingLead.data[0].id;
            requestOptions.method = 'PUT';
            requestOptions.url = `/leads/${leadId}`;

            delete body.tags;

            // Armazena informação sobre tags para usar no postReceive
            if (tagsToAdd.length > 0) {
              await this.helpers.httpRequestWithAuthentication!.call(this, 'niApi', {
                method: 'POST',
                baseURL: 'https://api.notificacoesinteligentes.com',
                url: `/leads/${leadId}/tags`,
                body: {
                  tags: tagsToAdd
                },
                timeout: 5000,
              });

              // Armazena info sobre tags adicionadas
              (this as any).tagsAdded = tagsToAdd;
            }
          } else {
            requestOptions.method = 'POST';
            requestOptions.url = '/leads';
          }

          requestOptions.body = body;

          if (!requestOptions.url) throw new Error('URL error.');

          return requestOptions;
        },
      ],
    },
    output: {
      postReceive: [
        async function (this: any, items: any[], response: any) {
          const status = response?.statusCode ?? response?.status ?? 0;
          const method = String(response?.request?.method ?? response?.config?.method ?? '').toLowerCase();
          const created = method === 'post' || status === 201;
          const success = status >= 200 && status < 300;

          let msg = created ? 'Lead created successfully.' : 'Lead updated successfully.';

          // Adiciona informação sobre tags se foram adicionadas
          if ((this as any).tagsAdded && (this as any).tagsAdded.length > 0) {
            const tagsCount = (this as any).tagsAdded.length;
            const tagsNames = (this as any).tagsAdded.join(', ');
            msg += ` Tags added (${tagsCount}): ${tagsNames}`;
          }

          return (Array.isArray(items) && items.length)
            ? items.map((i: any) => ({
                ...i,
                json: { message: msg, success, ...i.json },
                ...(i.binary ? { binary: i.binary } : {}),
              }))
            : [{ json: { message: msg, response: response.body, success } }];
        },
      ],
    },
  },
},
      {
        name: 'Get All Leads',
        value: 'get_all_leads',
        action: 'Get all leads',
        description: 'List all existing leads in the system',
        routing: {
          request: {
            method: 'GET',
            url: '/leads',
          },
          operations: {
            pagination: {
              type: 'generic',
              properties: {
                continue: '={{!!$response.body?.links?.next}}',
                request: {
                  qs: {
                    page: '={{Number($response.body?.meta?.current_page || 0) + 1 }}',
										include: '={{ $request.qs.include }}',
                    'filter[name]': '={{ $request.qs["filter[name]"] }}',
                    'filter[phone]': '={{ $request.qs["filter[phone]"] }}',
                    'filter[email]': '={{ $request.qs["filter[email]"] }}',
										'filter[tags]': '={{ $request.qs["filter[tags]"] }}',
                  },
                },
              },
            },
          },
          send: { paginate: true },
          output: {
            postReceive: [
              { type: 'rootProperty', properties: { property: 'data' } },
            ],
          },
        },
      },
      {
        name: 'Get Lead by ID',
        value: 'get_lead',
        action: 'Get lead',
        description: 'Fetch a specific lead using its unique identifier (ID)',
        routing: {
          request: {
            method: 'GET',
            url: '=/leads/{{$parameter.id}}',
          },
        },
      },
      {
        name: 'Delete Lead',
        value: 'delete_lead',
        action: 'Delete lead',
        description: 'Permanently delete a lead from the system',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/leads/{{$parameter.id}}',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Lead deleted successfully.',

                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to delete lead'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Add Lists to Lead',
        value: 'add_list_lead',
        action: 'Add lists to lead',
        description: 'Add the provided lists to a specific lead',
        routing: {
          request: {
            method: 'POST',
            url: '=/leads/{{$parameter.id}}/lists/attach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Lists added to lead successfully.',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to add lists to lead'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Remove Lists From Lead',
        value: 'remove_list_lead',
        action: 'Remove lists from lead',
        description: 'Remove the provided lists from a specific lead',
        routing: {
          request: {
            method: 'POST',
            url: '=/leads/{{$parameter.id}}/lists/detach',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Lists removed from lead successfully.',
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to remove lists from lead'}`
                );
              },
            ],
          },
        },
      },
			{
  name: 'Add Tags to Lead',
  value: 'add_tags',
  action: 'Add tags',
  description: 'Add the respective tags to a Lead',
  routing: {
    send: {
      preSend: [
        async function (this: any, requestOptions) {
          const body: any = {};

          let allTags: string[] = [];
const selectableTags = this.getNodeParameter('selectable_tag', 0, []) as string[];
if (Array.isArray(selectableTags) && selectableTags.length > 0) {
  allTags = [...selectableTags];
}

          // Remover duplicatas e definir no body
          if (allTags.length > 0) {
            body.tags = [...new Set(allTags)];
          }

          requestOptions.body = body;
          return requestOptions;
        },
      ],
    },
    request: {
      method: 'POST',
      url: '=/leads/{{$parameter.id}}/tags',
    },
    output: {
      postReceive: [
        async function (this, items, response) {
          if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
            return [
              {
                json: {
                  success: true,
                  message: 'Tags linked successfully.',
                  response: response.body,
                },
              },
            ];
          }
          throw new Error(
            `Error ${response.statusCode}: ${response.body?.message || 'Unable to link tags'}`
          );
        },
      ],
    },
  },
},
{
  name: 'Update Tags From Lead',
  value: 'update_tags',
  action: 'Update tags',
  description: 'Update the respective tags from a Lead',
  routing: {
    send: {
      preSend: [
        async function (this: any, requestOptions) {
          const body: any = {};

          let allTags: string[] = [];
const selectableTags = this.getNodeParameter('selectable_tag', 0, []) as string[];
if (Array.isArray(selectableTags) && selectableTags.length > 0) {
  allTags = [...selectableTags];}

          // Remover duplicatas e definir no body
          if (allTags.length > 0) {
            body.tags = [...new Set(allTags)];
          }

          requestOptions.body = body;
          return requestOptions;
        },
      ],
    },
    request: {
      method: 'PUT',
      url: '=/leads/{{$parameter.id}}/tags',
    },
    output: {
      postReceive: [
        async function (this, items, response) {
          if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
            return [
              {
                json: {
                  success: true,
                  message: 'Tags updated successfully.',
                  response: response.body,
                },
              },
            ];
          }
          throw new Error(
            `Error ${response.statusCode}: ${response.body?.message || 'Unable to update tags'}`
          );
        },
      ],
    },
  },
},
{
  name: 'Remove Tags From Lead',
  value: 'remove_tags',
  action: 'Remove tags',
  description: 'Remove the respective tags from a Lead',
  routing: {
    send: {
      preSend: [
        async function (this: any, requestOptions) {
          const body: any = {};

          let allTags: string[] = [];
const selectableTags = this.getNodeParameter('selectable_tag', 0, []) as string[];
if (Array.isArray(selectableTags) && selectableTags.length > 0) {
  allTags = [...selectableTags];}

          // Remover duplicatas e definir no body
          if (allTags.length > 0) {
            body.tags = [...new Set(allTags)];
          } else {
            throw new Error('Pelo menos uma tag deve ser fornecida (usando "Tags" ou "Selectable Tags")');
          }

          requestOptions.body = body;
          return requestOptions;
        },
      ],
    },
    request: {
      method: 'DELETE',
      url: '=/leads/{{$parameter.id}}/tags',
    },
    output: {
      postReceive: [
        async function (this, items, response) {
          if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
            return [
              {
                json: {
                  success: true,
                  message: 'Tags removed successfully.',
                  response: response.body,
                },
              },
            ];
          }
          throw new Error(
            `Error ${response.statusCode}: ${response.body?.message || 'Unable to remove tags'}`
          );
        },
      ],
    },
  },
}
],
    default: 'create_lead',

  },
];
