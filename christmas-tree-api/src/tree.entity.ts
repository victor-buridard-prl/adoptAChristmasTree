import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tree' })
export class Tree {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @Column()
  public sizeInCentimeters: number;

  @Column()
  public age: number;

  @Column({ default: 'AVAILABLE' })
  public status: string;

  @Column()
  public coordinate_x: number;

  @Column()
  public coordinate_y: number;
}
