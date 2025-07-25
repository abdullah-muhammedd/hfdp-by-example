import { Injectable } from '@nestjs/common';
import { VideoOperation } from '../types/video-operation.type';
import { OperationType } from '../types/operation.type';
import * as crypto from 'crypto';
@Injectable()
export class VideoOperationFactory {
  create(
    type: OperationType,
    params: Record<string, any>,
  ): Omit<VideoOperation, 'status'> {
    const flattenedParams = Object.entries(params)
      .filter(([key]) => key !== 'videoId')
      .map(([key, value]) => ({
        key,
        value: String(value),
      }));

    return {
      jobId: crypto.randomUUID(),
      type,
      createdAt: new Date(),
      params: flattenedParams,
    };
  }
}
