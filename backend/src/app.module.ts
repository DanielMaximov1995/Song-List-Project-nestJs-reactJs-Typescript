import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsModule } from './songs/songs.module';
import databaseConfig from "./utils/dbConfig";
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    SongsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
