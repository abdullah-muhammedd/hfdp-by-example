import { Injectable } from '@nestjs/common';
import { VideoProcessing } from '../entities/video-processing.entity';
import { VideoOperation } from '../types/video-operation.type';
import { OperationType } from '../types/operation.type';
import { VideoOperationFactory } from '../factory/video-operation.factory';

@Injectable()
export class VideoProcessingRepository {
  constructor(private videoOperataionFactory: VideoOperationFactory) {}

  private videos: Map<string, VideoProcessing> = new Map();

  // Create a new VideoProcessing entity and store it
  create(originalPath: string): VideoProcessing {
    const video = new VideoProcessing(originalPath);
    this.videos.set(video.id, video);
    return video;
  }

  // Retrieve a VideoProcessing entity by ID
  findById(id: string): VideoProcessing | undefined {
    return this.videos.get(id);
  }

  // Add a new operation to an existing video
  addOperation(
    videoId: string,
    type: OperationType,
    params: Record<string, any>, // DTO object without validation at this point
  ): VideoOperation {
    const video = this.findById(videoId);
    if (!video) {
      throw new Error(`Video with ID ${videoId} not found`);
    }
    const operation = this.videoOperataionFactory.create(type, params);
    return video.addOperation(operation);
  }

  // Update the status of an operation
  completeOperation(
    videoId: string,
    jobId: string,
    success: boolean,
    outputPath?: string,
    reason?: string,
  ) {
    const video = this.findById(videoId);
    if (!video) {
      throw new Error(`Video with ID ${videoId} not found`);
    }
    video.completeOperation(jobId, success, outputPath, reason);
  }

  // List all videos
  listAll(): VideoProcessing[] {
    return Array.from(this.videos.values());
  }

  // Delete a video entry (e.g., after download and cleanup)
  delete(videoId: string): boolean {
    return this.videos.delete(videoId);
  }
}
