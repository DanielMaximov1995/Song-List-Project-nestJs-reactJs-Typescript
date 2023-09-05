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
exports.SongsController = void 0;
const common_1 = require("@nestjs/common");
const songs_service_1 = require("../../services/songs.service");
const Song_dto_1 = require("../../../dtos/Song.dto");
let SongsController = class SongsController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    async getAllSongs() {
        try {
            const data = await this.songsService.getSongs();
            return data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error getting songs data');
        }
    }
    async getSongById(id) {
        try {
            const getSong = await this.songsService.getSong(id);
            return getSong;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error getting the song');
        }
    }
    async createSong(createSongDto) {
        try {
            const createdSong = await this.songsService.createSong(createSongDto);
            return createdSong;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error creating the song');
        }
    }
    async updateSong(id, updateSongDto) {
        try {
            const updatedSong = await this.songsService.updateSong(id, updateSongDto);
            if (!updatedSong) {
                throw new common_1.NotFoundException('Song not found');
            }
            return updatedSong;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error updating the song');
        }
    }
    async deleteById(id) {
        try {
            await this.songsService.deleteSong(id);
            return 'deleted';
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Error deleting the song');
        }
    }
};
exports.SongsController = SongsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getAllSongs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getSongById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Song_dto_1.CreateSongDto]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "createSong", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Song_dto_1.UpdateSongDto]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "updateSong", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "deleteById", null);
exports.SongsController = SongsController = __decorate([
    (0, common_1.Controller)('songs'),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongsController);
//# sourceMappingURL=songs.controller.js.map