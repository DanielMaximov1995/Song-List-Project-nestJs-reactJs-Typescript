import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Song } from "../../typeorm/entities/Song";
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { CreateSongDto, UpdateSongDto } from "../../dtos/Song.dto";

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Song) private readonly songRepository: Repository<Song>) {};

  async getSongs(): Promise<Song[]> {
    try {
      const songs = await this.songRepository.find();
      return songs.sort((a, b) => a.band.localeCompare(b.band));
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error fetching songs');
    }
  }

  async getSong(id: number): Promise<Song> {
    try {
      const song = await this.songRepository.findOneById(id);
      if (!song) {
        throw new NotFoundException('Song not found');
      }
      return song;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error fetching song');
    }
  }

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    try {
      const { songName , band } = createSongDto
      const song = this.songRepository.create({...createSongDto , songName: songName.toLowerCase() , band : band.toLowerCase()});
      const createdSong = await this.songRepository.save(song);
      return createdSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error creating the song');
    }
  }

  async updateSong(id: number, updateSongDto: UpdateSongDto): Promise<Song | null> {
    try {
      const existingSong = await this.songRepository.findOneById(id);
      if (!existingSong) {
        return null;
      }

      existingSong.songName = updateSongDto.songName.toLowerCase() || existingSong.songName;
      existingSong.band = updateSongDto.band.toLowerCase() || existingSong.band;
      existingSong.year = updateSongDto.year || existingSong.year;

      const updatedSong = await this.songRepository.save(existingSong);
      return updatedSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error updating the song');
    }
  }

  async deleteSong(id: number): Promise<void> {
    try {
      const result = await this.songRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Song not found');
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error deleting the song');
    }
  }

  async isSongTableEmpty(): Promise<boolean> {
    try {
      const songsCount = await this.songRepository.count();
      return songsCount === 0;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error checking songs table');
    }
  }

  async importDataFromCSV(filePath: string): Promise<void> {
    try {
      const results = [];

      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', async () => {
          const songsToSave = results.map(row => {
            return {
              songName: (row['Song Name'] || '').toLowerCase(),
              band: (row['Band'] || '').toLowerCase(),
              year: parseInt(row['Year'], 10) || 0,
            };
          });

          await this.songRepository.save(songsToSave);
        });
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error importing data from CSV');
    }
  }
}
