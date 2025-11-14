"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estrategia_1 = __importDefault(require("./estrategia"));
const index_1 = require("../index");
class NextFit extends estrategia_1.default {
    inicioUltimaAsignacion = 0;
    finUltimaAsignacion = 0;
    ultimaAsignacion = 0;
    seleccionarParticion(particiones, tarea) {
        (0, index_1.agregarLog)("==========================================");
        (0, index_1.agregarLog)("Utilizacion Next Fit");
        (0, index_1.agregarLog)("-  Ultima asignacion: " + `[ ${this.inicioUltimaAsignacion} , ${this.finUltimaAsignacion} ]`);
        let i = 0;
        // no guardo el indice, porque al fusionarse las particiones, pierde sentido guardarlo
        const ultimaParticion = this.buscarParticion(particiones, tarea);
        (0, index_1.agregarLog)("-  Comienza la busqueda desde: " + `[ ${ultimaParticion.getInicio()} , ${ultimaParticion.getFin()} ]`);
        let j = particiones.indexOf(ultimaParticion);
        this.ultimaAsignacion = j;
        do {
            let particion = particiones[j];
            if (particion.getLibre() &&
                (particion.getTamanio() >= tarea.getMemoria_requerida())) {
                (0, index_1.agregarLog)("Se encontro una particion despues de recorrer " + i + " particiones");
                (0, index_1.agregarLog)("==========================================");
                this.inicioUltimaAsignacion = particion.getInicio();
                this.finUltimaAsignacion = particion.getFin();
                (0, index_1.agregarLog)("-  Particion a asignar: " + `[ ${this.inicioUltimaAsignacion} , ${this.finUltimaAsignacion} ]`);
                return particion;
            }
            i += 1;
            j = (j + 1) % particiones.length;
        } while (j !== this.ultimaAsignacion);
        (0, index_1.agregarLog)("==========================================");
        return null;
    }
    buscarParticion(particiones, tarea) {
        for (let i = 0; i < particiones.length; i++) {
            const p = particiones[i];
            const inicio = Math.min(p.getInicio(), p.getFin());
            const fin = Math.max(p.getInicio(), p.getFin());
            if (this.inicioUltimaAsignacion >= inicio && this.inicioUltimaAsignacion <= fin) {
                return p;
            }
        }
    }
}
exports.default = NextFit;
//# sourceMappingURL=nextFit.js.map