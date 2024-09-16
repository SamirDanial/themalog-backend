import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TemperatureService } from './temperature.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle } from '@nestjs/throttler';
import { getEndOfMonth, getStartOfMonth } from '../core/utilities';
import { AuthGuard } from '../auth/auth.guard';
import { TemperatureGateway } from './temperature.gateway'; // Import the gateway

@Controller('temperatures')
export class TemperatureController {
  constructor(
    private readonly temperatureService: TemperatureService,
    private readonly temperatureGateway: TemperatureGateway, // Inject the gateway
  ) {}

  @SkipThrottle()
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('start') start: string, @Query('end') end: string) {
    const now = new Date();

    const startDate = start ? new Date(start) : getStartOfMonth(now);
    const endDate = end ? new Date(end) : getEndOfMonth(now);
    return this.temperatureService.findByTimeRange(startDate, endDate);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() temperatureData: Prisma.TemperatureCreateInput) {
    const newTemperature =
      await this.temperatureService.create(temperatureData);

    // Emit a WebSocket event with the new temperature entry
    this.temperatureGateway.emitTemperatureUpdate(newTemperature);

    return newTemperature;
  }
}
