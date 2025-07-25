import { Module } from '@nestjs/common';
import { VideoProcessingService } from './video-processing.service';
import { VideoProcessingController } from './video-processing.controller';
import { VideoProcessingRepository } from './repo/video-processing.repo';
import { VideoOperationFactory } from './factory/video-operation.factory';
import { FFmpegVideoProcessingProvider } from './providers/ffmpeg-video-processing.provider';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [VideoProcessingController],
  providers: [
    VideoProcessingService,
    VideoProcessingRepository,
    VideoOperationFactory,
    FFmpegVideoProcessingProvider,
  ],
})
export class VideoProcessingModule {}
