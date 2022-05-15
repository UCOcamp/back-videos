import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import GetVideoQuery from '../../application/useCases/GetVideo/querys/GetVideo.query';
import GetVideoRequest from '../../application/useCases/GetVideo/requests/GetVideo.request';
import {
  GetVideoResponse,
  GetVideoResponseJSON,
} from '../../application/useCases/GetVideo/responses/GetVideo.response';

@Controller('video')
class GetVideoController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get(':id')
  async getVideo(@Param('id') id: string): Promise<GetVideoResponseJSON> {
    const video = await this.queryBus.execute<GetVideoQuery, GetVideoResponse>(
      new GetVideoQuery(new GetVideoRequest(id))
    );
    return video.json;
  }
}

export default GetVideoController;
