import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Response,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response as res } from 'express';
import DeleteVideoCommand from '../../application/useCases/DeleteVideo/commands/DeleteVideo.command';
import DeleteVideoRequest from '../../application/useCases/DeleteVideo/requests/DeleteVideo.request';
import DeleteVideoResponse from '../../application/useCases/DeleteVideo/responses/DeleteVideo.response';
import deleteVideoOnStorage from './helpers/deleteVideoOnStorage';

@ApiTags('video')
@Controller('video')
class DeleteVideoController {
  constructor(private readonly commandBus: CommandBus) {}
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a video with his id',
  })
  @ApiParam({
    description: 'Id of the video (UUID format)',
    type: 'string',
    name: 'id',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Video removed succesfuly',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Video Not Found!',
  })
  async deleteVideo(@Param('id') id: string, @Response() response: res) {
    /**
     * Delete video on Database
     */
    const video = await this.commandBus.execute<
      DeleteVideoCommand,
      DeleteVideoResponse
    >(new DeleteVideoCommand(new DeleteVideoRequest(id)));
    /**
     * Delete video on /files
     */
    deleteVideoOnStorage(video.course, video.title);

    response
      .status(HttpStatus.OK)
      .send({ message: 'Video removed succesfuly' });
  }
}

export default DeleteVideoController;
