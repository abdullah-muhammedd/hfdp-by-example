import { Injectable } from '@nestjs/common';
import { CompressVideoDto } from './dto/compress-video.dto';
import { CropVideoDto } from './dto/crop-video.dto';
import { FastenVideoDto } from './dto/fasten-video.dto';
import { ResizeVideoDto } from './dto/resize-video.dto';
import { SlowVideoDto } from './dto/slow-video.dto';
import { VideoProcessing } from './types/video-processing.type';
import { VideoOperation } from './types/video-operation.type';
import { VideoProcessingLazyApiProxy } from './proxy/video-processing-lazy-api-proxy';

@Injectable()
export class VideoProcessingService {
  constructor(private readonly apiProxy: VideoProcessingLazyApiProxy) {}

  // === Data management ===
  uploadVideo(originalPath: string): Promise<VideoProcessing> {
    return this.apiProxy.uploadVideo(originalPath);
  }

  getVideo(videoId: string): Promise<VideoProcessing> {
    return this.apiProxy.getVideo(videoId);
  }

  listVideos(): Promise<VideoProcessing[]> {
    return this.apiProxy.listVideos();
  }

  deleteVideo(videoId: string): Promise<boolean> {
    return this.apiProxy.deleteVideo(videoId);
  }

  // === Processing operations ===
  crop(dto: CropVideoDto): Promise<VideoOperation> {
    return this.apiProxy.crop(dto);
  }

  resize(dto: ResizeVideoDto): Promise<VideoOperation> {
    return this.apiProxy.resize(dto);
  }

  compress(dto: CompressVideoDto): Promise<VideoOperation> {
    return this.apiProxy.compress(dto);
  }

  slow(dto: SlowVideoDto): Promise<VideoOperation> {
    return this.apiProxy.slow(dto);
  }

  fasten(dto: FastenVideoDto): Promise<VideoOperation> {
    return this.apiProxy.fasten(dto);
  }

  downloadProcessedVideo(
    videoId: string,
    jobId: string,
    savePath: string,
  ): Promise<void> {
    return this.apiProxy.downloadProcessedVideo(videoId, jobId, savePath);
  }
}
