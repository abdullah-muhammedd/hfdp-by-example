import { IsUUID, IsNumber, Min, Max } from 'class-validator';

export class CompressVideoDto {
  @IsUUID()
  videoId: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  quality: number; // percentage
}
