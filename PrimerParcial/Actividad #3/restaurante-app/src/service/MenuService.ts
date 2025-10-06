import { AppDataSource } from "../data-source";
import { Menu } from "../entity/Menu";

export class MenuService {
  private repo = AppDataSource.getRepository(Menu);

  async create(data: Partial<Menu>) {
    const menu = this.repo.create(data);
    return await this.repo.save(menu);
  }

  async findAll() {
    return await this.repo.find({ relations: ["restaurante"] });
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ["restaurante"] });
  }

  async update(id: number, data: Partial<Menu>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
