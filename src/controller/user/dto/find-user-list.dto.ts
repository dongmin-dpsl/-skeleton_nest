import { IsNumber, Max, Min } from 'class-validator';

export class FindUserListDto {
  @IsNumber()
  @Min(0)
  from: number;

  @Min(1)
  @Max(100)
  size: number;
}
