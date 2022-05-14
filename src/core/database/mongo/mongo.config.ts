import 'dotenv/config';
const config = {
  HOST: process.env.MONGO_HOST || 'localhost',
  NAME: process.env.MONGO_NAME || 'UCOCamp-videos',
  USER: process.env.MONGO_USERNAME || '',
  PASSWORD: process.env.MONGO_PASSWORD || '',
};

export default config;
