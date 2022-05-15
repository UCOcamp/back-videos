import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Response,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response as res } from 'express';
import DeleteVideoCommand from '../../application/useCases/DeleteVideo/commands/DeleteVideo.command';
import DeleteVideoRequest from '../../application/useCases/DeleteVideo/requests/DeleteVideo.request';
import DeleteVideoResponse from '../../application/useCases/DeleteVideo/responses/DeleteVideo.response';
import deleteVideoOnStorage from './helpers/deleteVideoOnStorage';

@Controller('video')
class DeleteVideoController {
  constructor(private readonly commandBus: CommandBus) {}
  @Delete(':id')
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
