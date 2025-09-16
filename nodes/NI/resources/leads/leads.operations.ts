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
  name: 'Create/Edit',
  value: 'create_edit_lead',
  action: 'Create or edit lead',
  description: 'Create or edit a lead',
  routing: {
    send: {
      preSend: [
        async function (this: any, requestOptions) {
      const mode = (this.getNodeParameter('operationMode', 0) as string) ?? 'create';
      const leadId = (this.getNodeParameter('id', 0) as string) ?? '';
	    const phone = (this.getNodeParameter('phone', 0) as string) ?? '';


          const body: any = {
            name: this.getNodeParameter('name', 0) as string,
            phone,
            email: this.getNodeParameter('email', 0) as string,
            notes: this.getNodeParameter('notes', 0) as string,
          };


          const tagsParam = this.getNodeParameter('addtags', 0, undefined) as any;
          if (tagsParam?.optiontags && Array.isArray(tagsParam.optiontags)) {
            const tags = tagsParam.optiontags.map((tag: any) => tag.tags1).filter(Boolean);
            if (tags.length > 0) body.tags = tags;
          }

          const customVarsParam = this.getNodeParameter('customVariables', 0, undefined) as any;
          if (customVarsParam?.variable && Array.isArray(customVarsParam.variable)) {
            const customVars = customVarsParam.variable.map((v: any) => ({
              slug: v.slug,
              value: v.value,
            }));
            if (customVars.length > 0) body.custom_variables = customVars;
          }


          if (mode === 'update') {
            requestOptions.method = 'PUT';
            requestOptions.url = `/leads/${leadId}`;
          } else if (mode === 'create'){
            requestOptions.method = 'POST';
            requestOptions.url = '/leads';

          }
					else if (mode === 'create_edit'){
						const existingLead = await this.helpers.httpRequestWithAuthentication!.call(this, 'niApi', {
            method: 'GET',
            baseURL: 'https://api.notificacoesinteligentes.com',
            url: '/leads',
            qs: { 'filter[phone]': phone },
               });

						if (existingLead?.data?.length > 0) {

              requestOptions.method = 'PUT';
              requestOptions.url = `/leads/${existingLead.data[0].id}`;
            } else {

              requestOptions.method = 'POST';
              requestOptions.url = '/leads';
            }

					}
          requestOptions.body = body;

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
      const msg = created ? 'Lead created successfully.' : 'Lead updated successfully.';

      // Se houver itens, coloca message/success no topo preservando o restante
      if (Array.isArray(items) && items.length) {
        return items.map((i: any) => ({
          ...i,
          json: {
            message: msg,
            success,
            ...i.json, // resto vem depois
          },
          ...(i.binary ? { binary: i.binary } : {}),
        }));
      }

      // Sem body (ex.: 204) → cria item com message/success no topo
      return [
        {
          json: {
            message: msg,
            success,
          },
        },
      ];
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

      // {
      //   name: 'Create/Edit Lead',
      //   value: 'manage_lead',
      //   action: 'Create or edit lead',
      //   description: 'Create a new lead or edit an existing one',
      //   routing: {
      //     send: {
      //       preSend: [
      //         async function (this, requestOptions) {
      //           const id = this.getNodeParameter('id', 0) as string;
      //           const isUpdate = id && id.trim() !== '';

      //           if (isUpdate) {
      //             // UPDATE mode - edit existing lead
      //             requestOptions.method = 'PUT';
      //             requestOptions.url = `/leads/${this.getNodeParameter('id')}`;

      //             // For update, send all fields or only changed ones as desired
      //             requestOptions.body = {
      //               name: this.getNodeParameter('name', 0) as string,
      //               phone: this.getNodeParameter('phone', 0) as string,
      //               email: this.getNodeParameter('email', 0) as string,
      //               notes: this.getNodeParameter('notes', 0) as string,
      //             };

      //             // Add tags if provided
      //             const tagsParam = this.getNodeParameter('addtags', 0) as any;
      //             if (tagsParam && tagsParam.optiontags && Array.isArray(tagsParam.optiontags)) {
      //               const tags = tagsParam.optiontags.map((tag: any) => tag.tags1).filter(Boolean);
      //               if (tags.length > 0) {
      //                 requestOptions.body.tags = tags;
      //               }
      //             }

      //             // Add custom variables if provided
      //             const customVarsParam = this.getNodeParameter('customVariables', 0) as any;
      //             if (customVarsParam && customVarsParam.variable && Array.isArray(customVarsParam.variable)) {
      //               const customVars = customVarsParam.variable.map((v: any) => ({
      //                 slug: v.slug,
      //                 value: v.value
      //               }));
      //               if (customVars.length > 0) {
      //                 requestOptions.body.custom_variables_to_add_or_update = customVars;
      //               }
      //             }

      //           } else {
      //             // CREATE mode - create new lead
      //             requestOptions.method = 'POST';
      //             requestOptions.url = '/leads';

      //             requestOptions.body = {
      //               name: this.getNodeParameter('name', 0) as string,
      //               phone: this.getNodeParameter('phone', 0) as string,
      //               email: this.getNodeParameter('email', 0) as string,
      //               notes: this.getNodeParameter('notes', 0) as string,
      //             };

      //             // Add tags
      //             const tagsParam = this.getNodeParameter('addtags', 0) as any;
      //             if (tagsParam && tagsParam.optiontags && Array.isArray(tagsParam.optiontags)) {
      //               const tags = tagsParam.optiontags.map((tag: any) => tag.tags1).filter(Boolean);
      //               requestOptions.body.tags = tags;
      //             }

      //             // Add custom variables
      //             const customVarsParam = this.getNodeParameter('customVariables', 0) as any;
      //             if (customVarsParam && customVarsParam.variable && Array.isArray(customVarsParam.variable)) {
      //               const customVars = customVarsParam.variable.map((v: any) => ({
      //                 slug: v.slug,
      //                 value: v.value
      //               }));
      //               requestOptions.body.custom_variables = customVars;
      //             }
      //           }

      //           return requestOptions;
      //         }
      //       ]
      //     },
      //     output: {
      //       postReceive: [
      //         async function (this, items, response) {
      //           const id = this.getNodeParameter('id', 0) as string;
      //           const isUpdate = id && id.trim() !== '';
      //           const isCreate = !isUpdate;

      //           // Check if the operation succeeded
      //           const isSuccess = isCreate
      //             ? response.statusCode === 201
      //             : (response.statusCode === 200 || response.statusCode === 204);

      //           if (isSuccess) {
      //             return [
      //               {
      //                 json: {
      //                   success: true,
      //                   message: isCreate
      //                     ? 'Lead created successfully.'
      //                     : 'Lead updated successfully.',
      //                   data: response.body,
      //                   operation: isCreate ? 'create' : 'update',
      //                 },
      //               },
      //             ];
      //           }

      //           // Error case
      //           return [
      //             {
      //               json: {
      //                 success: false,
      //                 message: isCreate
      //                   ? `Unable to create lead: ${response.body?.message || 'Unknown error'}`
      //                   : `Unable to update lead: ${response.body?.message || 'Unknown error'}`,
      //                 errorCode: response.statusCode,
      //                 errorData: response.body,
      //                 operation: isCreate ? 'create' : 'update',
      //               },
      //             },
      //           ];
      //         },
      //       ],
      //     },
      //   },
      // },

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
    ],
    default: 'create_edit_lead',
  },
];
