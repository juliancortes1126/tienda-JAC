import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TokenizeCardService {

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    
    async tokenizeCard(carData: any): Promise<any> {
    
        const externalUrl = `${this.configService.get<string>('BASE_URL_WOMPI')}/tokens/cards` ;
        const token = this.configService.get<string>('PUBLIC_KEY'); 


        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          };
      
          const response = await firstValueFrom(
            this.httpService.post(externalUrl, carData, { headers }),
          );
      
          return response.data;
      }
}
