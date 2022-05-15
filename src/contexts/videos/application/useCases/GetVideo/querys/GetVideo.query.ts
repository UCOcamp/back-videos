import GetVideoRequest from '../requests/GetVideo.request';

class GetVideoQuery {
  constructor(public readonly getVideoRequest: GetVideoRequest) {}
}

export default GetVideoQuery;
