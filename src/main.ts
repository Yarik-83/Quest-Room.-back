import * as dotenv from 'dotenv';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth-guard';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
   app.useGlobalGuards(new AuthGuard(reflector));
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
