import Video, { VideoAsJSON } from '../../../../domain/entities/video';

type GetAllVideosResponse = Video[];
type GetAllVideosResponseJSON = VideoAsJSON[];

export { GetAllVideosResponse, GetAllVideosResponseJSON };
