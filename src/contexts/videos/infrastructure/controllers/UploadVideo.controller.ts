import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotAcceptableException,
  Post,
  Response,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Response as res } from 'express';
import UploadVideoDTO from '../../../shared/swaggerDTOS/UploadVideoDTO';
import UploadVideoCommand from '../../application/useCases/UploadVideo/commands/UploadVideo.command';
//import { existsSync, rmSync } from 'fs';
import UploadVideoRequest from '../../application/useCases/UploadVideo/requests/UploadVideo.request';
import saveVideoToStorage from './helpers/saveVideoToStorage';

@ApiTags('video')
@Controller('video')
class UploadVideoController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('/')
  @ApiOperation({
    summary:
      'Upload a video with a title and a thumbnail for a specific course',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Video File (mp4 | avi)',
    type: UploadVideoDTO,
  })
  @ApiBody({
    type: UploadVideoDTO,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Video uploaded succesfuly.',
  })
  @ApiNotAcceptableResponse({
    status: 400,
    description: 'Params missing (Title and Course needed)',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Duplicated or missing Video / Thumbnail!',
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      saveVideoToStorage
    )
  )
  public async postVideo(
    @UploadedFiles()
    files: { video: Express.Multer.File[]; thumbnail: Express.Multer.File[] },
    @Body() params: { title: string; course: string },
    @Response() response: res
  ) {
    const { title, course } = params;
    const { video, thumbnail } = files;

    if (!title || !course) {
      throw new BadRequestException('Params missing (Title and Course needed)');
    }
    if (!video || !thumbnail) {
      throw new NotAcceptableException(
        'Duplicated or missing Video / Thumbnail!'
      );
    }

    const request = new UploadVideoRequest(
      title,
      course,
      video[0].path,
      thumbnail[0].path
    );
    await this.commandBus.execute<UploadVideoCommand, void>(
      new UploadVideoCommand(request)
    );
    response
      .status(HttpStatus.CREATED)
      .send({ message: 'Video uploaded succesfuly' });
  }
}

export default UploadVideoController;
