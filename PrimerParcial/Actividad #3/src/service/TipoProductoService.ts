import { AppDataSource } from "../data-source";
import { TipoProducto } from "../entity/TipoProducto";

const repo = () => AppDataSource.getRepository(TipoProducto);

export const TipoProductoService = {
  create: async (data: Partial<TipoProducto>) => {
    const entity = repo().create(data);
    return repo().save(entity);
  },
  findAll: async () => repo().find({ relations: ["categoria"] }),
  findOne: async (id: number) => repo().findOne({ where: { id }, relations: ["categoria"] }),
  findByName: async (nombre: string) => repo().findOne({ where: { nombre }, relations: ["categoria"] }),
  update: async (id: number, data: Partial<TipoProducto>) => {
    await repo().update(id, data);
    return repo().findOneBy({ id });
  },
  delete: async (id: number) => {
    const res = await repo().delete(id);
    return res.affected && res.affected > 0;
  },
};
