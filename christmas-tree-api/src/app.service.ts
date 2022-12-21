import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation.entity';
import { Tree } from 'src/tree.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Tree)
    private treeRepository: Repository<Tree>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getTrees() {
    return this.treeRepository.find();
  }

  getTreeById(treeId: number) {
    return this.treeRepository.findOne({ where: { id: treeId } });
  }

  async createReservation(treeId: number) {
    const tree = await this.getTreeById(treeId);

    if (tree.status === 'RESERVED') {
      throw new HttpException('Tree already reserved', 400);
    }

    await this.reservationRepository.save({
      treeId,
      price: tree.price,
      createdAt: new Date(),
    });

    await this.treeRepository.update({ id: treeId }, { status: 'RESERVED' });
  }

  async updateReservationStatus(status: string, treeId: number) {
    if (status !== 'CANCELLED') {
      throw new HttpException('Unexpected reservation status', 400);
    }
    if (treeId === undefined) {
      throw new HttpException('Undefined treeId', 400);
    }
    await this.reservationRepository.update(
      { treeId },
      {
        status,
      },
    );
    await this.treeRepository.update({ id: treeId }, { status: 'AVAILABLE' });
  }

  async getReservations() {
    const trees = await this.getTrees();
    const reservations = await this.reservationRepository.find({
      where: {
        status: 'ONGOING',
      },
    });

    return reservations.map((reservation) => {
      return {
        ...reservation,
        name: trees.find((tree) => tree.id === reservation.treeId).name,
      };
    });
  }
}
