import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusController } from './bus/bus.controller';
import { BusesModule } from './bus/bus.module';
import { BusesService } from './bus/bus.service';
import { Bus } from './entities/bus.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'node_user',
      password: 'Proza1k9305',
      database: 'node_database',
      entities: [Bus],
      synchronize: true,
    }),
    BusesModule,
  ],
  controllers: [AppController, BusController],
  providers: [AppService, BusesService],
})
export class AppModule {}
