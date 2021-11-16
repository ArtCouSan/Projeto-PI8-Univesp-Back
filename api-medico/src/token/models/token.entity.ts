import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TokenMedico extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  hash: string;

  @Column({ nullable: false, type: 'varchar', length: 14 })
  cnpjHospital: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  crm: string;

}
