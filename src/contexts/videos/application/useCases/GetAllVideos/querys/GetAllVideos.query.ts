import GetAllVideosRequest from '../requests/GetAllVideos.request';

class GetAllVideosQuery {
  constructor(private readonly _getAllVideosRequest: GetAllVideosRequest) {}
  get getAllVideosRequest() {
    return this._getAllVideosRequest;
  }
}

export default GetAllVideosQuery;
