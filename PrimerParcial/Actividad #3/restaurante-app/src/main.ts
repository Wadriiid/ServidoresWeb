import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { RestauranteService } from "./service/RestauranteService";
import { MesaService } from "./service/MesaService";
import { ClienteService } from "./service/ClienteService";
import { MenuService } from "./service/MenuService";

AppDataSource.initialize().then(async () => {
  console.log("✅ Conexión con la base de datos establecida.");

  const restauranteService = new RestauranteService();
  const mesaService = new MesaService();
  const clienteService = new ClienteService();
  const menuService = new MenuService();

  try {
    console.log("\n🏪 Pruebas de Restaurante:");
    // Crear restaurante
    const restaurante = await restauranteService.create({
      nombre: "Restaurante Buen Sabor",
      direccion: "Av. Central 123",
      telefono: "0999999999",
    });
    console.log("✓ Restaurante creado:", restaurante);

    // Actualizar restaurante
    const restauranteActualizado = await restauranteService.update(restaurante.id, {
      nombre: "Restaurante El Sabor",
      telefono: "0999999900"
    });
    console.log("✓ Restaurante actualizado:", restauranteActualizado);

    console.log("\n🪑 Pruebas de Mesas:");
    // Crear mesas
    const mesa1 = await mesaService.create({ 
      numero: 1, 
      capacidad: 4, 
      restaurante 
    });
    console.log("✓ Mesa 1 creada:", mesa1);

    const mesa2 = await mesaService.create({ 
      numero: 2, 
      capacidad: 2, 
      restaurante 
    });
    console.log("✓ Mesa 2 creada:", mesa2);

    // Actualizar mesa
    const mesaActualizada = await mesaService.update(mesa1.id, {
      capacidad: 6
    });
    console.log("✓ Mesa actualizada:", mesaActualizada);

    console.log("\n📝 Pruebas de Menús:");
    // Crear menús
    const menu1 = await menuService.create({
      nombre: "Almuerzo Ejecutivo",
      descripcion: "Sopa, plato fuerte, postre y bebida",
      precio: 5.5,
      restaurante
    });
    console.log("✓ Menú 1 creado:", menu1);

    const menu2 = await menuService.create({
      nombre: "Menú Infantil",
      descripcion: "Nuggets de pollo, papas fritas, jugo y helado",
      precio: 3.0,
      restaurante
    });
    console.log("✓ Menú 2 creado:", menu2);

    // Actualizar menú
    const menuActualizado = await menuService.update(menu1.id, {
      precio: 6.0,
      descripcion: "Sopa, plato fuerte, postre, bebida y café"
    });
    console.log("✓ Menú actualizado:", menuActualizado);

    console.log("\n👥 Pruebas de Clientes:");
    // Crear clientes
    const cliente1 = await clienteService.create({ 
      nombre: "Juan Pérez", 
      correo: "juan@mail.com", 
      telefono: "099888777" 
    });
    console.log("✓ Cliente 1 creado:", cliente1);

    const cliente2 = await clienteService.create({ 
      nombre: "María López", 
      correo: "maria@mail.com", 
      telefono: "098123456" 
    });
    console.log("✓ Cliente 2 creado:", cliente2);

    // Actualizar cliente
    const clienteActualizado = await clienteService.update(cliente1.id, {
      telefono: "099888888",
      correo: "juan.perez@mail.com"
    });
    console.log("✓ Cliente actualizado:", clienteActualizado);

    console.log("\n🔍 Pruebas de búsqueda:");
    // Buscar todos los registros
    console.log("\nRestaurantes con mesas y menús:");
    console.log(await restauranteService.findAll());
    
    console.log("\nMesas del restaurante:");
    console.log(await mesaService.findAll());
    
    console.log("\nMenús disponibles:");
    console.log(await menuService.findAll());
    
    console.log("\nClientes registrados:");
    console.log(await clienteService.findAll());

    // Buscar por ID
    console.log("\nBúsqueda por ID:");
    console.log("Restaurante 1:", await restauranteService.findOne(1));
    console.log("Mesa 1:", await mesaService.findOne(1));
    console.log("Menú 1:", await menuService.findOne(1));
    console.log("Cliente 1:", await clienteService.findOne(1));

    console.log("\n✅ Todas las pruebas completadas exitosamente");
  } catch (error) {
    console.error("\n❌ Error durante las pruebas:", error);
  }
}).catch((error) => console.log(error));
