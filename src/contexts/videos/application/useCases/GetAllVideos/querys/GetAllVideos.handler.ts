import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import GetAllVideosQuery from './GetAllVideos.query';
import MongoVideoEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/VideoEntityRepository';
import { GetAllVideosResponse } from '../responses/getAllVideos.response';

@QueryHandler(GetAllVideosQuery)
class GetAllVideosHandler implements IQueryHandler<GetAllVideosQuery> {
  constructor(private readonly videoRepository: MongoVideoEntityRepository) {}
  async execute(): Promise<GetAllVideosResponse> {
    const allVideos = this.videoRepository.getAll();
    return allVideos;
  }
}

export default GetAllVideosHandler;
