import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import config from './app/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(config.PORT);
}
bootstrap();
