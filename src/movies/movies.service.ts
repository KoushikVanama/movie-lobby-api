import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './movies.schema';
import { MovieDto } from './dto/movie.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

interface MovieQuery {
  title?: string;
  genre?: string;
}

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    const cachedMovies = await this.cacheManager.get<Movie[]>('movies');
    if (cachedMovies) {
      console.log(cachedMovies);
      return cachedMovies;
    }
    const movies = await this.movieModel.find().exec();
    await this.cacheManager.set('movies', movies, 300000);
    return movies;
  }

  async searchMovie(title: string, genre: string): Promise<Movie[]> {
    console.log(title, genre);
    const query: MovieQuery = {};
    if (title) {
      query.title = title;
    }
    if (genre) {
      query.genre = genre;
    }
    return this.movieModel.find(query).exec();
  }

  async createMovie(movieDto: MovieDto): Promise<Movie> {
    const createdMovie = this.movieModel.create(movieDto);
    await this.cacheManager.del('movies');
    return createdMovie;
  }

  async updateMovie(id: string, movieDto: MovieDto): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, movieDto, { new: true });
  }

  async deleteMovie(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndDelete(id);
  }
}
