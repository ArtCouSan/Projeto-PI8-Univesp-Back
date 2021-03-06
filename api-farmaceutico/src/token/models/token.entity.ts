import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TokenFarmaceutico extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  hash: string;

  @Column({ nullable: false, type: 'varchar', length: 14 })
  cnpjFarmacia: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  crf: string;

}
