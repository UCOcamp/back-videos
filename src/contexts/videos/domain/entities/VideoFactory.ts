import { Injectable } from '@nestjs/common';
import Video from './video';
import { v4 as uuid } from 'uuid';
import EntityFactory from '../../../shared/domain/EntityFactory';
@Injectable()
class VideoFactory implements EntityFactory<Video> {
  create(title: string, course: string, url: string, thumbnailUrl: string) {
    const video = new Video(uuid(), title, course, url, thumbnailUrl);
    return video;
  }
}

export default VideoFactory;
