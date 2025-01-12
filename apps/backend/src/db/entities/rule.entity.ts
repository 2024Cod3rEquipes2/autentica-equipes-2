import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Rule {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
