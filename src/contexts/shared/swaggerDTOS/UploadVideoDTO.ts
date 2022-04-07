/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';

class UploadVideoDTO {
  @ApiProperty({ type: 'String', description: 'Course were video belongs' })
  course!: string;

  @ApiProperty({ type: 'String', description: 'Title for the video' })
  title!: string;

  @ApiProperty({
    type: 'Video',
    format: 'binary',
    description: 'The video itself (mp4 or avi)',
  })
  video!: Express.Multer.File;

  @ApiProperty({
    type: 'Image',
    format: 'binary',
    description: 'The thumbnail for the video (png or svg)',
  })
  thumbnail!: Express.Multer.File;
}

export default UploadVideoDTO;
