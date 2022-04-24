import { Bus as BusEntity } from 'src/entities/bus.entity';
import { Bus as BusModel } from 'src/models/bus.model';

export class BusFabric {
  static toModel(bus: BusEntity): BusModel {
    return {
      id: bus.id,
      ident: bus.ident,
      speed: bus.speed,
      lon: bus.lon,
      lat: bus.lat,
      server_timestamp: bus.server_timestamp,
      device_timestamp: bus.device_timestamp,
      direction: bus.direction,
    };
  }

  static toEntity(bus: BusModel): BusEntity {
    return {
      id: bus.id,
      ident: bus.ident,
      speed: bus.speed,
      lon: bus.lon,
      lat: bus.lat,
      server_timestamp: bus.server_timestamp,
      device_timestamp: bus.device_timestamp,
      direction: bus.direction,
    };
  }
}
