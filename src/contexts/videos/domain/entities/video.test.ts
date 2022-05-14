import Video from './video';
it('Video constructor && getters && setters', () => {
  const mockedVideo = {
    id: 'id',
    title: 'title',
    course: 'course',
    url: 'url',
    thumbnailUrl: 'thumbnailUrl',
  };
  const mockedVideo2 = {
    title: 'title2',
    course: 'course2',
    url: 'url2',
    thumbnailUrl: 'thumbnailUrl2',
  };

  const video = new Video(
    mockedVideo.id,
    mockedVideo.title,
    mockedVideo.course,
    mockedVideo.url,
    mockedVideo.thumbnailUrl
  );
  expect(video.id).toBe(mockedVideo.id);
  expect(video.title).toBe(mockedVideo.title);
  expect(video.course).toBe(mockedVideo.course);
  expect(video.url).toBe(mockedVideo.url);
  expect(video.thumbnailUrl).toBe(mockedVideo.thumbnailUrl);
  expect(video.json).toStrictEqual(mockedVideo);

  video.title = mockedVideo2.title;
  video.course = mockedVideo2.course;
  video.url = mockedVideo2.url;
  video.thumbnailUrl = mockedVideo2.thumbnailUrl;
  expect(video.title).toBe(mockedVideo2.title);
  expect(video.course).toBe(mockedVideo2.course);
  expect(video.url).toBe(mockedVideo2.url);
  expect(video.thumbnailUrl).toBe(mockedVideo2.thumbnailUrl);
});
