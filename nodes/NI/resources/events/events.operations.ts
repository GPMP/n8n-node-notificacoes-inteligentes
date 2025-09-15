import type { INodeProperties } from 'n8n-workflow';

export const eventsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['events'],
      },
    },
    options: [
      {
         name: 'Access Granted',
        value: 'accessevent',
        action: 'Create access granted event',
        description: 'Create an event indicating access was created for a member',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/access-created',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if ([200, 201, 204].includes(response.statusCode)) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
         name: 'Waiting Payment',
        value: 'orderwaitingcharge',
        action: 'Create order waiting payment event',
        description: 'Create an event indicating an order is awaiting payment',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/waiting-payment',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
         name: 'Billet Printed',
        value: 'createnewticket',
        action: 'Create a billet printed event',
        description: 'Create an event indicating a billet was printed in the integration',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/billet-printed',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Abandoned Cart',
        value: 'createnewevent',
        action: 'Create abandoned cart event',
        description: 'Create an event indicating a shopping cart was abandoned in the integration',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/abandoned-cart',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'NPS Score',
        value: 'eventclientscore',
        action: 'Create NPS score event',
        description: 'Create an event recording the customer’s score for willingness to recommend to others',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/nps-answer',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
         name: 'Awaiting Pickup',
        value: 'orderwaiting',
        action: 'Create package awaiting pickup event',
        description: 'Create an event indicating a package is awaiting pickup',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/shipping-arrived-for-withdrawal',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Out for Delivery',
        value: 'orderout',
        action: 'Create package out for delivery event',
        description: 'Log when a package is out for delivery in the integration',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/shipping-out-for-delivery',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Order Canceled',
        value: 'canceledorder',
        action: 'Create order canceled event',
        description: 'Create an event indicating an order was canceled in the integration',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-canceled',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Order Dispatched',
        value: 'orderdispatched',
        action: 'Create order dispatched event',
        description: 'Create an event indicating an order was dispatched to the carrier',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-fulfilled',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Order Delivered',
        value: 'orderreceived',
        action: 'Create order delivered event',
        description: 'Create an event indicating an order was delivered',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-delivered',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Order Refunded',
        value: 'refundorder',
        action: 'Create order refunded event',
        description: 'Create an event indicating an order was refunded in the integration',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-refunded',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Order Paid',
        value: 'orderpaid',
        action: 'Create order paid event',
        description: 'Create an event indicating an order was paid in the integration',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-paid',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Order Processing',
        value: 'orderprocessed',
        action: 'Create order processing event',
        description: 'Indicate when an order is being processed in the integration',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/order-processing',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'NPS Survey',
        value: 'eventclientsearch',
        action: 'Create NPS survey event',
        description: 'Create an event containing the survey link',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/nps-survery',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
      {
        name: 'Progress Updated',
        value: 'orderprocessupdated',
        action: 'Create shipping progress event',
        description: 'Create an event indicating a package’s shipping progress was updated',
        routing: {
          request: {
            method: 'POST',
            url: '=/integrations/{{$parameter.id}}/events/shipping-progress',
          },
          output: {
            postReceive: [
              async function (this, items, response) {
                if (response.statusCode === 200 || response.statusCode === 204 || response.statusCode === 201) {
                  return [
                    {
                      json: {
                        success: true,
                        message: 'Event created successfully!',
                        data: response.body,
                      },
                    },
                  ];
                }
                throw new Error(
                  `Error ${response.statusCode}: ${response.body?.message || 'Unable to create event'}`
                );
              },
            ],
          },
        },
      },
			{
      name:  'Password Reset Event',
      value: 'changepasswordevent',
      action: 'Create a password reset event in the integration',
      description: 'Logs a user password reset request or completion',
      routing: {
      request: {
      method: 'POST',
      url: '=/integrations/{{$parameter.id}}/events/reset-password',
    },
  },
}

    ],
    default: 'createnewevent',
  },
];
