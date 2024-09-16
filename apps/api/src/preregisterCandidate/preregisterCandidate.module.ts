import { Module } from '@nestjs/common';
import { PreregisterCandidateService } from './preregisterCandidate.service';
import { PreregisterCandidateController } from './preregisterCandidate.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PreRegisterCandidateEntity } from '@app/database/entities/PreRegisterCandidate.entity';

@Module({
  imports: [MikroOrmModule.forFeature([PreRegisterCandidateEntity])],
  providers: [PreregisterCandidateService],
  controllers: [PreregisterCandidateController],
})
export class PreregisterCandidateModule {}
