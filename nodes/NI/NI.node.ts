import type { INodeType, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { getNodeDescription } from './NI.description';

export class NI implements INodeType {
	description = getNodeDescription();

	methods = {
		loadOptions: {
			async getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const all: Array<{ id: string | number; label?: string; name?: string }> = [];
					let page = 1;

					// Generic pagination to fetch all tags
					while (true) {
						const res = await this.helpers.httpRequestWithAuthentication!.call(
							this,
							'niApi', // Credential configured in n8n
							{
								method: 'GET',
								baseURL: 'https://api.notificacoesinteligentes.com',
								url: '/tags',
								qs: { page, per_page: 200 }, // Pagination to fetch 200 tags at a time
								timeout: 5000,
							},
						);

						// Check the response and get the tags array
						const chunk: any[] = Array.isArray(res)
							? res
							: Array.isArray(res?.data)
								? res.data
								: Array.isArray(res?.items)
									? res.items
									: [];

						all.push(...chunk);

						// Check if there are more pages to load (based on the `next` field in the response)
						if (!res?.links?.next) break; // If there's no "next", stop fetching
						page++; // If there's "next", increment the page to fetch more results
					}

					// Map tags to the expected format for multiOptions
					return all
						.filter((t) => t && t.id != null && (t.label || t.name)) // Verify if the data is valid
						.map((t) => ({
							name: String(t.label ?? t.name), // What appears in the interface
							value: String(t.label), // We use the label as value
						}));
				} catch (error) {
					throw new NodeApiError(this.getNode(), error, {
						message: 'Failed to load tags',
						description: error instanceof Error ? error.message : 'Unknown error',
					});
				}
			},
		},
	};
}
