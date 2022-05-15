import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import MongoVideoEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/VideoEntityRepository';
import { GetAllVideosFromCourseResponse } from '../responses/getAllVideosFromCourse.response';
import GetAllVideosFromCourseQuery from './GetAllVideosFromCourse.query';

@QueryHandler(GetAllVideosFromCourseQuery)
class GetAllVideosFromCourseHandler
  implements IQueryHandler<GetAllVideosFromCourseQuery>
{
  constructor(private readonly videoRepository: MongoVideoEntityRepository) {}
  async execute({
    getAllVideosFromCourseRequest,
  }: GetAllVideosFromCourseQuery): Promise<GetAllVideosFromCourseResponse> {
    const videosFromCourse = await this.videoRepository.getAllFromCourse(
      getAllVideosFromCourseRequest.course
    );
    return videosFromCourse;
  }
}

export default GetAllVideosFromCourseHandler;
