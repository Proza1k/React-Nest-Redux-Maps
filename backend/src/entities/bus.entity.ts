import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  ident: string;

  @Column({ default: null })
  speed: string;

  @Column({ default: null })
  lon: string;

  @Column({ default: null })
  lat: string;

  @Column({ default: null })
  server_timestamp: string;

  @Column({ default: null })
  device_timestamp: string;

  @Column({ default: null })
  direction: string;
}
