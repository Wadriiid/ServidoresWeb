import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurante } from "./Restaurante";

@Entity()
export class Mesa {
  @PrimaryGeneratedColumn()
  id!: number; // ✅ operador "!"

  @Column()
  numero!: number;

  @Column()
  capacidad!: number;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.mesas)
  restaurante!: Restaurante; // ✅ operador "!"
}
