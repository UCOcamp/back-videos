import { Module } from '@nestjs/common';
import VideoModule from '../../contexts/videos/infrastructure/modules/Videos.module';
import DatabaseModule from '../database/mongo/mongo.module';
import MulterConfigModule from './multer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    MulterConfigModule,
    VideoModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '/files'),
      serveRoot: '/files',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
