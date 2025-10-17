import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class niApi implements ICredentialType {
  name = 'niApi';
  displayName = 'NI API';
  documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';

extends = ['httpHeaderAuth'];




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
      description: 'Token de autenticação da API no formato Bearer',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Authorization': '= Bearer {{$credentials.bearerToken}}',
				'Accept': 'application/json'
      }
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
