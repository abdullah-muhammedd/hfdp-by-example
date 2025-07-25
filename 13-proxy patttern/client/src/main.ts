/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VideoProcessingService } from './video-processing/video-processing.service';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.init();

  const service = app.get(VideoProcessingService);

  const videoPath = path.join(process.cwd(), 'data', 'video-stub.mp4');
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Test video not found at ${videoPath}`);
  }

  console.log('Uploading video...');
  const uploaded = await service.uploadVideo(videoPath);
  console.log('Uploaded:', uploaded);

  // Perform all operations
  const operations = await Promise.all([
    service.crop({
      videoId: uploaded.id,
      width: 320,
      height: 240,
      x: 0,
      y: 0,
    }),
    service.resize({ videoId: uploaded.id, width: 640, height: 480 }),
    service.compress({ videoId: uploaded.id, quality: 28 }),
    service.slow({ videoId: uploaded.id, factor: 0.5 }),
    service.fasten({ videoId: uploaded.id, factor: 2 }),
  ]);

  console.log('Processing completed:', operations);

  // Download processed videos
  const downloadDir = path.join(process.cwd(), 'downloads');
  fs.mkdirSync(downloadDir, { recursive: true });

  for (const op of operations) {
    const downloadPath = path.join(downloadDir, `${op.jobId}.mp4`);
    await service.downloadProcessedVideo(uploaded.id, op.jobId, downloadPath);

    console.log(`Downloaded processed video to ${downloadPath}`);
  }

  // Try to upload again (should fail if quota exceeded)
  try {
    console.log('Attempting to upload video again...');
    await service.uploadVideo(videoPath);
  } catch (err: any) {
    console.error('Expected failure:', err.message);
  }

  await app.close();
}

void bootstrap();
