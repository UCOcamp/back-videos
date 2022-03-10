import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import config from './app/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS
  app.enableCors();
  
  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('UCOCamp Videos Microservice')
    .setDescription('Users microservice API.')
    .setVersion('1.0')
    .addTag('videos')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);
  
  // App listen
  await app.listen(config.PORT);
}
bootstrap();
