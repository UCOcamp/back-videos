import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import BaseMongoEntityRepository from '../../../../../shared/data/BaseMongoEntityRepository';
import Video from '../../../../domain/entities/video';
import VideoEntityRepository from '../../../../domain/repositories/VideoEntityRepository';
import VideoSchema from '../schemas/Video.schema';
import VideoSchemaFactory from '../schemas/Video.schemaFactory';

@Injectable()
class MongoVideoEntityRepository
  extends BaseMongoEntityRepository<VideoSchema, Video>
  implements VideoEntityRepository
{
  constructor(
    @InjectModel(VideoSchema.name)
    videoModel: Model<VideoSchema>,
    videoSchemaFactory: VideoSchemaFactory
  ) {
    super(videoModel, videoSchemaFactory);
  }
  async getOne(id: string): Promise<Video> {
    const videos = await this.find({ id: id });
    if (videos.length > 1)
      throw new InternalServerErrorException('Duplicated IDs');
    if (videos.length === 0) throw new NotFoundException('Video Not Found!');
    return videos[0];
  }
  async getAll(): Promise<Video[]> {
    return await this.findAll();
  }
  async getAllFromCourse(course: string): Promise<Video[]> {
    return await this.find({ course: course });
  }
  async saveOne(video: Video): Promise<void> {
    await this.create(video);
  }
  updateOne(video: Video): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default MongoVideoEntityRepository;
