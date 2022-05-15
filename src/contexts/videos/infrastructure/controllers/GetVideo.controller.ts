import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import GetVideoQuery from '../../application/useCases/GetVideo/querys/GetVideo.query';
import GetVideoRequest from '../../application/useCases/GetVideo/requests/GetVideo.request';
import {
  GetVideoResponse,
  GetVideoResponseJSON,
} from '../../application/useCases/GetVideo/responses/GetVideo.response';

@ApiTags('video')
@Controller('video')
class GetVideoController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific video from his id',
  })
  @ApiParam({
    description: 'Id of the video (UUID format)',
    type: 'string',
    name: 'id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Video returned succesfuly',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Video Not Found!',
  })
  async getVideo(@Param('id') id: string): Promise<GetVideoResponseJSON> {
    const video = await this.queryBus.execute<GetVideoQuery, GetVideoResponse>(
      new GetVideoQuery(new GetVideoRequest(id))
    );
    return video.json;
  }
}

export default GetVideoController;
