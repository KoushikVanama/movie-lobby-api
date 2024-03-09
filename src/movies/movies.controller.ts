import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './movies.schema';
import { ApiQuery } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }

  @Get('search')
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'genre', required: false })
  async searchMovie(
    @Query('title') title?: string,
    @Query('genre') genre?: string,
  ): Promise<Movie[]> {
    return this.moviesService.searchMovie(title, genre);
  }

  @Post()
  async createMovie(@Body() movieDto: MovieDto): Promise<Movie> {
    return this.moviesService.createMovie(movieDto);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() movieDto: MovieDto,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, movieDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.deleteMovie(id);
  }
}
