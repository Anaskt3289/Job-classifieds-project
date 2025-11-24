import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TriggerController } from './trigger.controller';
import { TriggerService } from './trigger.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [TriggerController],
  providers: [TriggerService],
})
export class TriggerModule {}

