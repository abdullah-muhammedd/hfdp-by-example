import { Module } from '@nestjs/common';
import { VideoProcessingModule } from './video-processing/video-processing.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [VideoProcessingModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
