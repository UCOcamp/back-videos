import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import GetAllVideosQuery from '../../application/useCases/GetAllVideos/querys/GetAllVideos.query';
import GetAllVideosRequest from '../../application/useCases/GetAllVideos/requests/GetAllVideos.request';
import {
  GetAllVideosResponse,
  GetAllVideosResponseJSON,
} from '../../application/useCases/GetAllVideos/responses/getAllVideos.response';
import GetAllVideosFromCourseQuery from '../../application/useCases/GetAllVideosFromCourse/querys/GetAllVideosFromCourse.query';
import GetAllVideosFromCourseRequest from '../../application/useCases/GetAllVideosFromCourse/requests/GetAllVideosFromCourse.request';
import { GetAllVideosFromCourseResponse } from '../../application/useCases/GetAllVideosFromCourse/responses/getAllVideosFromCourse.response';

@Controller('videos')
class GetAllVideosController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getAllVideos(): Promise<GetAllVideosResponseJSON> {
    const videos = await this.queryBus.execute<
      GetAllVideosQuery,
      GetAllVideosResponse
    >(new GetAllVideosQuery(new GetAllVideosRequest()));
    return videos.map((video) => video.json);
  }
  @Get(':course')
  async getAllVideosFromCourse(
    @Param('course') course: string
  ): Promise<GetAllVideosResponseJSON> {
    const videos = await this.queryBus.execute<
      GetAllVideosFromCourseQuery,
      GetAllVideosFromCourseResponse
    >(
      new GetAllVideosFromCourseQuery(new GetAllVideosFromCourseRequest(course))
    );
    return videos.map((video) => video.json);
  }
}

export default GetAllVideosController;
