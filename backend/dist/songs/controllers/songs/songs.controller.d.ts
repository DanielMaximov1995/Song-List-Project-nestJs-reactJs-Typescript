import { SongsService } from "../../services/songs.service";
import { CreateSongDto, UpdateSongDto } from "../../../dtos/Song.dto";
import { Song } from "src/typeorm/entities/Song";
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    getAllSongs(): Promise<Song[]>;
    getSongById(id: number): Promise<Song>;
    createSong(createSongDto: CreateSongDto): Promise<Song>;
    updateSong(id: number, updateSongDto: UpdateSongDto): Promise<Song>;
    deleteById(id: number): Promise<string>;
}
