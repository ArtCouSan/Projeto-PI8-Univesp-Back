import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PacienteService } from 'src/paciente/service/paciente.service';
import { TokenService } from 'src/token/service/token.service';

@Injectable()
export class AuthService {

    constructor(
      private adminService: PacienteService,
      private jwtService: JwtService) {}

    async validateUser(cpf: string, pass: string): Promise<any> {
      const admin = await this.adminService.pegarPaciente(cpf);
      if (admin && admin.password === pass) {
        const { password, ...result } = admin;
        return result;
      }
      return null;
    }

    async login(user: any) {
      const payload = { username: user.cpf, sub: user.userId };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
      };
    }

}
