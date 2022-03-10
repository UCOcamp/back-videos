import { Module } from '@nestjs/common';
import DatabaseModule from '../database/mongo/mongo.module';
import MulterConfigModule from './multer.module';

@Module({
  imports: [DatabaseModule, MulterConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
