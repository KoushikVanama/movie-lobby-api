import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './movies.schema';
import { MovieDto } from './dto/movie.dto';

interface MovieQuery {
  title?: string;
  genre?: string;
}

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.movieModel.find().exec();
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
    const createdMovie = new this.movieModel(movieDto);
    return createdMovie.save();
  }

  async updateMovie(id: string, movieDto: MovieDto): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, movieDto, { new: true });
  }

  async deleteMovie(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndDelete(id);
  }
}
