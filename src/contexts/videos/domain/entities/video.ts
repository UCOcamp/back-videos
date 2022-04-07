import { AggregateRoot } from '@nestjs/cqrs';

class Video extends AggregateRoot {
  private readonly _id: string;
  private _title: string;
  private _url: string;
  private _thumbnailUrl: string;

  constructor(id: string, title: string, url: string, thumbnailUrl: string) {
    super();
    this._id = id;
    this._title = title;
    this._url = url;
    this._thumbnailUrl = thumbnailUrl;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }

  get url() {
    return this._url;
  }
  set url(url: string) {
    this._url = url;
  }

  get thumbnailUrl() {
    return this._thumbnailUrl;
  }
  set thumbnailUrl(thumbnailUrl: string) {
    this._thumbnailUrl = thumbnailUrl;
  }

  get json() {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      thumbnailUrl: this.thumbnailUrl,
    };
  }
}

export default Video;
