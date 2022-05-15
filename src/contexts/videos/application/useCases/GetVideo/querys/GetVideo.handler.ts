import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import MongoVideoEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/VideoEntityRepository';
import { GetVideoResponse } from '../responses/GetVideo.response';
import GetVideoQuery from './GetVideo.query';

@QueryHandler(GetVideoQuery)
class GetVideoHandler implements IQueryHandler<GetVideoQuery> {
  constructor(private readonly videoRepository: MongoVideoEntityRepository) {}
  async execute({ getVideoRequest }: GetVideoQuery): Promise<GetVideoResponse> {
    const video = await this.videoRepository.getOne(getVideoRequest.id);
    return video;
  }
}

export default GetVideoHandler;
