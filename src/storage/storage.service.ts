import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { IBlobFile } from 'src/interface';

const conn = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly client = BlobServiceClient.fromConnectionString(conn);
  // private readonly container = this.client.getContainerClient(containerName);

  createBlobName(mimetype: string) {
    return `quest-${Date.now()}.${mimetype.split('/')[1]}`;
  }

  async createBlobFile(file: IBlobFile) {
    const container = this.client.getContainerClient(containerName);
    const blobName = this.createBlobName(file.mimetype);
    const blobClient = container.getBlockBlobClient(blobName);
    const blob = await blobClient.upload(file.buffer, file.size);
    return blobClient.url
  }
}

// import { Injectable, Logger } from '@nestjs/common';

// // Ленивая загрузка Azure SDK, чтобы не падать без него
// let BlobServiceClient: any;
// try {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   BlobServiceClient = require('@azure/storage-blob').BlobServiceClient;
// } catch { }

// import { promises as fs } from 'fs';
// import { join } from 'path';

// type SaveResult = { url: string; key: string };

// @Injectable()
// export class StorageService {
//   private readonly logger = new Logger(StorageService.name);
//   private driver: 'azure' | 'local' =
//     ((process.env.STORAGE_DRIVER ?? 'local').toLowerCase() as any) === 'azure'
//       ? 'azure'
//       : 'local';

//   private client?: any;
//   private containerName = process.env.AZURE_STORAGE_CONTAINER ?? 'uploads';
//   private uploadDir = join(process.cwd(), 'uploads');
//   private baseUrl = process.env.APP_BASE_URL ?? '';

//   constructor() {
//     if (this.driver === 'azure') {
//       const conn = process.env.AZURE_STORAGE_CONNECTION_STRING?.trim();
//       if (!conn || !BlobServiceClient) {
//         this.logger.warn(
//           '[Storage] Azure отключён (нет AZURE_STORAGE_CONNECTION_STRING или пакета). Переход на local.',
//         );
//         this.driver = 'local';
//       } else {
//         try {
//           this.client = BlobServiceClient.fromConnectionString(conn);
//         } catch (e) {
//           this.logger.warn(
//             `[Storage] Ошибка инициализации Azure: ${(e as Error).message}. Переход на local.`,
//           );
//           this.driver = 'local';
//         }
//       }
//     }

//     fs.mkdir(this.uploadDir, { recursive: true }).catch(() => void 0);
//   }

//   getContainer(): any {
//     if (this.driver === 'azure' && this.client) {
//       return this.client.getContainerClient(this.containerName);
//     }
//     // локальный режим — возвращаем заглушку
//     return { name: this.containerName, driver: 'local' };
//   }

//   getContainerName(): string {
//     return this.containerName;
//   }

//   async ensureContainerExists(): Promise<void> {
//     if (this.driver === 'azure' && this.client) {
//       const container = this.client.getContainerClient(this.containerName);
//       await container.createIfNotExists();
//       return;
//     }

//     await fs.mkdir(this.uploadDir, { recursive: true });
//   }

//   async save(buffer: Buffer, filename: string, contentType?: string): Promise<SaveResult> {
//     if (this.driver === 'azure' && this.client) {
//       const container = this.client.getContainerClient(this.containerName);
//       await container.createIfNotExists();
//       const key = this.safeKey(filename);
//       const blob = container.getBlockBlobClient(key);
//       await blob.uploadData(buffer, {
//         blobHTTPHeaders: contentType ? { blobContentType: contentType } : undefined,
//       });
//       return { url: blob.url, key };
//     }

//     // local
//     const key = this.timestampedKey(filename);
//     const filePath = join(this.uploadDir, key);
//     await fs.writeFile(filePath, buffer);
//     const url = this.baseUrl ? `${this.baseUrl}/uploads/${key}` : `/uploads/${key}`;
//     return { url, key };
//   }

//   async remove(key: string): Promise<void> {
//     if (!key) return;

//     if (this.driver === 'azure' && this.client) {
//       const container = this.client.getContainerClient(this.containerName);
//       const blob = container.getBlockBlobClient(key);
//       await blob.deleteIfExists();
//       return;
//     }

//     // local
//     const filePath = join(this.uploadDir, key);
//     try {
//       await fs.unlink(filePath);
//     } catch {
//       /* ignore */
//     }
//   }

//   // Если где-то нужен stream — локальный вариант:
//   getLocalPath(key: string) {
//     return join(this.uploadDir, key);
//   }

//   private safeKey(name: string) {
//     return name.replace(/[^\w.\-]+/g, '_');
//   }
//   private timestampedKey(name: string) {
//     const safe = this.safeKey(name);
//     const ts = Date.now();
//     return `${ts}-${safe}`;
//   }
// }
