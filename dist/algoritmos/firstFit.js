"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estrategia_1 = __importDefault(require("./estrategia"));
const index_1 = require("../index");
class FirstFit extends estrategia_1.default {
    seleccionarParticion(particiones, tarea) {
        (0, index_1.agregarLog)("==========================================");
        (0, index_1.agregarLog)("Utilizacion First Fit");
        let i = 0;
        for (const particion of particiones) {
            i += 1;
            (0, index_1.agregarLog)(`Particion: [ ${particion.getInicio()} , ${particion.getFin()} ] - Libre: ${particion.getLibre()} - tamaño: ${particion.getTamanio()}`);
            if (particion.getLibre() &&
                (particion.getTamanio() >= tarea.getMemoria_requerida())) {
                (0, index_1.agregarLog)("Se encontro una particion despues de recorrer " + i + " particiones");
                (0, index_1.agregarLog)("==========================================");
                return particion;
            }
        }
        (0, index_1.agregarLog)("==========================================");
        return null;
    }
}
exports.default = FirstFit;
//# sourceMappingURL=firstFit.js.map