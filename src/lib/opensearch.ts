import { Injectable } from '@nestjs/common';
import { ApiResponse, Client } from '@opensearch-project/opensearch';
import { readFileSync } from 'node:fs';

@Injectable()
export class OpenSearch {
  private client: Client;

  constructor() {
    const node1Url = process.env.OPENSEARCH_NODE1;
    const caCertsPath = process.env.OPENSEARCH_CA_CERT_PATH;

    this.client = new Client({
      //   node: protocol + '://' + auth + '@' + host + ':' + port,
      node: [node1Url],
      ssl: { ca: readFileSync(caCertsPath) },
    });
  }

  async index({
    index,
    body,
  }): Promise<ApiResponse<Record<string, any>, unknown>> {
    return this.client.index({ index, body });
  }

  async search({
    index,
    body,
  }): Promise<ApiResponse<Record<string, any>, unknown>> {
    return this.client.search({ index, body });
  }

  async update({ index, id, body, refresh }) {
    return this.client.update({ index, id, body, refresh });
  }
  async delete_by_query({ index, body, refresh }) {
    return this.client.delete_by_query({ index, body, refresh });
  }
}
