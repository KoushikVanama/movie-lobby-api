import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { Movie, MovieDocument } from './movies.schema';
import { Model } from 'mongoose';

describe('MoviesService', () => {
  let service: MoviesService;
  let mockMovieModel: Model<MovieDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    mockMovieModel = module.get<Model<MovieDocument>>(
      getModelToken(Movie.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array of movies', async () => {
      const movies: Movie[] = [
        {
          title: 'abc',
          genre: 'comedy',
          rating: 1,
          streamingLink: 'https://www.abc.com',
        },
      ];
      jest.spyOn(mockMovieModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(movies),
      } as any);

      expect(await service.getAllMovies()).toEqual(movies);
    });
  });

  describe('createMovie', () => {
    it('should create a new movie', async () => {
      const newMovieDto: MovieDto = {
        title: 'New Movie',
        genre: 'Comedy',
        rating: 1,
        streamingLink: 'https://www.abc.com',
      };
      const createdMovie: Movie = { _id: '1', ...newMovieDto } as any;
      (mockMovieModel.create as jest.Mock).mockResolvedValueOnce(createdMovie);
      const result = await service.createMovie(newMovieDto);

      expect(result).toEqual(createdMovie);
    });
  });
});
