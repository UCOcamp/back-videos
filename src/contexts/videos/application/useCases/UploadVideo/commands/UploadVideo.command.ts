import UploadVideoRequest from '../requests/UploadVideo.request';

class UploadVideoCommand {
  constructor(private readonly _uploadVideoRequest: UploadVideoRequest) {}
  get uploadVideoRequest() {
    return this._uploadVideoRequest;
  }
}

export default UploadVideoCommand;
