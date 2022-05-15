import { join } from 'path';
import { rmSync, RmOptions, existsSync } from 'fs';
const deleteVideoOnStorage = (course: string, title: string) => {
  const path = join(process.cwd(), 'files', course, title.toLowerCase());
  if (!existsSync(path)) return;
  const options: RmOptions = {
    recursive: true,
    force: true,
  };
  rmSync(path, options);
};

export default deleteVideoOnStorage;
