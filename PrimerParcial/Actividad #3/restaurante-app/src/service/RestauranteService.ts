import { AppDataSource } from "../data-source";
import { Restaurante } from "../entity/Restaurante";

export class RestauranteService {
  private repo = AppDataSource.getRepository(Restaurante);

  async create(data: Partial<Restaurante>) {
    const restaurante = this.repo.create(data);
    return await this.repo.save(restaurante);
  }

  async findAll() {
    return await this.repo.find({ relations: ["mesas", "menus"] });
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ["mesas", "menus"] });
  }

  async update(id: number, data: Partial<Restaurante>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
