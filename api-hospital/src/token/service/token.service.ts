import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { HospitalService } from 'src/hospital/service/hospital.service';
import { TokenHospitalRepository } from '../repo/token.repo';

@Injectable()
export class TokenService {

    constructor(private readonly tokenRepo: TokenHospitalRepository,
         private readonly adminService: HospitalService,
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
            const admin = await this.adminService.pegarHospital(token.username);
            return this.authService.login(admin);
        } else {
            throw new UnauthorizedException();
        }
    }

}
