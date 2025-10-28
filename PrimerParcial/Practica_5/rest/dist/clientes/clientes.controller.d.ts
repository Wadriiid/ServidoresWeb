import { ClientesService } from './clientes.service';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    findAll(): {
        id: string;
        nombre: string;
        correo: string;
    }[];
    findOne(id: string): {
        id: string;
        nombre: string;
        correo: string;
    } | undefined;
}
