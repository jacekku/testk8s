import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { RandomWordService } from './randomWord.service';
import { Cache } from 'cache-manager';

@Controller('randomWord')
export class RandomWordController {
  constructor(
    private readonly randomWordService: RandomWordService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getRandomWord() {
    let value = await this.cacheManager.get('random-word');
    if (value) {
      return {
        data: value,
        loadsFrom: 'redis cache',
      };
    }
    value = await this.randomWordService.getRandomWord();
    await this.cacheManager.set('random-word', value, { ttl: 10 });
    return {
      data: value,
      loadsFrom: 'mongo database',
    };
  }
}
