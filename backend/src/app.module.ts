import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusController } from './bus/bus.controller';
import { BusesModule } from './bus/bus.module';
import { BusesService } from './bus/bus.service';
import { ConfigModule } from '@nestjs/config';
import { Bus } from './entities/bus.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Bus],
      synchronize: true,
    }),
    BusesModule,
  ],
  controllers: [AppController, BusController],
  providers: [AppService, BusesService],
})
export class AppModule {}
