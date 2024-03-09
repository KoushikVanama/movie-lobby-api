import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://<username>:<password>@cluster0.2ggefdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      { retryAttempts: 3 },
    ),
    MoviesModule,
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
