import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Farmaceutico } from "./farmaceutico.entity";

@Entity()
export class Farmacia extends BaseEntity {

  @PrimaryColumn()
  cnpj: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nomeFantasia: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  status: string;

  @OneToMany(type => Farmaceutico, farmacia => farmacia.farmacia, { onUpdate: "CASCADE", cascade: true })
  farmaceuticos: Farmaceutico[];
}
