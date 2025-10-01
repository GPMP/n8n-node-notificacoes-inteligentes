import type {
  INodeType,
  ILoadOptionsFunctions,
  INodePropertyOptions
} from 'n8n-workflow';
import { getNodeDescription } from './NI.description';

export class NI implements INodeType {
  description = getNodeDescription();

  methods = {
    loadOptions: {
     async getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  try {
    const all: Array<{ id: string | number; label?: string; name?: string }> = [];
    let page = 1;

    // Paginação genérica para buscar todas as tags
    while (true) {
      const res = await this.helpers.httpRequestWithAuthentication!.call(
        this,
        'niApi', // Credencial configurada no n8n
        {
          method: 'GET',
          baseURL: 'https://api.notificacoesinteligentes.com',
          url: '/tags',
          qs: { page, per_page: 200 }, // Paginação para buscar 200 tags por vez
          timeout: 5000,
        }
      );

      // Verificar a resposta e pegar o array de tags
      const chunk: any[] = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.items)
            ? res.items
            : [];

      all.push(...chunk);

      // Verifica se há mais páginas para carregar (com base no campo `next` na resposta)
      if (!res?.links?.next) break;  // Se não houver "next", para de buscar
      page++;  // Se houver "next", aumente a página para pegar mais resultados
    }

    // Mapeia as tags para o formato esperado no multiOptions
    return all
      .filter(t => t && (t.id != null) && (t.label || t.name)) // Verifica se os dados são válidos
      .map(t => ({
        name: String(t.label ?? t.name), // O que aparece na interface
        value: String(t.label),             // Usamos o ID como valor
      }));

  } catch (error) {
    // Caso haja erro, logue para depuração
    this.logger?.debug?.('getTags loadOptions error', { error });
    return [];
  }
}
    },
  };
}
