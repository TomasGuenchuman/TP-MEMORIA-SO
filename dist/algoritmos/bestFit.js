"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estrategia_1 = __importDefault(require("./estrategia"));
const index_1 = require("../index");
class BestFit extends estrategia_1.default {
    seleccionarParticion(particiones, tarea) {
        (0, index_1.agregarLog)("==========================================");
        (0, index_1.agregarLog)("Utilizacion Best Fit");
        let mejor = null;
        for (const particion of particiones) {
            if (particion.getLibre() &&
                particion.getTamanio() >= tarea.getMemoria_requerida()) {
                if (mejor === null) {
                    mejor = particion;
                    (0, index_1.agregarLog)("-  mejor particion: " + `[ ${mejor.getInicio()} , ${mejor.getFin()} ]`);
                }
                else {
                    if (particion.getTamanio() < mejor.getTamanio()) {
                        mejor = particion;
                        (0, index_1.agregarLog)("-  mejor particion: " + `[ ${mejor.getInicio()} , ${mejor.getFin()} ]`);
                    }
                }
            }
        }
        (0, index_1.agregarLog)("==========================================");
        return mejor;
    }
}
exports.default = BestFit;
//# sourceMappingURL=bestFit.js.map