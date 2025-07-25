import { OperationType } from './operation.type';

export type VideoOperation = {
  jobId: string;
  type: OperationType;
  status: 'pending' | 'success' | 'failed';
  outputPath?: string;
  reason?: string;
  params: {
    key: string;
    value: string;
  }[];
  createdAt: Date;
};
