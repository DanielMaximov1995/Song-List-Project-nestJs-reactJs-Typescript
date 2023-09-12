"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Song_1 = require("../../typeorm/entities/Song");
const fs = require("fs");
const csvParser = require("csv-parser");
let SongsService = class SongsService {
    constructor(songRepository) {
        this.songRepository = songRepository;
    }
    ;
    async getSongs() {
        try {
            const songs = await this.songRepository.find();
            return songs.sort((a, b) => a.band.localeCompare(b.band));
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error fetching songs');
        }
    }
    async getSong(id) {
        try {
            const song = await this.songRepository.findOneById(id);
            if (!song) {
                throw new common_1.NotFoundException('Song not found');
            }
            return song;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error fetching song');
        }
    }
    async createSong(createSongDto) {
        try {
            const { songName, band } = createSongDto;
            const song = this.songRepository.create({ ...createSongDto, songName: songName.toLowerCase(), band: band.toLowerCase() });
            const createdSong = await this.songRepository.save(song);
            return createdSong;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error creating the song');
        }
    }
    async updateSong(id, updateSongDto) {
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
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error updating the song');
        }
    }
    async deleteSong(id) {
        try {
            const result = await this.songRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException('Song not found');
            }
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error deleting the song');
        }
    }
    async isSongTableEmpty() {
        try {
            const songsCount = await this.songRepository.count();
            return songsCount === 0;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error checking songs table');
        }
    }
    async importDataFromCSV(filePath) {
        try {
            const results = [];
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
                await this.songRepository.save(songsToSave);
            });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error importing data from CSV');
        }
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Song_1.Song)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SongsService);
//# sourceMappingURL=songs.service.js.map