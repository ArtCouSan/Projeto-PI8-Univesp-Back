
import { EntityRepository, Repository } from 'typeorm';
import { AdminFarmacia } from '../models/admin.entity';

@EntityRepository(AdminFarmacia)
export class AdminRepository extends Repository<AdminFarmacia> {
}