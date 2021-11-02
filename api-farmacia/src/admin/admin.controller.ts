import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { AdminDTO } from './dto/admin.dto';
import { AdminService } from './service/admin.service';


@Controller('api/v1/farmacia/admin')
export class AdminController {

    constructor(private adminService: AdminService, private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @Post()
    async criarAdmin(@Body() adminDTO: AdminDTO) {
      console.log(adminDTO);
      const admin = await this.adminService.criarAdmin(adminDTO);
      return JSON.parse(JSON.stringify(admin));
    }
  
    @Get(":cnpj")
    async pegarAdmin(@Param('cnpj') cnpj: string) {
      const admin = await this.adminService.pegarAdmin(cnpj);
      return JSON.parse(JSON.stringify(admin));
    }
}
