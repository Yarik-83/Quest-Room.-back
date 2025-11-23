import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { IBlobFile } from './interface';

const conn = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly client = BlobServiceClient.fromConnectionString(conn);

  createBlobName(mimetype: string) {
    return `quest-${Date.now()}.${mimetype.split('/')[1]}`;
  }

  getBlobNameWithUrl(url: string) {
    return url.split('/').at(-1);
  }

  async deleteBlobFile(url: string) {
    const blobName = this.getBlobNameWithUrl(url);
    const container = this.client.getContainerClient(containerName);

    if (blobName) {
      const blob = container.getBlobClient(blobName);
      return await blob.delete();
    }
    this.logger.error('Filed get file name!');
  }

  async createBlobFile(file: IBlobFile) {
    const container = this.client.getContainerClient(containerName);
    const blobName = this.createBlobName(file.mimetype);
    const blobClient = container.getBlockBlobClient(blobName);
    await blobClient.upload(file.buffer, file.size);
    return blobClient.url;
  }

  async updateBlobFile(oldUrl: string, file: IBlobFile) {
    const wantedFileName = this.getBlobNameWithUrl(oldUrl);
    const container = this.client.getContainerClient(containerName);

    for await (const blob of container.listBlobsFlat()) {
      if (blob.name === wantedFileName) {
        await this.deleteBlobFile(wantedFileName);
      }
    }
    return await this.createBlobFile(file);
  }
}