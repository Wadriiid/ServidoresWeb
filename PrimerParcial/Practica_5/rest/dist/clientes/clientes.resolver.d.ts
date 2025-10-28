import { ClientesService } from './clientes.service';
export declare class ClientesResolver {
    private readonly service;
    constructor(service: ClientesService);
    clientes(): {
        id: string;
        nombre: string;
        correo: string;
    }[];
    cliente(id: string): {
        id: string;
        nombre: string;
        correo: string;
    } | undefined;
}
