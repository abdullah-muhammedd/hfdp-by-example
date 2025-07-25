import { CompressVideoDto } from 'src/video-processing/dto/compress-video.dto';
import { CropVideoDto } from 'src/video-processing/dto/crop-video.dto';
import { FastenVideoDto } from 'src/video-processing/dto/fasten-video.dto';
import { ResizeVideoDto } from 'src/video-processing/dto/resize-video.dto';
import { SlowVideoDto } from 'src/video-processing/dto/slow-video.dto';
import { VideoOperation } from '../video-operation.type';

export interface VideoProcessingProvider {
  crop(dto: CropVideoDto): Promise<VideoOperation>;
  resize(dto: ResizeVideoDto): Promise<VideoOperation>;
  compress(dto: CompressVideoDto): Promise<VideoOperation>;
  slow(dto: SlowVideoDto): Promise<VideoOperation>;
  fasten(dto: FastenVideoDto): Promise<VideoOperation>;
}
