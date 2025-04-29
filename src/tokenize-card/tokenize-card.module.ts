import { Module } from '@nestjs/common';
import { TokenizeCardController } from './tokenize-card.controller';
import { TokenizeCardService } from './tokenize-card.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [TokenizeCardController],
  providers: [TokenizeCardService]
})
export class TokenizeCardModule {}
