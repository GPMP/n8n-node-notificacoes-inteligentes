/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type { INodeTypeDescription } from 'n8n-workflow';
import { leadsOperations } from './resources/leads/leads.operations';
import { leadsFields } from './resources/leads/leads.fields';
import { integrationsOperations } from './resources/Integrations/integrations.operations';
import { integrationsFields } from './resources/Integrations/integrations.fields';
import { NodeConnectionType } from 'n8n-workflow';
import {accountmanagementoperations} from './resources/account-management/accountmanagement.operations';
import {accountmanagementfields} from './resources/account-management/accountmanagement.fields';
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
    icon: 'file:Nifoto.svg',
    group: [],
    version: 1,
				subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: 'Integração do NI',
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
				placeholder:'Escolha',
        noDataExpression: true,
        options: [
          {name: 'Evento', value: 'events'},
					{name: 'Gerenciamento Da Conta', value: 'accountmanagement'},
					{name: 'Grupo De Variável Customizada', value: 'variablegroups'},
					{name: 'Integração', value: 'integration'},
					{name: 'Lead', value: 'leads'},
					{name: 'Lista De Lead', value: 'leadslist'},
					{name: 'Variável Customizada', value: 'customvariables'},

        ],
        default: 'integration',


      },
			...listsOperations,
			...listsFields,
			...leadsOperations,
      ...leadsFields,
			...integrationsOperations,
			...integrationsFields,
			...accountmanagementoperations,
			...accountmanagementfields,
      ...customvariableoperations,
			...customvariablefields,
			...variablegroupsoperations,
			...variablegroupsfields,
			...eventsOperations,
			...eventsFields,
    ],
  };
}
