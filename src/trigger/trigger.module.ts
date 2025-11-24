import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TriggerController } from './trigger.controller';
import { TriggerService } from './trigger.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [TriggerController],
  providers: [TriggerService],
})
export class TriggerModule {}

