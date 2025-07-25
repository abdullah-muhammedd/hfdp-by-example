/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

import * as fs from 'fs';
import * as FormData from 'form-data';
import { CompressVideoDto } from '../dto/compress-video.dto';
import { CropVideoDto } from '../dto/crop-video.dto';
import { FastenVideoDto } from '../dto/fasten-video.dto';
import { ResizeVideoDto } from '../dto/resize-video.dto';
import { SlowVideoDto } from '../dto/slow-video.dto';
import { VideoProcessing } from '../types/video-processing.type';
import { VideoOperation } from '../types/video-operation.type';

@Injectable()
export class VideoProcessingApiProxy {
  private readonly http: AxiosInstance;
  private apiKey: string | null = null;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.SERVER_URL || 'http://localhost:3000',
      timeout: 60000,
    });
  }

  async initUserAndApiKey() {
    // Create a user on module init and store the API key
    try {
      const email = `client-${Date.now()}@example.com`; // or configurable
      const isPro = false; // or true if you want pro user

      const response = await this.http.post('/user/create', { email, isPro });
      // Expected response: { id, email, apiKey, isPro, ... }
      this.apiKey = response.data.apiKey;

      // Add interceptor to add API key header to all requests
      this.http.interceptors.request.use((config) => {
        if (this.apiKey) {
          config.headers['x-api-key'] = this.apiKey;
        }
        return config;
      });
    } catch (error: any) {
      throw new HttpException(
        `Failed to create user: ${error.response?.data || error.message}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private checkFileExists(filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new HttpException(
        `File not found: ${filePath}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async uploadVideo(filePath: string): Promise<VideoProcessing> {
    this.checkFileExists(filePath);

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    const headers = form.getHeaders();

    try {
      const response = await this.http.post('/video-processing/upload', form, {
        headers,
      });
      return response.data as VideoProcessing;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getVideo(videoId: string): Promise<VideoProcessing> {
    try {
      const response = await this.http.get(`/video-processing/${videoId}`);
      return response.data as VideoProcessing;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listVideos(): Promise<VideoProcessing[]> {
    try {
      const response = await this.http.get('/video-processing');
      return response.data as VideoProcessing[];
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteVideo(videoId: string): Promise<boolean> {
    try {
      await this.http.delete(`/video-processing/${videoId}`);
      return true;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async crop(dto: CropVideoDto): Promise<VideoOperation> {
    try {
      console.log(dto.videoId);
      const response = await this.http.post('/video-processing/crop', dto);
      return response.data as VideoOperation;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resize(dto: ResizeVideoDto): Promise<VideoOperation> {
    try {
      const response = await this.http.post('/video-processing/resize', dto);
      return response.data as VideoOperation;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async compress(dto: CompressVideoDto): Promise<VideoOperation> {
    try {
      const response = await this.http.post('/video-processing/compress', dto);
      return response.data as VideoOperation;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async slow(dto: SlowVideoDto): Promise<VideoOperation> {
    try {
      const response = await this.http.post('/video-processing/slow', dto);
      return response.data as VideoOperation;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fasten(dto: FastenVideoDto): Promise<VideoOperation> {
    try {
      const response = await this.http.post('/video-processing/fasten', dto);
      return response.data as VideoOperation;
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async downloadProcessedVideo(
    videoId: string,
    jobId: string,
    savePath: string,
  ): Promise<void> {
    try {
      const response = await this.http.get(
        `/video-processing/${videoId}/operations/${jobId}/download`,
        { responseType: 'stream' },
      );

      await new Promise<void>((resolve, reject) => {
        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error: any) {
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
