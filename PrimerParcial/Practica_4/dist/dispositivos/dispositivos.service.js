"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispositivosService = void 0;
const common_1 = require("@nestjs/common");
let DispositivosService = class DispositivosService {
    create(createDispositivoDto) {
        return 'This action adds a new dispositivo';
    }
    findAll() {
        return `This action returns all dispositivos`;
    }
    findOne(id) {
        return `This action returns a #${id} dispositivo`;
    }
    update(id, updateDispositivoDto) {
        return `This action updates a #${id} dispositivo`;
    }
    remove(id) {
        return `This action removes a #${id} dispositivo`;
    }
};
exports.DispositivosService = DispositivosService;
exports.DispositivosService = DispositivosService = __decorate([
    (0, common_1.Injectable)()
], DispositivosService);
//# sourceMappingURL=dispositivos.service.js.map