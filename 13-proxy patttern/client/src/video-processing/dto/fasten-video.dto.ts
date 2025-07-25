import { IsUUID, IsNumber, Min } from 'class-validator';

export class FastenVideoDto {
  @IsUUID()
  videoId: string;

  @IsNumber()
  @Min(1)
  factor: number; // e.g., 2 = double speed
}
