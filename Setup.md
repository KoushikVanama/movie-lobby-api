 
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


# steps to setup swagger
  - npm install --save @nestjs/swagger swagger-ui-express

# steps to connect to Mongo Atlas
  - Install mongodb package to connect to mongo driver using this command `npm install mongodb`
  - Update your own credentials and cluster name inorder to connect to mongo database in `app.module.ts` file

