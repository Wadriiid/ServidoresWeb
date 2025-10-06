import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { CategoriaService } from "./service/CategoriaService";
import { RolService } from "./service/RolService";
import { TipoProductoService } from "./service/TipoProductoService";
import { ConfiguracionSistemaService } from "./service/ConfiguracionSistemaService";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Conexión con la base de datos establecida.");

    // --- CRUD completo para Categoria ---
    console.log("\n--- Categoria CRUD ---");
    const createdCat = await CategoriaService.create({ nombre: `Categoria_${Date.now()}`, descripcion: "Prueba CRUD" });
    console.log("Creada:", createdCat);
    const foundCat = await CategoriaService.findOne(createdCat.id);
    console.log("Encontrada:", foundCat);
    const updatedCat = await CategoriaService.update(createdCat.id, { descripcion: "Actualizada" });
    console.log("Actualizada:", updatedCat);
    const deletedCatOk = await CategoriaService.delete(createdCat.id);
    console.log("Eliminada?:", deletedCatOk);

    // --- CRUD completo para Rol ---
    console.log("\n--- Rol CRUD ---");
    const createdRol = await RolService.create({ nombre: `ROL_${Date.now()}`, descripcion: "Rol prueba" });
    console.log("Creado:", createdRol);
    const foundRol = await RolService.findOne(createdRol.id);
    console.log("Encontrado:", foundRol);
    const updatedRol = await RolService.update(createdRol.id, { descripcion: "Rol actualizado" });
    console.log("Actualizado:", updatedRol);
    const deletedRolOk = await RolService.delete(createdRol.id);
    console.log("Eliminado?:", deletedRolOk);

    // --- CRUD completo para TipoProducto ---
    console.log("\n--- TipoProducto CRUD ---");
    // necesitamos una categoria para relacionar
    const baseCat = await CategoriaService.create({ nombre: `Categoria_base_${Date.now()}`, descripcion: "Base para tipo" });
    const createdTipo = await TipoProductoService.create({ nombre: `Tipo_${Date.now()}`, descripcion: "Tipo prueba", activo: true, categoria: baseCat });
    console.log("Creado:", createdTipo);
    const foundTipo = await TipoProductoService.findOne(createdTipo.id);
    console.log("Encontrado:", foundTipo);
    const updatedTipo = await TipoProductoService.update(createdTipo.id, { activo: false });
    console.log("Actualizado:", updatedTipo);
    const deletedTipoOk = await TipoProductoService.delete(createdTipo.id);
    console.log("Eliminado?:", deletedTipoOk);
    // limpiar la categoria base
    await CategoriaService.delete(baseCat.id);

    // --- CRUD completo para ConfiguracionSistema ---
    console.log("\n--- ConfiguracionSistema CRUD ---");
    const createdConf = await ConfiguracionSistemaService.create({ clave: `CLAVE_${Date.now()}`, valor: "VAL", descripcion: "Prueba config" });
    console.log("Creada:", createdConf);
    const foundConf = await ConfiguracionSistemaService.findOne(createdConf.id);
    console.log("Encontrada:", foundConf);
    const updatedConf = await ConfiguracionSistemaService.update(createdConf.id, { valor: "VAL2" });
    console.log("Actualizada:", updatedConf);
    const deletedConfOk = await ConfiguracionSistemaService.delete(createdConf.id);
    console.log("Eliminada?:", deletedConfOk);

    console.log("\n🎉 Pruebas completadas — vamos KRUUU");

    await AppDataSource.destroy();
  } catch (error) {
    console.error("❌ Error durante la prueba:", error);
  }
}

main();
