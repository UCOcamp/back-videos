import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import VideoWasDeletedEvent from './VideoWasDeleted.event';

@EventsHandler(VideoWasDeletedEvent)
class VideoWasUploadedHandler implements IEventHandler<VideoWasDeletedEvent> {
  async handle({ id }: VideoWasDeletedEvent): Promise<void> {
    console.log(`Deleted video with id ${id}`);
  }
}

export default VideoWasUploadedHandler;
