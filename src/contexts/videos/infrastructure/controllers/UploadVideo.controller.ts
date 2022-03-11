import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response as res } from 'express';
import UploadVideoCommand from '../../application/useCases/UploadVideo/commands/UploadVideo.command';
//import { existsSync, rmSync } from 'fs';
import UploadVideoRequest from '../../application/useCases/UploadVideo/requests/UploadVideo.request';
import saveVideoToStorage from './helpers/saveVideoToStorage';

@Controller('videos')
class UploadVideoController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('/')
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
      throw new BadRequestException('Duplicated or missing Video / Thumbnail!');
    }

    /**
    const video = files.video;
    const thumbnail = files.thumbnail;
    if (this.checkIfAlreadyExists(params.course, params.title)) {
      response.status(HttpStatus.BAD_REQUEST);
      response.send({ message: 'Video title duplicated in the same course!' });
      if (video) {
        rmSync(video[0].path);
      }
      if (thumbnail) {
        rmSync(thumbnail[0].path);
      }
      return;
    }
    */
    const request = new UploadVideoRequest(
      title,
      video[0].path,
      thumbnail[0].path
    );
    await this.commandBus.execute<UploadVideoCommand, void>(
      new UploadVideoCommand(request)
    );
    response
      .status(HttpStatus.CREATED)
      .send({ message: 'video uploaded succesfuly' });
  }
  /**
  private checkIfAlreadyExists(course: string, title: string) {
    const courseDir = './files/' + course.replace(/ /g, '');
    const folderDir = courseDir + '/' + title.replace(/ /g, '').toLowerCase();
    if (existsSync(folderDir)) {
      return true;
    }
    return false;
  }
  */
}

export default UploadVideoController;
