import { forwardRef, Module } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';
import { DatabaseService } from 'src/database/database.service';
import { TemperatureGateway } from './temperature.gateway';

@Module({
  providers: [TemperatureService, DatabaseService, TemperatureGateway],
  controllers: [TemperatureController],
})
export class TemperatureModule {}
