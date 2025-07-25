import { Module } from '@nestjs/common';
import { VideoProcessingModule } from './video-processing/video-processing.module';

@Module({
  imports: [VideoProcessingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
