import { IsUUID, IsNumber, Min } from 'class-validator';

export class ResizeVideoDto {
  @IsUUID()
  videoId: string;

  @IsNumber()
  @Min(1)
  width: number;

  @IsNumber()
  @Min(1)
  height: number;
}
