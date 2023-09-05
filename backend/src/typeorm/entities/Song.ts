import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'songs' })

export class Song {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  songName : string;

  @Column()
  band : string;

  @Column()
  year : number;
}