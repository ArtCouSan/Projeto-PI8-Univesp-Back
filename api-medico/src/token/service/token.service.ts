import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { MedicoService } from 'src/medico/service/medico.service';
import { TokenMedicoRepository } from '../repo/token.repo';

@Injectable()
export class TokenService {

    constructor(private readonly tokenRepo: TokenMedicoRepository,
         private readonly adminService: MedicoService,
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
            const admin = await this.adminService.pegarMedico(token.crm, token.cnpjHospital);
            return this.authService.login(admin);
        } else {
            throw new UnauthorizedException();
        }
    }

}
