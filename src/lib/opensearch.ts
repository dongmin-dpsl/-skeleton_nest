import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { ErrorMessage } from '../helper/message/error.message';
import { winstonLogger } from './winston';

@Injectable()
export class OpenSearch {
  private readonly client: Client;

  constructor() {
    const node1Url = process.env.OPENSEARCH_NODE1;
    const caCertsPath = process.env.OPENSEARCH_CA_CERT_PATH;

    this.client = new Client({
      //   node: protocol + '://' + auth + '@' + host + ':' + port,
      node: [node1Url],
      ssl: { ca: readFileSync(caCertsPath) },
    });
  }

  async index({ index, body }): Promise<Record<string, any>> {
    return (await this.client.index({ index, body, refresh: true })).body;
  }

  async search({ index, body }): Promise<Record<string, any>> {
    const esRes = await this.client.search({ index, body });
    return esRes.body;
  }

  async update({ index, id, body, refresh }) {
    try {
      return await this.client.update({ index, id, body, refresh });
    } catch (err) {
      if (err.statusCode === 404) {
        winstonLogger.warn(err.stack);
        throw new NotFoundException();
      }
      winstonLogger.error(err.stack);
      throw new InternalServerErrorException(ErrorMessage.SERVER_ERROR);
    }
  }

  async deleteByQuery({ index, body, refresh }) {
    return this.client.delete_by_query({ index, body, refresh });
  }
}
