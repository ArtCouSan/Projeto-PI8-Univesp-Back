import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Farmaceutico extends BaseEntity {

  @PrimaryColumn()
  crf: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  password: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

}
