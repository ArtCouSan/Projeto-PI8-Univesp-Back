
import { EntityRepository, Repository } from 'typeorm';
import { TokenHospital } from '../models/token.entity';

@EntityRepository(TokenHospital)
export class TokenHospitalRepository extends Repository<TokenHospital> {
}