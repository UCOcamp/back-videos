import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import GetAllVideosQuery from '../../application/useCases/GetAllVideos/querys/GetAllVideos.query';
import GetAllVideosRequest from '../../application/useCases/GetAllVideos/requests/GetAllVideos.request';
import {
  GetAllVideosResponse,
  GetAllVideosResponseJSON,
} from '../../application/useCases/GetAllVideos/responses/getAllVideos.response';

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
}

export default GetAllVideosController;
