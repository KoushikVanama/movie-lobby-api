 
# Steps to setup the application:

- npm i -g @nestjs/cli
- nest new movie-lobby-api
- cd movie-lobby-api
- npm install --save @nestjs/mongoose mongoose

- Run these commands so as to generate files required for movies module
  - nest generate module movies
  - nest generate controller movies
  - nest generate service movies
  - nest generate class movies/dto/movie.dto
