import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FarmaceuticoLoginDTO } from 'src/farmaceutico/dto/farmaceutico-login.dto';
import { FarmaceuticoService } from 'src/farmaceutico/service/farmaceutico.service';
import { TokenService } from 'src/token/service/token.service';

@Injectable()
export class AuthService {

    constructor(
      private adminService: FarmaceuticoService,
      private jwtService: JwtService,
      private tokenService: TokenService) {}

    async validateUser(crfCnpj: string, pass: string): Promise<any> {
      const admin = await this.adminService.pegarFarmaceutico(crfCnpj.substring(14, crfCnpj.length), crfCnpj.substring(0, 14));
      if (admin && admin.password === pass) {
        const { password, ...result } = admin;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const payload = { username: user.crf, sub: user.userId };
      const token = this.jwtService.sign(payload);
      this.tokenService.salvarToken(token, user.crf)
      return {
        access_token: token,
      };
    }

}
