/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { execFile } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

import { VideoOperation } from '../types/video-operation.type';
import { CropVideoDto } from '../dto/crop-video.dto';
import { ResizeVideoDto } from '../dto/resize-video.dto';
import { CompressVideoDto } from '../dto/compress-video.dto';
import { SlowVideoDto } from '../dto/slow-video.dto';
import { FastenVideoDto } from '../dto/fasten-video.dto';
import { OperationType } from '../types/operation.type';
import { VideoProcessingRepository } from '../repo/video-processing.repo';
import { VideoProcessingProvider } from '../types/interfaces/video-processing-provider.interface';

const execFileAsync = promisify(execFile);

@Injectable()
export class FFmpegVideoProcessingProvider implements VideoProcessingProvider {
  constructor(private readonly repo: VideoProcessingRepository) {}

  private async runFFmpeg<T extends { videoId: string }>(
    dto: T,
    type: OperationType,
    args: string[],
  ): Promise<VideoOperation> {
    const { videoId, ...params } = dto;
    const video = this.repo.findById(videoId);
    if (!video) throw new Error(`Video ${videoId} not found`);

    const operation = this.repo.addOperation(videoId, type, params);

    const inputPath = video.originalPath;
    const outputPath = path.join(
      process.cwd(),
      'processed',
      `${operation.jobId}.mp4`,
    );

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const finalArgs = ['-i', inputPath, ...args, outputPath];

    try {
      await execFileAsync('ffmpeg', finalArgs);

      this.repo.completeOperation(videoId, operation.jobId, true, outputPath);
      const updated = this.repo
        .findById(videoId)
        ?.getOperation(operation.jobId);
      if (!updated) {
        throw new Error(
          `Operation ${operation.jobId} not found after completion`,
        );
      }
      return updated;
    } catch (err: any) {
      this.repo.completeOperation(
        videoId,
        operation.jobId,
        false,
        undefined,
        err?.message,
      );
      throw err;
    }
  }

  crop(dto: CropVideoDto): Promise<VideoOperation> {
    const args = [
      '-vf',
      `crop=${dto.width}:${dto.height}:${dto.x}:${dto.y}`,
      '-c:a',
      'copy',
    ];
    return this.runFFmpeg(dto, 'crop', args);
  }

  resize(dto: ResizeVideoDto): Promise<VideoOperation> {
    const args = ['-vf', `scale=${dto.width}:${dto.height}`, '-c:a', 'copy'];
    return this.runFFmpeg(dto, 'resize', args);
  }

  compress(dto: CompressVideoDto): Promise<VideoOperation> {
    const args = [
      '-vcodec',
      'libx264',
      '-crf',
      `${dto.quality}`,
      '-c:a',
      'copy',
    ];
    return this.runFFmpeg(dto, 'compress', args);
  }

  slow(dto: SlowVideoDto): Promise<VideoOperation> {
    const videoFilter = `setpts=${1 / dto.factor}*PTS`;

    // FFmpeg atempo supports 0.5–2.0, so we may need to chain filters for extreme factors
    const audioFilter =
      dto.factor >= 0.5 && dto.factor <= 2
        ? `atempo=${dto.factor}`
        : `atempo=${dto.factor > 2 ? 2 : 0.5},atempo=${dto.factor / (dto.factor > 2 ? 2 : 0.5)}`;

    const args = ['-vf', videoFilter, '-filter:a', audioFilter];
    return this.runFFmpeg(dto, 'slow', args);
  }

  fasten(dto: FastenVideoDto): Promise<VideoOperation> {
    const videoFilter = `setpts=${1 / dto.factor}*PTS`;

    const audioFilter =
      dto.factor >= 0.5 && dto.factor <= 2
        ? `atempo=${dto.factor}`
        : `atempo=${dto.factor > 2 ? 2 : 0.5},atempo=${dto.factor / (dto.factor > 2 ? 2 : 0.5)}`;

    const args = ['-vf', videoFilter, '-filter:a', audioFilter];
    return this.runFFmpeg(dto, 'fasten', args);
  }
}
