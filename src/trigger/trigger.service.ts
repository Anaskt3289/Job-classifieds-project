import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TriggerService {
  constructor(
    private readonly httpService: HttpService
  ){}
  // @Cron('*/10 * * * *') // Runs every 10 minutes
  // handleCron() {
  //   firstValueFrom(
  //     this.httpService.get(`${process.env.OWN_SERVER_ALTERNATE_URL}/trigger/server/status`)
  //   ).then((response)=>{
  //     console.log('Cron job executed to keep server status :', response);
  //   }).catch((err)=>{
  //     console.log(`Error on cron to get server status ::`,err);
  //   })
  // }

  async getTriggerStatus() {
    return {
      Status: 1,
      message: 'Success'
    };
  }
}

