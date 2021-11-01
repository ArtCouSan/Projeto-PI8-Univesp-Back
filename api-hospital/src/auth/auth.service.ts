import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/service/admin.service';
import { TokenService } from 'src/token/service/token.service';

@Injectable()
export class AuthService {

    constructor(
      private adminService: AdminService,
      private jwtService: JwtService,
      private tokenService: TokenService) {}

    async validateUser(cnpj: string, pass: string): Promise<any> {
      const admin = await this.adminService.pegarAdmin(cnpj);
      if (admin && admin.password === pass) {
        const { password, ...result } = admin;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const payload = { username: user.cnpj, sub: user.userId };
      const token = this.jwtService.sign(payload);
      this.tokenService.salvarToken(token, user.cnpj)
      return {
        access_token: token,
      };
    }

}
