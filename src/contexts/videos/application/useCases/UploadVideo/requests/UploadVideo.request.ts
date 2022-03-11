class UploadVideoRequest {
  constructor(
    private readonly _title: string,
    private readonly _url: string,
    private readonly _thumbnailUrl: string
  ) {}
  get title() {
    return this._title;
  }
  get url() {
    return this._url;
  }
  get thumbnailUrl() {
    return this._thumbnailUrl;
  }
}

export default UploadVideoRequest;
