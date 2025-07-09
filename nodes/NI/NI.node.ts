import type { INodeType } from 'n8n-workflow';
import { getNodeDescription } from './NI.description';

export class NI implements INodeType {
  description = getNodeDescription();
}
