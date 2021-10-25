import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/service/admin.service';

@Injectable()
export class AuthService {

    constructor(private adminService: AdminService) {}

    async validateUser(cpf: string, pass: string): Promise<any> {
      const admin = await this.adminService.pegarAdmin(cpf);
      if (admin && admin.password === pass) {
        const { password, ...result } = admin;
        return result;
      }
      return null;
    }


}
