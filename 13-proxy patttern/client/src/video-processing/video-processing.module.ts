import { Module } from '@nestjs/common';
import { VideoProcessingService } from './video-processing.service';
import { VideoProcessingApiProxy } from './proxy/video-processing-api.proxy';
import { VideoProcessingLazyApiProxy } from './proxy/video-processing-lazy-api-proxy';

@Module({
  providers: [
    VideoProcessingService,
    VideoProcessingApiProxy,
    VideoProcessingLazyApiProxy,
  ],
})
export class VideoProcessingModule {}
