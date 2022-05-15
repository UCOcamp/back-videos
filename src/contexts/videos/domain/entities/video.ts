import { AggregateRoot } from '@nestjs/cqrs';

class Video extends AggregateRoot {
  private readonly _id: string;
  private _title: string;
  private _course: string;
  private _url: string;
  private _thumbnailUrl: string;

  constructor(
    id: string,
    title: string,
    course: string,
    url: string,
    thumbnailUrl: string
  ) {
    super();
    this._id = id;
    this._title = title;
    this._course = course;
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
  get course() {
    return this._course;
  }
  set course(course: string) {
    this._course = course;
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

  get json(): VideoAsJSON {
    return {
      id: this.id,
      title: this.title,
      course: this.course,
      url: this.url,
      thumbnailUrl: this.thumbnailUrl,
    };
  }
}
type VideoAsJSON = {
  id: string;
  title: string;
  course: string;
  url: string;
  thumbnailUrl: string;
};
export { VideoAsJSON };

export default Video;
