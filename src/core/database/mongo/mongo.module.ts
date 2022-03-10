import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './mongo.config';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://${config.HOST}/${config.NAME}`)],
})
class DatabaseModule {}

export default DatabaseModule;
