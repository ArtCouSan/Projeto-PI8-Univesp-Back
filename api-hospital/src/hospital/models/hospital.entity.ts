import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Hospital extends BaseEntity {

  @PrimaryColumn()
  cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 8 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nomeFantasia: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

}
