import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TokenFarmacia extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  hash: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  username: string;

}
