"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class Tanda {
    static instance;
    cola = [];
    totalTareas = 0;
    listos = [];
    constructor() {
    }
    agregarTanda(items) {
        if (items && items.length > 0) {
            this.cola = [...items];
            this.totalTareas = this.cola.length;
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Tanda();
        }
        return this.instance;
    }
    hayTareas() {
        return this.cola.length > 0;
    }
    getTotalTarea() {
        return this.totalTareas;
    }
    TandaTerminada() {
        let termino = this.listos.length === this.totalTareas;
        (0, index_1.agregarLog)("Tanda terminada? " + termino);
        (0, index_1.agregarLog)("-  Tareas lista: " + this.listos.length + " - total: " + this.totalTareas);
        return termino;
    }
    ObtenerTarea() {
        let aux = this.cola.shift();
        if ((aux === null) || (aux === undefined)) {
            return null;
        }
        if ((aux.getTiempoArribo() <= index_1.clock)) {
            (0, index_1.agregarLog)("Arribo la tarea: " + aux.getNombre() + " - en el tiempo: " + aux.getTiempoArribo());
            return aux;
        }
        this.cola.unshift(aux);
        return null;
    }
    agregar(item) {
        //agregarLog(`[Tanda.agregar] entra con: ${item.getNombre()}`);
        this.listos.push(item);
        //agregarLog(`[Tanda.agregar] listos.len = ${this.listos.length}`);
    }
    toString() {
        const tareas = this.cola.map((t) => t.toString()).join("\n---\n");
        return `TANDA (${this.cola.length} tareas)`;
    }
    listosToString() {
        let texto = this.listos
            .map((t, i) => {
            const nombre = t.getNombre();
            console.log(`Tarea #${i + 1}: ${nombre}`);
            return `Tarea #${i + 1}: ${nombre}`;
        })
            .join('\n');
        texto += "\nTotal tareas: " + this.totalTareas;
        return texto;
    }
}
exports.default = Tanda;
//# sourceMappingURL=tanda.js.map