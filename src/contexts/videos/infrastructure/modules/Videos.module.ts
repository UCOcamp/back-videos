import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import {
  VideoCommandHandlers,
  VideoEventHandlers,
} from '../../application/useCases/_index';
import VideoFactory from '../../domain/entities/VideoFactory';
import VideoControllers from '../controllers/_index';
import MongoVideoEntityRepository from '../persistance/mongo/repositories/VideoEntityRepository';
import VideoSchema from '../persistance/mongo/schemas/Video.schema';
import VideoSchemaFactory from '../persistance/mongo/schemas/Video.schemaFactory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: VideoSchema.name,
        schema: SchemaFactory.createForClass(VideoSchema),
      },
    ]),
  ],
  controllers: [...VideoControllers],
  providers: [
    VideoFactory,
    MongoVideoEntityRepository,
    VideoSchemaFactory,
    ...VideoEventHandlers,
    ...VideoCommandHandlers,
  ],
})
class VideoModule {}
export default VideoModule;
