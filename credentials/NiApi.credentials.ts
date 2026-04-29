import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
	Icon,
} from 'n8n-workflow';

export class NiApi implements ICredentialType {
	name = 'niApi';
	displayName = 'NI API';
	icon = 'file:../nodes/NI/Nifoto.svg' as Icon;
	documentationUrl = 'https://docs.notificacoesinteligentes.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'Bearer Token',
			name: 'bearerToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API authentication token in Bearer format',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.bearerToken}}',
				Accept: 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: '=/me',
			baseURL: 'https://api.notificacoesinteligentes.com',
		},
	};
}
