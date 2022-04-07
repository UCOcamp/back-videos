import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: '/files',
    }),
  ],
})
class MulterConfigModule {}

export default MulterConfigModule;
