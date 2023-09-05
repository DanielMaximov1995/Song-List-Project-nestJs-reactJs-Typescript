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

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async getAllSongs() {
    try {
      const isEmpty = await this.songsService.isSongTableEmpty();
      if (isEmpty) {
        await this.songsService.importDataFromCSV('src/utils/files/Song_list.csv');
      }
      const data = await this.songsService.getSongs();
      return data;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error getting songs data');
    }
  }

  @Get(':id')
  async getSongById(@Param('id', ParseIntPipe) id: number) {
    try {
      const getSong = await this.songsService.getSong(id);
      return getSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error getting the song');
    }
  }

  @Post()
  async createSong(@Body() createSongDto: CreateSongDto) {
    try {
      const createdSong = await this.songsService.createSong(createSongDto);
      return createdSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error creating the song');
    }
  }

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