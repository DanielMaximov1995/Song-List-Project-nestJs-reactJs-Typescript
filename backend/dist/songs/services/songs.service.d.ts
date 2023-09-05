import { Repository } from "typeorm";
import { Song } from "../../typeorm/entities/Song";
import { CreateSongDto, UpdateSongDto } from "../../dtos/Song.dto";
export declare class SongsService {
    private readonly songRepository;
    constructor(songRepository: Repository<Song>);
    getSongs(): Promise<Song[]>;
    getSong(id: number): Promise<Song>;
    createSong(createSongDto: CreateSongDto): Promise<Song>;
    updateSong(id: number, updateSongDto: UpdateSongDto): Promise<Song | null>;
    deleteSong(id: number): Promise<void>;
    isSongTableEmpty(): Promise<boolean>;
    importDataFromCSV(filePath: string): Promise<void>;
}
