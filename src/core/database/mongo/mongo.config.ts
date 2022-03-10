import 'dotenv/config';
const config = {
  HOST: process.env.MONGO_HOST || 'localhost',
  NAME: process.env.MONGO_NAME || 'UCOCamp-videos',
};

export default config;
