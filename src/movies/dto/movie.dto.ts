import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  streamingLink: string;
}
