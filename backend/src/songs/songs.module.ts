import { Module } from '@nestjs/common';
import { SongsService } from './services/songs.service';
import { SongsController } from './controllers/songs/songs.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song } from "../typeorm/entities/Song";

@Module({
  imports : [TypeOrmModule.forFeature([Song])],
  providers: [SongsService],
  controllers: [SongsController]
})
export class SongsModule {}
