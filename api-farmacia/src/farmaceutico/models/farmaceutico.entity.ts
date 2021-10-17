import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Farmacia } from "./farmacia.entity";

@Entity()
export class Farmaceutico extends BaseEntity {

  @PrimaryColumn()
  crf: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(type => Farmacia, farmacia => farmacia.farmaceuticos)
  @JoinColumn({ name: 'cnpj' })
  farmacia: Farmacia;

}
