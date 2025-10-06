import { AppDataSource } from "../data-source";
import { ConfiguracionSistema } from "../entity/ConfiguracionSistema";

const repo = () => AppDataSource.getRepository(ConfiguracionSistema);

export const ConfiguracionSistemaService = {
  create: async (data: Partial<ConfiguracionSistema>) => {
    const entity = repo().create(data);
    return repo().save(entity);
  },
  findAll: async () => repo().find(),
  findOne: async (id: number) => repo().findOneBy({ id }),
  findByKey: async (clave: string) => repo().findOneBy({ clave }),
  update: async (id: number, data: Partial<ConfiguracionSistema>) => {
    await repo().update(id, data);
    return repo().findOneBy({ id });
  },
  delete: async (id: number) => {
    const res = await repo().delete(id);
    return res.affected && res.affected > 0;
  },
};
