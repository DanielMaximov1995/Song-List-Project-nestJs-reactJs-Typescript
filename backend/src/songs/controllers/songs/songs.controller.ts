import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException, NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { SongsService } from "../../services/songs.service";
import { CreateSongDto, UpdateSongDto } from "../../../dtos/Song.dto";
import { Song } from "src/typeorm/entities/Song";

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  // Route to retrieve all songs
  @Get()
  async getAllSongs(): Promise<Song[]> {
    try {
      // // Check if there are songs in the database
      // const isEmpty = await this.songsService.isSongTableEmpty();

      // if (isEmpty) {
      //   // If the database is empty, import data from CSV
      //   await this.songsService.importDataFromCSV('src/utils/files/Song_list.csv');
      // }

      // Get songs from the database
      const data = await this.songsService.getSongs();
      return data;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error getting songs data');
    }
  }

  // Route to retrieve a specific song by ID
  @Get(':id')
  async getSongById(@Param('id', ParseIntPipe) id: number) {
    try {
      const getSong = await this.songsService.getSong(id);
      return getSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error getting the song');
    }
  }

  // Route to create a new song
  @Post()
  async createSong(@Body() createSongDto: CreateSongDto) {
    try {
      const createdSong = await this.songsService.createSong(createSongDto);
      return createdSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error creating the song');
    }
  }

  // Route to update an existing song by id
  @Put(':id')
  async updateSong(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto
  ) {
    try {
      const updatedSong = await this.songsService.updateSong(id, updateSongDto);
      if (!updatedSong) {
        throw new NotFoundException('Song not found');
      }
      return updatedSong;
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'Error updating the song',
      );
    }
  }

  // Route to delete a specific song by id
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.songsService.deleteSong(id);
      return 'deleted';
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error deleting the song');
    }
  }
}
