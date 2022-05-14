import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import UploadVideoCommand from './UploadVideo.command';
import VideoFactory from './../../../../domain/entities/VideoFactory';
import MongoVideoEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/VideoEntityRepository';
import VideoWasUploadedEvent from '../events/VideoWasUploaded.event';

@CommandHandler(UploadVideoCommand)
class UploadVideoHandler implements ICommandHandler<UploadVideoCommand> {
  constructor(
    private readonly videoFactory: VideoFactory,
    private readonly eventPublisher: EventPublisher,
    private readonly NoteRepository: MongoVideoEntityRepository
  ) {}
  async execute(command: UploadVideoCommand): Promise<void> {
    const { title, course, url, thumbnailUrl } = command.uploadVideoRequest;
    const video = this.eventPublisher.mergeObjectContext(
      this.videoFactory.create(title, course, url, thumbnailUrl)
    );

    await this.NoteRepository.saveOne(video);
    video.apply(new VideoWasUploadedEvent(video.id));
    video.commit();
  }
}

export default UploadVideoHandler;
