import Video from '../entities/video';

interface VideoEntityRepository {
  getOne(id: string): Promise<Video>;
  getAll(): Promise<Video[]>;
  saveOne(video: Video): Promise<Video>;
  updateOne(video: Video): Promise<Video>;
  deleteOne(id: string): Promise<Video>;
}

export default VideoEntityRepository;
