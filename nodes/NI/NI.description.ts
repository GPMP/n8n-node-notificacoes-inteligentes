/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type { INodeTypeDescription } from 'n8n-workflow';
import {leadsOperations} from './resources/leads/leads.operations';
import {leadsFields} from './resources/leads/leads.fields';
import {integrationsOperations} from './resources/Integrations/integrations.operations';
import {integrationsFields} from './resources/Integrations/integrations.fields';
import {NodeConnectionType} from 'n8n-workflow';
import {variablegroupsoperations} from './resources/leads/variablegroups.operations';
import {variablegroupsfields} from './resources/leads/variablegroups.fields';
import {customvariableoperations} from './resources/leads/customvariable.operations';
import {customvariablefields} from './resources/leads/customvariable.fields';
import {listsOperations} from './resources/leads/lists.operations';
import {listsFields} from './resources/leads/lists.fields';
import {eventsOperations} from './resources/events/events.operations';
import {eventsFields} from './resources/events/events.fields';




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
					{name: 'Custom Variable', value: 'customvariables'},
				  {name: 'Custom Variable Group', value: 'variablegroups'},
          {name: 'Event', value: 'events'},
					{name: 'Integration', value: 'integration'},
					{name: 'Lead', value: 'leads'},
					{name: 'Lead List', value: 'leadslist'},


        ],
        default: 'integration',


      },
			...listsOperations,
			...listsFields,
			...leadsOperations,
      ...leadsFields,
			...integrationsOperations,
			...integrationsFields,
      ...customvariableoperations,
			...customvariablefields,
			...variablegroupsoperations,
			...variablegroupsfields,
			...eventsOperations,
			...eventsFields,
    ],
  };
}
