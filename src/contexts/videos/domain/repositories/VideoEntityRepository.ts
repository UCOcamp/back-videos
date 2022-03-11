import Video from '../entities/video';

interface VideoEntityRepository {
  getOne(id: string): Promise<Video>;
  getAll(): Promise<Video[]>;
  saveOne(video: Video): Promise<void>;
  updateOne(video: Video): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export default VideoEntityRepository;
