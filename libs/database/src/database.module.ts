import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { validateDatabaseEnvironment } from '@app/database/environment/database.environment.validation';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RedisModule } from '@app/redis';
import { AwsModule } from '@app/aws';
import { StorageModule } from '@app/storage';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: validateDatabaseEnvironment,
    }),
    RedisModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule, RedisModule, LoggerModule],
      useClass: DatabaseService,
    }),
    StorageModule,
    AwsModule,
    LoggerModule,
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
