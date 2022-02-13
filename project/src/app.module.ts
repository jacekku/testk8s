import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomWordModule } from './randomWord/randomWord.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { env } from 'process';

@Module({
  imports: [
    RandomWordModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB_NAME}`,
      {
        auth: {
          username: env.MONGO_USER,
          password: env.MONGO_PASS,
        },
        authSource: env.MONGO_AUTH_SOURCE,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
