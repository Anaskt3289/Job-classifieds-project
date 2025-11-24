import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TriggerService } from './trigger.service';

@ApiTags('Trigger')
@Controller('trigger')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @Get()
  @ApiOperation({ summary: 'Get trigger status' })
  @ApiResponse({ status: 200, description: 'Returns success status' })
  getTriggerStatus() {
    return this.triggerService.getTriggerStatus();
  }
}

