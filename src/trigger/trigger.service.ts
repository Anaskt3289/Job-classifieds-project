import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TriggerService {
  @Cron('*/10 * * * *') // Runs every 10 minutes
  handleCron() {
    const result = this.getTriggerStatus();
    console.log('Cron job executed to keep server status :', result);
    return result;
  }

  getTriggerStatus() {
    return {
      Status: 1,
      message: 'Success'
    };
  }
}

