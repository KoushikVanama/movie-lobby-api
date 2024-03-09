
## Installation

clone the application using this command `git clone git@github.com:KoushikVanama/movie-lobby-api.git `

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

 
## Steps to setup the application:

- `npm i -g @nestjs/cli`
- `nest new movie-lobby-api`
- `cd movie-lobby-api`
- `npm install --save @nestjs/mongoose mongoose`

- Run these commands so as to generate files required for movies module
  - `nest generate module movies`
  - `nest generate controller movies`
  - `nest generate service movies`
  - `nest generate class movies/dto/movie.dto`


## steps to setup swagger
  - npm install --save @nestjs/swagger swagger-ui-express
  - Add below configuration in your `main.ts` file
    <code>
      const options = new DocumentBuilder()<br />
      .setTitle('Your API Title')<br />
      .setDescription('Your API description')<br />
      .setVersion('1.0')<br />
      .addServer('http://localhost:3000/', 'Local environment')<br />
      .addServer('https://staging.yourapi.com/', 'Staging')<br />
      .addServer('https://production.yourapi.com/', 'Production')<br />
      .addTag('Your API Tag')<br />
      .build();<br />

    const document = SwaggerModule.createDocument(app, options);<br />
    SwaggerModule.setup('api-docs', app, document);<br />
    <code>
  - Now you can access swagger at [http://localhost:3000/api-docs]

## steps to connect to Mongo Atlas
  - Install mongodb package to connect to mongo driver using this command `npm install mongodb`
  - Update your own credentials and cluster name inorder to connect to mongo database in `app.module.ts` file

## Steps to include Caching
  - Install cache package using this command `npm install @nestjs/cache-manager cache-manager`


