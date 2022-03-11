import { Module } from '@nestjs/common';
import VideoModule from '../../contexts/videos/infrastructure/modules/Videos.module';
import DatabaseModule from '../database/mongo/mongo.module';
import MulterConfigModule from './multer.module';

@Module({
  imports: [DatabaseModule, MulterConfigModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
