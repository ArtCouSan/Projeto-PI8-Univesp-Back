import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HospitalService } from 'src/hospital/service/hospital.service';
import { TokenService } from 'src/token/service/token.service';

@Injectable()
export class AuthService {

    constructor(
      private adminService: HospitalService,
      private jwtService: JwtService) {}

    async validateUser(cnpj: string, pass: string): Promise<any> {
      const admin = await this.adminService.pegarHospital(cnpj);
      if (admin && admin.password === pass) {
        const { password, ...result } = admin;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const payload = { username: user.cnpj, sub: user.userId };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
      };
    }

}
