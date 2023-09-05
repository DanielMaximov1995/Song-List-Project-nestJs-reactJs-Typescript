import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsModule } from './songs/songs.module';
import databaseConfig from "./utils/dbConfig";
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    SongsModule],
})

export class AppModule {}
