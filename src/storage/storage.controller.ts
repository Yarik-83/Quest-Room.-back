// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { StorageService } from './storage.service';
// import { CreateStorageDto } from './dto/create-storage.dto';
// import { UpdateStorageDto } from './dto/update-storage.dto';

// @Controller('storage')
// export class StorageController {
//   constructor(private readonly storageService: StorageService) {}

//   @Get('health')
//   async health() {
//     const startedAt = new Date().toISOString();
//     const container = this.storageService.getContainer();
//     const containerName = this.storageService.getContainerName();


//     await this.storageService.ensureContainerExists();
//     const exists = await container.exists();


//     const name = `health/ping-${Date.now()}.txt`;
//     const content = Buffer.from(`health ${startedAt}`);
//     const blockBlob = container.getBlockBlobClient(name);
//     await blockBlob.uploadData(content, {
//       blobHTTPHeaders: { blobContentType: 'text/plain' },
//       metadata: { scope: 'healthcheck' },
//     });


//     const props = await blockBlob.getProperties();


//     await blockBlob.delete();

//     return {
//       ok: true,
//       container: containerName,
//       containerExists: exists,
//       testBlob: {
//         name,
//         contentType: props.contentType,
//         etag: props.etag,
//         lastModified: props.lastModified,
//         serverEncrypted: props.isServerEncrypted,
//       },
//       time: startedAt,
//     };
//   }
// }
