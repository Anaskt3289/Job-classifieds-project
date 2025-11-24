import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OnboardModule } from './onboard/onboard.module';
import { JobModule } from './Jobs/job.module';
import { TriggerModule } from './trigger/trigger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongo_url'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),

    OnboardModule,
    JobModule,
    TriggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}