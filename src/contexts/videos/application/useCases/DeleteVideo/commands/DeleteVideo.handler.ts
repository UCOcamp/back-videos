import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import MongoVideoEntityRepository from '../../../../infrastructure/persistance/mongo/repositories/VideoEntityRepository';
import VideoWasDeletedEvent from '../events/VideoWasDeleted.event';
import DeleteVideoResponse from '../responses/DeleteVideo.response';
import DeleteVideoCommand from './DeleteVideo.command';

@CommandHandler(DeleteVideoCommand)
class DeleteVideoHandler implements ICommandHandler<DeleteVideoCommand> {
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly videoRepository: MongoVideoEntityRepository
  ) {}
  async execute({
    deleteVideoRequest,
  }: DeleteVideoCommand): Promise<DeleteVideoResponse> {
    const { id } = deleteVideoRequest;
    const video = this.eventPublisher.mergeObjectContext(
      await this.videoRepository.getOne(id)
    );
    await this.videoRepository.deleteOne(id);
    video.apply(new VideoWasDeletedEvent(video.id));
    video.commit();
    return video;
  }
}

export default DeleteVideoHandler;
