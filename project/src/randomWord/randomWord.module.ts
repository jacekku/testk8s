import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RandomWordController } from './randomWord.controller';
import { RandomWord, RandomWordSchema } from './randomWord.schema';
import { RandomWordService } from './randomWord.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RandomWord.name, schema: RandomWordSchema },
    ]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 10,
      }),
    }),
  ],
  controllers: [RandomWordController],
  providers: [RandomWordService],
})
export class RandomWordModule {}
