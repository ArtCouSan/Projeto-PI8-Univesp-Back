
import { EntityRepository, Repository } from 'typeorm';
import { TokenPaciente } from '../models/token.entity';

@EntityRepository(TokenPaciente)
export class TokenPacienteRepository extends Repository<TokenPaciente> {
}