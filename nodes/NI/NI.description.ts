/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type { INodeTypeDescription } from 'n8n-workflow';
import {leadsOperations} from './resources/leads/leads.operations';
import {leadsFields} from './resources/leads/leads.fields';
import {integrationsOperations} from './resources/Integrations/integrations.operations';
import {integrationsFields} from './resources/Integrations/integrations.fields';
import {NodeConnectionType} from 'n8n-workflow';





export function getNodeDescription(): INodeTypeDescription {
  return {
    displayName: 'Notificações Inteligentes',
    name: 'NI',

    // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
    icon: 'file:Nifoto.svg',
    group: ['action'],
    version: 1,
				subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: 'NI Integration',
    defaults: {
      name: 'NI Node',
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'niApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.notificacoesinteligentes.com',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    usableAsTool: true,
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
				placeholder:'Choose',
        noDataExpression: true,
        options: [
          {name: 'Event', value: 'events'},
					{name: 'Integration', value: 'integration'},
					{name: 'Lead', value: 'leads'},
        ],
        default: 'integration',
      },
			...leadsOperations,
      ...leadsFields,
			...integrationsOperations,
			...integrationsFields,
			
    ],
  };
}
