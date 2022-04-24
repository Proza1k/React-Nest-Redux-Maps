import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from 'src/entities/bus.entity';

import { BusController } from './bus.controller';
import { BusesService } from './bus.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],
  exports: [TypeOrmModule],
  providers: [BusesService],
  controllers: [BusController],
})
export class BusesModule {}
