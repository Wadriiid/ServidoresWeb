export declare class ClientesService {
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
