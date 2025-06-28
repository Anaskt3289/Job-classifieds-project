import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobRepository } from './job.repository';
import { Jobs, JobSchema } from './schemas/job.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name:Jobs.name, schema:JobSchema}])],
  controllers: [JobController],
  providers: [JobService, JobRepository],
})
export class JobModule {}
