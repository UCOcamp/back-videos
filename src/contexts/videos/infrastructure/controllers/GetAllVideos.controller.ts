import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import GetAllVideosQuery from '../../application/useCases/GetAllVideos/querys/GetAllVideos.query';
import GetAllVideosRequest from '../../application/useCases/GetAllVideos/requests/GetAllVideos.request';
import {
  GetAllVideosResponse,
  GetAllVideosResponseJSON,
} from '../../application/useCases/GetAllVideos/responses/getAllVideos.response';
import GetAllVideosFromCourseQuery from '../../application/useCases/GetAllVideosFromCourse/querys/GetAllVideosFromCourse.query';
import GetAllVideosFromCourseRequest from '../../application/useCases/GetAllVideosFromCourse/requests/GetAllVideosFromCourse.request';
import { GetAllVideosFromCourseResponse } from '../../application/useCases/GetAllVideosFromCourse/responses/getAllVideosFromCourse.response';

@ApiTags('videos')
@Controller('videos')
class GetAllVideosController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({
    summary: 'Get all the videos saved',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Videos returned succesfuly',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Videos not found!',
  })
  async getAllVideos(): Promise<GetAllVideosResponseJSON> {
    const videos = await this.queryBus.execute<
      GetAllVideosQuery,
      GetAllVideosResponse
    >(new GetAllVideosQuery(new GetAllVideosRequest()));
    if (videos.length === 0) throw new NotFoundException('Videos not found!');
    return videos.map((video) => video.json);
  }
  @Get(':course')
  @ApiOperation({
    summary: 'Get all the videos from a specific course',
  })
  @ApiParam({
    description: 'Name of the course',
    type: 'string',
    name: 'course',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Videos returned succesfuly',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Course videos not found!',
  })
  async getAllVideosFromCourse(
    @Param('course') course: string
  ): Promise<GetAllVideosResponseJSON> {
    const videos = await this.queryBus.execute<
      GetAllVideosFromCourseQuery,
      GetAllVideosFromCourseResponse
    >(
      new GetAllVideosFromCourseQuery(new GetAllVideosFromCourseRequest(course))
    );
    if (videos.length === 0)
      throw new NotFoundException('Course videos not found!');
    return videos.map((video) => video.json);
  }
}

export default GetAllVideosController;
