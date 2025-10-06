import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number; // ✅ operador "!"

  @Column()
  nombre!: string;

  @Column()
  correo!: string;

  @Column()
  telefono!: string;
}
