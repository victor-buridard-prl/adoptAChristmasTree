import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public treeId: number;

  @Column()
  public price: number;

  @Column()
  public createdAt: Date;

  @Column({ default: 'ONGOING' })
  public status: string;
}
