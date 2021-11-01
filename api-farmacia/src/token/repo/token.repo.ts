
import { EntityRepository, Repository } from 'typeorm';
import { TokenFarmacia } from '../models/token.entity';

@EntityRepository(TokenFarmacia)
export class TokenFarmaciaRepository extends Repository<TokenFarmacia> {
}