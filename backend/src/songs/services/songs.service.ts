import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Song } from "../../typeorm/entities/Song";
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { CreateSongDto, UpdateSongDto } from "../../dtos/Song.dto";

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Song) private readonly songRepository: Repository<Song>) {};

  // Retrieve all songs from the database
  async getSongs(): Promise<Song[]> {
    try {
      const songs = await this.songRepository.find();
      // Sort the songs by band name
      return songs.sort((a, b) => a.band.localeCompare(b.band));
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error fetching songs');
    }
  }

  // Retrieve a specific song by id
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

  // Create a new song
  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    try {
      const { songName , band } = createSongDto;
      // Create a new song and save it to the database
      const song = this.songRepository.create({...createSongDto , songName: songName.toLowerCase() , band : band.toLowerCase()});
      const createdSong = await this.songRepository.save(song);
      return createdSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error creating the song');
    }
  }

  // Update an existing song by id
  async updateSong(id: number, updateSongDto: UpdateSongDto): Promise<Song | null> {
    try {
      const existingSong = await this.songRepository.findOneById(id);
      if (!existingSong) {
        return null; // Return null if the song is not found
      }

      // Update the song's attributes with the provided data
      existingSong.songName = updateSongDto.songName.toLowerCase() || existingSong.songName;
      existingSong.band = updateSongDto.band.toLowerCase() || existingSong.band;
      existingSong.year = updateSongDto.year || existingSong.year;

      // Save the updated song to the database
      const updatedSong = await this.songRepository.save(existingSong);
      return updatedSong;
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error updating the song');
    }
  }

  // Delete a specific song by id
  async deleteSong(id: number): Promise<void> {
    try {
      // Delete the song from the database and handle errors
      const result = await this.songRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Song not found');
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error deleting the song');
    }
  }

  // Check if the songs table is empty
  async isSongTableEmpty(): Promise<boolean> {
    try {
      const songsCount = await this.songRepository.count();
      return songsCount === 0; // Return true if the table is empty
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error checking songs table');
    }
  }

  // Import data from a CSV file into the database
  async importDataFromCSV(filePath: string): Promise<void> {
    try {
      const results = [];

      // Read and process data from the CSV file
      fs.createReadStream(filePath)
        .pipe(csvParser({ separator: ';' }))
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

          // Save the imported songs to the database
          await this.songRepository.save(songsToSave);
        });
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Error importing data from CSV');
    }
  }
}
