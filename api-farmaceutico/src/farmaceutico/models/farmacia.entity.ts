import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Farmacia extends BaseEntity {

  @PrimaryColumn()
  cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nomeFantasia: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

}
