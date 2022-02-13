import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RandomWord, RandomWordDocument } from './randomWord.schema';
import { Model } from 'mongoose';

@Injectable()
export class RandomWordService {
  constructor(
    @InjectModel(RandomWord.name)
    private readonly randomWordModel: Model<RandomWordDocument>,
  ) {}

  async getRandomWord() {
    const count = await this.randomWordModel.count().exec();
    const random = Math.floor(Math.random() * count);
    return await this.randomWordModel.findOne().skip(random).exec();
  }
}
