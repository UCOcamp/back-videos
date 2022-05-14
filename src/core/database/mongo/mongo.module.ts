import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './mongo.config';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${config.USER}:${config.PASSWORD}@${config.HOST}/${config.NAME}?retryWrites=true&w=majority`
    ),
  ],
})
class DatabaseModule {}

export default DatabaseModule;
