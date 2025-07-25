import * as path from 'path';
import { VideoOperationFactory } from '../src/video-processing/factory/video-operation.factory';
import { FFmpegVideoProcessingProvider } from '../src/video-processing/providers/ffmpeg-video-processing.provider';
import { VideoProcessingRepository } from '../src/video-processing/repo/video-processing.repo';
import { VideoProcessingService } from '../src/video-processing/video-processing.service';

describe('VideoProcessingService (Integration)', () => {
  let service: VideoProcessingService;
  let testVideoPath: string;

  beforeAll(() => {
    const factory = new VideoOperationFactory();
    const repo = new VideoProcessingRepository(factory);
    const provider = new FFmpegVideoProcessingProvider(repo);

    service = new VideoProcessingService(repo, provider);
    testVideoPath = path.join(process.cwd(), 'stub', 'video-stub.mp4');
  });

  it('should upload a video and manage it in the repository', () => {
    const video = service.uploadVideo(testVideoPath);

    expect(video).toBeDefined();
    expect(video.originalPath).toBe(testVideoPath);
    expect(video.operations).toHaveLength(0);

    const allVideos = service.listVideos();
    expect(allVideos.some((v) => v.id === video.id)).toBe(true);

    const foundVideo = service.getVideo(video.id);
    expect(foundVideo?.id).toBe(video.id);

    const deleted = service.deleteVideo(video.id);
    expect(deleted).toBe(true);
  });

  it('should perform a crop operation', async () => {
    const video = service.uploadVideo(testVideoPath);
    const op = await service.crop({
      videoId: video.id,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    });

    expect(op.status).toBe('success');
    expect(op.outputPath).toBeDefined();
  }, 30000);

  it('should perform a resize operation', async () => {
    const video = service.uploadVideo(testVideoPath);
    const op = await service.resize({
      videoId: video.id,
      width: 320,
      height: 240,
    });

    expect(op.status).toBe('success');
    expect(op.outputPath).toBeDefined();
  }, 30000);

  it('should perform a compress operation', async () => {
    const video = service.uploadVideo(testVideoPath);
    const op = await service.compress({
      videoId: video.id,
      quality: 28,
    });

    expect(op.status).toBe('success');
    expect(op.outputPath).toBeDefined();
  }, 30000);

  it('should perform a slow operation', async () => {
    const video = service.uploadVideo(testVideoPath);
    const op = await service.slow({
      videoId: video.id,
      factor: 0.5, // half speed
    });

    expect(op.status).toBe('success');
    expect(op.outputPath).toBeDefined();
  }, 30000);

  it('should perform a fasten operation', async () => {
    const video = service.uploadVideo(testVideoPath);
    const op = await service.fasten({
      videoId: video.id,
      factor: 2, // double speed
    });

    expect(op.status).toBe('success');
    expect(op.outputPath).toBeDefined();
  }, 30000);
});
