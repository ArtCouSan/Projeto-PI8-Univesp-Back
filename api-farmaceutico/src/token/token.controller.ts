import { Body, Controller, Put } from '@nestjs/common';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { TokenService } from './service/token.service';

@Controller('api/v1/farmaceutico/token')
export class TokenController {

  constructor(private tokenService: TokenService){}

  @Put('refresh')
  async refreshToken(@Body() refreshToken: RefreshTokenDTO) {
    return await this.tokenService.refreshToken(refreshToken.oldToken);
  }

}

