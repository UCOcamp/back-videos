import GetAllVideosHandler from './GetAllVideos/querys/GetAllVideos.handler';
import GetAllVideosFromCourseHandler from './GetAllVideosFromCourse/querys/GetAllVideosFromCourse.handler';
import GetVideoHandler from './GetVideo/querys/GetVideo.handler';
import UploadVideoHandler from './UploadVideo/commands/UploadVideo.handler';
import VideoWasUploadedHandler from './UploadVideo/events/VideoWasUploaded.handler';

export const VideoCommandHandlers = [UploadVideoHandler];
export const VideoEventHandlers = [VideoWasUploadedHandler];
export const VideoQueryHandlers = [
  GetAllVideosHandler,
  GetAllVideosFromCourseHandler,
  GetVideoHandler,
];
