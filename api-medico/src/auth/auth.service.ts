import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MedicoService } from 'src/medico/service/medico.service';
import { TokenService } from 'src/token/service/token.service';

@Injectable()
export class AuthService {

    constructor(
      private adminService: MedicoService,
      private jwtService: JwtService) {}

    async validateUser(crmCnpj: string, pass: string): Promise<any> {
      const admin = await this.adminService.pegarMedico(crmCnpj.substring(14, crmCnpj.length), crmCnpj.substring(0, 14));
      if (admin && admin.password === pass) {
        const { password, ...result } = admin;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const payload = { username: user.crm, sub: user.userId };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
      };
    }

}
