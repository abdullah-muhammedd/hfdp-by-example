import { VideoOperation } from './video-operation.type';
export type VideoProcessing = {
  id: string;
  originalPath: string;
  operations: VideoOperation[];
};
