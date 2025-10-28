"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const clientes = [
    {
        id: '1',
        nombre: 'Cliente A',
        correo: 'user@mail',
    },
    {
        id: '2',
        nombre: 'Cliente B',
        correo: 'user@mail',
    },
    {
        id: '3',
        nombre: 'Cliente C',
        correo: 'user@mail',
    }
];
let ClientesService = class ClientesService {
    findAll() {
        return clientes;
    }
    findOne(id) {
        return clientes.find(cliente => cliente.id === id);
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)()
], ClientesService);
//# sourceMappingURL=clientes.service.js.map