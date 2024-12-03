import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // Remove propriedades não permitidas
      forbidNonWhitelisted: false, // Lança um erro se propriedades não permitidas forem enviadas
      transform: true, // Transforma os objetos de entrada em instâncias de classe
    }),
  );
  await app.listen(4000);
}
bootstrap();
