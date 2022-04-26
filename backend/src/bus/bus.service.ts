import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus as BusEntity } from 'src/entities/bus.entity';
import { BusFabric } from 'src/fabrics/bus.fabric';
import { Bus as BusModel } from 'src/models/bus.model';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(BusEntity)
    private busesRepository: Repository<BusEntity>,
  ) {}

  async findAll(): Promise<BusModel[]> {
    const buses = await this.busesRepository.find();
    return buses.map(BusFabric.toModel);
  }

  async findOne(id: string): Promise<BusModel> {
    const busEntity = await this.busesRepository.findOne(id);

    return BusFabric.toModel(busEntity);
  }

  async query(query: string): Promise<BusModel[]> {
    // TODO: Be sure that some fields in entity can be undefined
    // because we're can provide some select conditions
    const buses = (await this.busesRepository.query(query)) as BusModel[];
    return buses.map(BusFabric.toModel);
  }

  async remove(id: string): Promise<void> {
    await this.busesRepository.delete(id);
  }

  async getByIdent(ident: string): Promise<BusModel[]> {
    const buses = await this.busesRepository.find({ ident });
    return buses.map(BusFabric.toModel);
  }

  async getAllIdent(): Promise<BusModel[]> {
    const ident = await this.busesRepository
      .createQueryBuilder('bus')
      .select('ident')
      .distinct()
      .getRawMany();

    return ident
  }
}
