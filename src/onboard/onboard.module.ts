import { Module } from '@nestjs/common';
import { OnboardController } from './onboard.controller';
import { OnboardService } from './onboard.service';
import { OnboardRepository } from './onboard.repository';
import { User, UserSchema } from './schemas/onboard.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  controllers: [OnboardController],
  providers: [OnboardService, OnboardRepository],
})
export class OnboardModule {}
