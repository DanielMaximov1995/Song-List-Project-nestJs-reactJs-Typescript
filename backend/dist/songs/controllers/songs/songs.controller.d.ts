import { SongsService } from "../../services/songs.service";
import { CreateSongDto, UpdateSongDto } from "../../../dtos/Song.dto";
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    getAllSongs(): Promise<import("../../../typeorm/entities/Song").Song[]>;
    getSongById(id: number): Promise<import("../../../typeorm/entities/Song").Song>;
    createSong(createSongDto: CreateSongDto): Promise<import("../../../typeorm/entities/Song").Song>;
    updateSong(id: number, updateSongDto: UpdateSongDto): Promise<import("../../../typeorm/entities/Song").Song>;
    deleteById(id: number): Promise<string>;
}
