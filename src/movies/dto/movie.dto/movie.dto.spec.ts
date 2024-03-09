import { MovieDto } from './movie.dto';

describe('MovieDto', () => {
  it('should be defined', () => {
    expect(new MovieDto()).toBeDefined();
  });
});
