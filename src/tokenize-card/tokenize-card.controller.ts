import { Body, Controller, Post } from '@nestjs/common';
import { TokenizeCardService } from './tokenize-card.service';
import { CardDataDto } from './dto/card-data.dto';

@Controller('tokenizecard')
export class TokenizeCardController {

    constructor (private readonly tokenizerCardService: TokenizeCardService){}
    
    @Post()
    async postTokenizerCard(@Body() carDataDto :CardDataDto){
        return this.tokenizerCardService.tokenizeCard(carDataDto);
    }
}
