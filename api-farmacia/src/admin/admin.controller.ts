import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminDTO } from './dto/admin.dto';
import { AdminService } from './service/admin.service';


@Controller('api/v1/farmacia/admin')
export class AdminController {

    constructor(private adminService: AdminService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
      return req.user;
    }
  

    @Post()
    async criarAdmin(@Body() adminDTO: AdminDTO) {
      const admin = await this.adminService.criarAdmin(adminDTO);
      return JSON.parse(JSON.stringify(admin));
    }
  
    @Get(":cpf")
    async pegarAdmin(@Param('cpf') cpf: string) {
      const admin = await this.adminService.pegarAdmin(cpf);
      return JSON.parse(JSON.stringify(admin));
    }
}
