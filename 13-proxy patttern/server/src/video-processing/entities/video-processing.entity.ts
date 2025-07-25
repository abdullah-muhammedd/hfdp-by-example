import { VideoOperation } from '../types/video-operation.type';
import * as crypto from 'crypto';
export class VideoProcessing {
  id: string;
  originalPath: string;
  operations: VideoOperation[];

  constructor(originalPath: string) {
    this.id = crypto.randomUUID();
    this.originalPath = originalPath;
    this.operations = [];
  }

  addOperation(operation: Omit<VideoOperation, 'status'>): VideoOperation {
    const fullOperation: VideoOperation = {
      ...operation,
      status: 'pending',
    };
    this.operations.push(fullOperation);
    return fullOperation;
  }

  completeOperation(
    jobId: string,
    success: boolean,
    outputPath?: string,
    reason?: string,
  ) {
    const job = this.operations.find((op) => op.jobId === jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    job.status = success ? 'success' : 'failed';
    if (success) job.outputPath = outputPath;
    if (!success && reason) job.reason = reason;
  }

  // Retrieve operation by job ID
  getOperation(jobId: string): VideoOperation | undefined {
    return this.operations.find((op) => op.jobId === jobId);
  }

  // List all operations
  listOperations(): VideoOperation[] {
    return this.operations;
  }
}
