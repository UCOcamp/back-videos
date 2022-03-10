import { Module } from '@nestjs/common';
import DatabaseModule from '../database/mongo/mongo.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
