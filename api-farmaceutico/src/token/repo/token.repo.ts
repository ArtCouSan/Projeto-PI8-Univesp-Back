
import { EntityRepository, Repository } from 'typeorm';
import { TokenFarmaceutico } from '../models/token.entity';

@EntityRepository(TokenFarmaceutico)
export class TokenFarmaceuticoRepository extends Repository<TokenFarmaceutico> {
}