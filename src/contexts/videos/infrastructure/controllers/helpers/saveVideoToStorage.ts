import { diskStorage } from 'multer';
import fs from 'fs';
import path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const validMimeTypes: string[] = [
  'video/mp4',
  'video/avi',
  'image/svg+xml',
  'image/png',
];

const saveVideoToStorage: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      let { course, title } = req.body;
      if (!course) course = '';
      if (!title) title = '';

      const courseDir = './files/' + course.replace(/ /g, '');
      if (!fs.existsSync(courseDir)) {
        fs.mkdirSync(courseDir);
      }
      const videoDir = courseDir + '/' + title.replace(/ /g, '').toLowerCase();
      if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir);
      }

      cb(null, videoDir);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      let { title } = req.body;
      if (!title) title = '';
      const fileName = title.replace(/ /g, '') + fileExtension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    let { course, title } = req.body;
    if (!course) course = '';
    if (!title) title = '';

    const courseDir = './files/' + course;
    const videoDir = courseDir + '/' + title.replace(/ /g, '').toLowerCase();

    const fileExtension = path.extname(file.originalname);
    const fileName = title.replace(/ /g, '') + fileExtension;

    const fullPath = videoDir + '/' + fileName;
    validMimeTypes.includes(file.mimetype) && !fs.existsSync(fullPath)
      ? cb(null, true)
      : cb(null, false);
  },
};

export default saveVideoToStorage;
