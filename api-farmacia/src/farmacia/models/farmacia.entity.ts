import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Farmacia extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nomeFilial: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

}
