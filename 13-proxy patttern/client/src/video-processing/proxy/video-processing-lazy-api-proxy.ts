import { Injectable } from '@nestjs/common';
import { VideoProcessingApiProxy } from './video-processing-api.proxy';
import { CompressVideoDto } from '../dto/compress-video.dto';
import { CropVideoDto } from '../dto/crop-video.dto';
import { FastenVideoDto } from '../dto/fasten-video.dto';
import { ResizeVideoDto } from '../dto/resize-video.dto';
import { SlowVideoDto } from '../dto/slow-video.dto';
import { VideoProcessing } from '../types/video-processing.type';
import { VideoOperation } from '../types/video-operation.type';

@Injectable()
export class VideoProcessingLazyApiProxy {
  private initialized = false;

  constructor(private readonly realProxy: VideoProcessingApiProxy) {}

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.realProxy.initUserAndApiKey();
      this.initialized = true;
    }
  }

  async uploadVideo(filePath: string): Promise<VideoProcessing> {
    await this.ensureInitialized();
    return this.realProxy.uploadVideo(filePath);
  }

  async getVideo(videoId: string): Promise<VideoProcessing> {
    await this.ensureInitialized();
    return this.realProxy.getVideo(videoId);
  }

  async listVideos(): Promise<VideoProcessing[]> {
    await this.ensureInitialized();
    return this.realProxy.listVideos();
  }

  async deleteVideo(videoId: string): Promise<boolean> {
    await this.ensureInitialized();
    return this.realProxy.deleteVideo(videoId);
  }

  async crop(dto: CropVideoDto): Promise<VideoOperation> {
    await this.ensureInitialized();
    return this.realProxy.crop(dto);
  }

  async resize(dto: ResizeVideoDto): Promise<VideoOperation> {
    await this.ensureInitialized();
    return this.realProxy.resize(dto);
  }

  async compress(dto: CompressVideoDto): Promise<VideoOperation> {
    await this.ensureInitialized();
    return this.realProxy.compress(dto);
  }

  async slow(dto: SlowVideoDto): Promise<VideoOperation> {
    await this.ensureInitialized();
    return this.realProxy.slow(dto);
  }

  async fasten(dto: FastenVideoDto): Promise<VideoOperation> {
    await this.ensureInitialized();
    return this.realProxy.fasten(dto);
  }

  async downloadProcessedVideo(
    videoId: string,
    jobId: string,
    savePath: string,
  ): Promise<void> {
    await this.ensureInitialized();
    return this.realProxy.downloadProcessedVideo(videoId, jobId, savePath);
  }
}
