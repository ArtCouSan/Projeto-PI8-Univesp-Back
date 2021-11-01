import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/service/admin.service';
import { AuthService } from 'src/auth/auth.service';
import { TokenFarmaciaRepository } from '../repo/token.repo';

@Injectable()
export class TokenService {

    constructor(private readonly tokenRepo: TokenFarmaciaRepository,
         private readonly adminService: AdminService,
         @Inject(forwardRef(() => AuthService))
         private readonly authService: AuthService) { }

    public async salvarToken(hash: string, username: string) {
        const tokenFinded = await this.tokenRepo.findOne({
            where: {
                username: username
            }
        });
        console.log(tokenFinded.id);
        if (tokenFinded) {
            this.tokenRepo.update(tokenFinded.id, {
                hash: hash
            });
        } else {
            this.tokenRepo.save({
                hash: hash,
                username: username
            });
        }
    }

    public async refreshToken(oldToken: string) {
        const token = await this.tokenRepo.findOne({
            where: {
                hash: oldToken
            }
        });
        if (token) {
            const admin = await this.adminService.pegarAdmin(token.username);
            return this.authService.login(admin);
        } else {
            throw new UnauthorizedException();
        }
    }

}
