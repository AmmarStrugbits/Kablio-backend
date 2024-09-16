import { Module } from '@nestjs/common';
import { PreregisterService } from './preregister.service';
import { PreregisterController } from './preregister.controller';
import { PreRegisterEntity } from '@app/database/entities/PreRegister.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([PreRegisterEntity])],
  providers: [PreregisterService],
  controllers: [PreregisterController],
})
export class PreregisterModule {}
