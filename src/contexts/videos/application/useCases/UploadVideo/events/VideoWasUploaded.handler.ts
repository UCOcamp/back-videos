import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import VideoWasUploadedEvent from './VideoWasUploaded.event';

@EventsHandler(VideoWasUploadedEvent)
class VideoWasUploadedHandler implements IEventHandler<VideoWasUploadedEvent> {
  async handle({ id }: VideoWasUploadedEvent): Promise<void> {
    console.log(`Uploaded video with id ${id}`);
  }
}

export default VideoWasUploadedHandler;
