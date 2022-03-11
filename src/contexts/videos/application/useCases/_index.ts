import UploadVideoHandler from './UploadVideo/commands/UploadVideo.handler';
import VideoWasUploadedHandler from './UploadVideo/events/VideoWasUploaded.handler';

export const VideoCommandHandlers = [UploadVideoHandler];
export const VideoEventHandlers = [VideoWasUploadedHandler];
