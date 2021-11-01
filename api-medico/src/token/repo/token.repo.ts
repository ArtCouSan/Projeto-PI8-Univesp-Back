
import { EntityRepository, Repository } from 'typeorm';
import { TokenMedico } from '../models/token.entity';

@EntityRepository(TokenMedico)
export class TokenMedicoRepository extends Repository<TokenMedico> {
}