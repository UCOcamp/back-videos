import DeleteVideoController from './DeleteVideo.controller';
import GetAllVideosController from './GetAllVideos.controller';
import GetVideoController from './GetVideo.controller';
import UploadVideoController from './UploadVideo.controller';

const VideoControllers = [
  UploadVideoController,
  GetAllVideosController,
  GetVideoController,
  DeleteVideoController,
];

export default VideoControllers;
