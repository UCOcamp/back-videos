import DeleteVideoHandler from './DeleteVideo/commands/DeleteVideo.handler';
import VideoWasDeletedHandler from './DeleteVideo/events/VideoWasDeleted.handler';
import GetAllVideosHandler from './GetAllVideos/querys/GetAllVideos.handler';
import GetAllVideosFromCourseHandler from './GetAllVideosFromCourse/querys/GetAllVideosFromCourse.handler';
import GetVideoHandler from './GetVideo/querys/GetVideo.handler';
import UploadVideoHandler from './UploadVideo/commands/UploadVideo.handler';
import VideoWasUploadedHandler from './UploadVideo/events/VideoWasUploaded.handler';

export const VideoCommandHandlers = [UploadVideoHandler, DeleteVideoHandler];
export const VideoEventHandlers = [
  VideoWasUploadedHandler,
  VideoWasDeletedHandler,
];
export const VideoQueryHandlers = [
  GetAllVideosHandler,
  GetAllVideosFromCourseHandler,
  GetVideoHandler,
];
