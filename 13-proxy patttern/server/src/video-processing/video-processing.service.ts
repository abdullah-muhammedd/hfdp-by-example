import { Injectable } from '@nestjs/common';
import { CompressVideoDto } from './dto/compress-video.dto';
import { CropVideoDto } from './dto/crop-video.dto';
import { FastenVideoDto } from './dto/fasten-video.dto';
import { ResizeVideoDto } from './dto/resize-video.dto';
import { SlowVideoDto } from './dto/slow-video.dto';
import { VideoProcessing } from './entities/video-processing.entity';
import { FFmpegVideoProcessingProvider } from './providers/ffmpeg-video-processing.provider';
import { VideoProcessingRepository } from './repo/video-processing.repo';
import { VideoOperation } from './types/video-operation.type';

@Injectable()
export class VideoProcessingService {
  constructor(
    private readonly repo: VideoProcessingRepository,
    private readonly provider: FFmpegVideoProcessingProvider,
  ) {}

  // === Data management ===
  uploadVideo(originalPath: string): VideoProcessing {
    return this.repo.create(originalPath);
  }

  getVideo(videoId: string): VideoProcessing | undefined {
    return this.repo.findById(videoId);
  }

  listVideos(): VideoProcessing[] {
    return this.repo.listAll();
  }

  deleteVideo(videoId: string): boolean {
    return this.repo.delete(videoId);
  }

  // === Processing operations ===
  crop(dto: CropVideoDto): Promise<VideoOperation> {
    return this.provider.crop(dto);
  }

  resize(dto: ResizeVideoDto): Promise<VideoOperation> {
    return this.provider.resize(dto);
  }

  compress(dto: CompressVideoDto): Promise<VideoOperation> {
    return this.provider.compress(dto);
  }

  slow(dto: SlowVideoDto): Promise<VideoOperation> {
    return this.provider.slow(dto);
  }

  fasten(dto: FastenVideoDto): Promise<VideoOperation> {
    return this.provider.fasten(dto);
  }
}
