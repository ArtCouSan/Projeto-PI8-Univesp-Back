import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FarmaciaService } from 'src/farmacia/service/farmacia.service';
import { TokenFarmaciaRepository } from '../repo/token.repo';

@Injectable()
export class TokenService {

    constructor(private readonly tokenRepo: TokenFarmaciaRepository,
         private readonly adminService: FarmaciaService,
         @Inject(forwardRef(() => AuthService))
         private readonly authService: AuthService) { }

    public async salvarToken(hash: string, username: string) {
        const tokenFinded = await this.tokenRepo.findOne({
            where: {
                username: username
            }
        }).catch(error => {
            console.log(error)
        });
        
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
            const admin = await this.adminService.pegarFarmacia(token.username);
            return this.authService.login(admin);
        } else {
            throw new UnauthorizedException();
        }
    }

}
