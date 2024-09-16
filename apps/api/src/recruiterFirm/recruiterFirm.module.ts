import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RecruiterFirmEntity } from '@app/database/entities/RecruiterFirm.entity';
import { RecruiterFirmController } from '@api/recruiterFirm/recruiterFirm.controller';
import { RecruiterFirmService } from '@api/recruiterFirm/recruiterFirm.service';
import { JobPostEntity } from '@app/database';
import { StorageModule } from '@app/storage';

@Module({
  imports: [
    MikroOrmModule.forFeature([RecruiterFirmEntity, JobPostEntity]),
    StorageModule,
  ],
  controllers: [RecruiterFirmController],
  providers: [RecruiterFirmService],
})
export class RecruiterFirmModule {}
