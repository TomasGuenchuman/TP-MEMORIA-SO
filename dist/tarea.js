"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class Tarea {
    nombre;
    tiempo_arribo;
    duracion;
    memoria_requerida;
    constructor(nombre, tiempo_arribo, duracion, memoria_requerida, log) {
        this.nombre = nombre;
        this.tiempo_arribo = tiempo_arribo;
        this.duracion = duracion;
        this.memoria_requerida = memoria_requerida;
        if (log) {
            (0, index_1.agregarLog)("Se creo la tarea...");
            (0, index_1.agregarLog)(this.toString());
        }
    }
    getNombre() {
        return this.nombre;
    }
    getMemoria_requerida() {
        return this.memoria_requerida;
    }
    getDuracion() {
        return this.duracion;
    }
    getTiempoArribo() {
        return this.tiempo_arribo;
    }
    clone() {
        return new Tarea(this.nombre, this.tiempo_arribo, this.duracion, this.memoria_requerida);
    }
    toString() {
        return (`{ \n` +
            `  Nombre: ${this.nombre}\n` +
            `  Tiempo de arribo: ${this.tiempo_arribo}\n` +
            `  Duración: ${this.duracion}\n` +
            `  Memoria requerida: ${this.memoria_requerida}\n` +
            `}`);
    }
}
exports.default = Tarea;
//# sourceMappingURL=tarea.js.map