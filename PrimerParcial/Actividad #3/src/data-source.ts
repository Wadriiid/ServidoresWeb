import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "./entity/Categoria";
import { Rol } from "./entity/Rol";
import { TipoProducto } from "./entity/TipoProducto";
import { ConfiguracionSistema } from "./entity/ConfiguracionSistema";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "restaurante.db",
  synchronize: true,
  logging: false,
  entities: [Categoria, Rol, TipoProducto, ConfiguracionSistema],
});
