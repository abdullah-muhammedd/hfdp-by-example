import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoProcessingService } from './video-processing.service';
import { CropVideoDto } from './dto/crop-video.dto';
import { ResizeVideoDto } from './dto/resize-video.dto';
import { CompressVideoDto } from './dto/compress-video.dto';
import { SlowVideoDto } from './dto/slow-video.dto';
import { FastenVideoDto } from './dto/fasten-video.dto';
import { Response, Express } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ApiKeyGuard } from '../user/guard/api-key.guard';

@Controller('video-processing')
@UseGuards(ApiKeyGuard)
export class VideoProcessingController {
  constructor(
    private readonly videoProcessingService: VideoProcessingService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }

    const video = this.videoProcessingService.uploadVideo(file.path);
    return video;
  }

  @Get()
  listVideos() {
    return this.videoProcessingService.listVideos();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getVideo(@Param('id') id: string) {
    const video = this.videoProcessingService.getVideo(id);
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return video;
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteVideo(@Param('id') id: string) {
    const deleted = this.videoProcessingService.deleteVideo(id);
    if (!deleted) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    return { deleted: true };
  }

  @Post('crop')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crop(@Body() dto: CropVideoDto) {
    return this.videoProcessingService.crop(dto);
  }

  @Post('resize')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  resize(@Body() dto: ResizeVideoDto) {
    return this.videoProcessingService.resize(dto);
  }

  @Post('compress')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  compress(@Body() dto: CompressVideoDto) {
    return this.videoProcessingService.compress(dto);
  }

  @Post('slow')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  slow(@Body() dto: SlowVideoDto) {
    return this.videoProcessingService.slow(dto);
  }

  @Post('fasten')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  fasten(@Body() dto: FastenVideoDto) {
    return this.videoProcessingService.fasten(dto);
  }

  @Get(':videoId/operations/:jobId/download')
  @UsePipes(new ValidationPipe({ transform: true }))
  downloadProcessedVideo(
    @Param('videoId') videoId: string,
    @Param('jobId') jobId: string,
    @Res() res: Response,
  ) {
    const video = this.videoProcessingService.getVideo(videoId);
    if (!video)
      throw new NotFoundException(`Video with ID ${videoId} not found`);

    const operation = video.getOperation(jobId);
    if (!operation || operation.status !== 'success' || !operation.outputPath) {
      throw new NotFoundException(
        `Processed video for job ${jobId} is not available`,
      );
    }

    return res.download(operation.outputPath);
  }
}
