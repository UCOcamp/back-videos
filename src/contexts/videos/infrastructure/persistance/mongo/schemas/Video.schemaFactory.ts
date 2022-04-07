import { Injectable } from '@nestjs/common';
import EntitySchemaFactory from '../../../../../shared/data/EntitySchemaFactory';
import Video from '../../../../domain/entities/video';
import VideoSchema from './Video.schema';

@Injectable()
class VideoSchemaFactory implements EntitySchemaFactory<VideoSchema, Video> {
  createSchemaFromEntity(entity: Video): VideoSchema {
    return entity.json;
  }
  createEntityFromSchema(entitySchema: VideoSchema): Video {
    return new Video(
      entitySchema.id,
      entitySchema.title,
      entitySchema.url,
      entitySchema.thumbnailUrl
    );
  }
}

export default VideoSchemaFactory;
