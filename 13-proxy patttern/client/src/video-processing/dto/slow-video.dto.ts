import { IsUUID, IsNumber, Min, Max } from 'class-validator';

export class SlowVideoDto {
  @IsUUID()
  videoId: string;

  @IsNumber()
  @Min(0.1)
  @Max(1)
  factor: number; // e.g., 0.5 = half speed
}
