import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column({ nullable: true })
  descripcion?: string;
}
