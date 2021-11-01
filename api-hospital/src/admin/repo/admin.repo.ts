
import { EntityRepository, Repository } from 'typeorm';
import { AdminHospital } from '../models/admin.entity';

@EntityRepository(AdminHospital)
export class AdminRepository extends Repository<AdminHospital> {
}