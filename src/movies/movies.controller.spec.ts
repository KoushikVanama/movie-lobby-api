import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './movies.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return an array of movies', async () => {
      const movies: Movie[] = [
        {
          title: 'abc',
          genre: 'drama',
          rating: 1,
          streamingLink: 'https://www.abc.com',
        },
      ];
      jest.spyOn(service, 'getAllMovies').mockResolvedValueOnce(movies);
      expect(await controller.getAllMovies()).toEqual(movies);
    });
  });

  describe('createMovie', () => {
    it('should create a new movie', async () => {
      const newMovieDto: MovieDto = {
        title: 'bcd',
        genre: 'action',
        rating: 1,
        streamingLink: 'https://www.def.com',
      };
      const createdMovie: Movie = { _id: '1', ...newMovieDto } as any;
      jest.spyOn(service, 'createMovie').mockResolvedValueOnce(createdMovie);

      expect(await controller.createMovie(newMovieDto)).toEqual(createdMovie);
    });
  });
});
