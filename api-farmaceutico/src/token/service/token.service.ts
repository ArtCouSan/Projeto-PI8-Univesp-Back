import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FarmaceuticoService } from 'src/farmaceutico/service/farmaceutico.service';
import { TokenFarmaceuticoRepository } from '../repo/token.repo';

@Injectable()
export class TokenService {

    constructor(private readonly tokenRepo: TokenFarmaceuticoRepository,
         private readonly adminService: FarmaceuticoService,
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
            const admin = await this.adminService.pegarFarmaceutico(token.crf, token.cnpjFarmacia);
            return this.authService.login(admin);
        } else {
            throw new UnauthorizedException();
        }
    }

}
