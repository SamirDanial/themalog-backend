import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Prisma, Temperature } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { TemperatureGateway } from './temperature.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TemperatureService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly gateway: TemperatureGateway,
  ) {}

  async findAll() {
    return await this.databaseService.temperature.findMany();
  }

  async findByTimeRange(start: Date, end: Date) {
    const results = await this.databaseService.temperature.groupBy({
      by: ['sensor_id'],
      where: {
        timestamp: {
          gte: start,
          lte: end,
        },
      },
      _min: {
        temperature: true,
      },
      _max: {
        temperature: true,
      },
      _avg: {
        temperature: true,
      },
    });

    results.sort((a, b) => {
      const getNumberFromSensorId = (sensorId: string) => {
        const match = sensorId.match(/\d+$/); // Extracts digits at the end
        return match ? parseInt(match[0], 10) : 0;
      };

      return (
        getNumberFromSensorId(a.sensor_id) - getNumberFromSensorId(b.sensor_id)
      );
    });

    return results;
  }

  async create(data: Prisma.TemperatureCreateInput): Promise<Temperature> {
    const newTemperature = await this.databaseService.temperature.create({
      data,
    });

    // Emit the new temperature update
    this.gateway.emitTemperatureUpdate(newTemperature);

    return newTemperature;
  }

  @Cron('*/2 * * * * *') // Runs every 2 seconds
  async handleCron() {
    const randomTemperatureData: Prisma.TemperatureCreateInput = {
      timestamp: new Date(),
      temperature: Math.floor(Math.random() * (100 - 5 + 1)) + 5, // Random number between 5 and 100
      sensor_id: (Math.floor(Math.random() * 100) + 1).toString(), // Random number between 1 and 100
    };

    await this.create(randomTemperatureData);
  }
}
