import { Controller, Get } from '@nestjs/common';
import { Bus as BusEntity } from 'src/entities/bus.entity';
import { Bus as BusModel } from 'src/models/bus.model';
import { logger } from 'src/services/logger.service';
import { BusesService } from './bus.service';
import { BusDirection } from './bus.types';

@Controller('bus')
export class BusController {
  private readonly tableName: string = 'atlas_table';

  constructor(private readonly service: BusesService) {}

  getBusDirections(ident: string): Promise<BusModel[]> {
    try {
      const directions = this.service.getByIdent(ident);

      return directions;
    } catch (error) {
      logger(error);
      throw new Error('Something happen');
    }
  }

  @Get()
  async getDirections(): Promise<{ status: string; payload: BusDirection[] }> {
    const buses = await this.service.query(
      `select distinct ident from ${this.tableName}`,
    );

    const busWithDirectionsPromises = buses.map(async (bus) => {
      const directions = await this.getBusDirections(bus.ident);
      const moveDirections = directions.filter(
        (direction) => direction.lat && direction.lon,
      );
      const orderDirections = moveDirections.sort((a, b) => {
        return (
          new Date(a.device_timestamp).getTime() -
          new Date(b.device_timestamp).getTime()
        );
      });

      return {
        ident: bus.ident,
        directions: orderDirections,
      };
    });

    const busWithDirections = await Promise.all(busWithDirectionsPromises);

    return {
      status: 'success',
      payload: busWithDirections,
    };
  }
}
