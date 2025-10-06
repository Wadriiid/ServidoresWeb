import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column({ nullable: true })
  descripcion?: string;
}
