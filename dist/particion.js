"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class Particion {
    libre;
    tamanio;
    tarea;
    inicio_particion;
    fin_particion;
    finTarea = -1;
    liberacion;
    constructor(tamanio, inicio_particion, fin_particion, libre = false, tarea = null, liberacion) {
        this.liberacion = liberacion ?? false;
        this.libre = libre;
        this.tamanio = tamanio;
        this.tarea = tarea;
        this.inicio_particion = inicio_particion;
        this.fin_particion = fin_particion;
        if (!(tarea === null)) {
            this.asignarTarea(tarea);
        }
        (0, index_1.agregarLog)("SE CREO LA PARTICION...");
        (0, index_1.agregarLog)(this.toString());
    }
    asignarTarea(tarea) {
        this.tarea = tarea;
        this.finTarea = index_1.clock + tarea.getDuracion();
        this.libre = false;
    }
    getFinTarea() {
        return this.finTarea;
    }
    finalizarTarea() {
        this.libre = true;
        this.finTarea = -1;
        this.tarea = null;
        this.liberacion = false;
    }
    getLibre() {
        return this.libre;
    }
    getParticion() {
        return this;
    }
    getTamanio() {
        return this.tamanio;
    }
    getInicio() {
        return this.inicio_particion;
    }
    getFin() {
        return this.fin_particion;
    }
    getTarea() {
        return this.tarea;
    }
    getLiberacion() {
        return this.liberacion;
    }
    setLiberacion(x) {
        this.liberacion = x;
    }
    setInicio(x) {
        this.inicio_particion = x;
    }
    setFin(x) {
        this.fin_particion = x;
    }
    setTamanio(x) {
        this.tamanio = x;
    }
    setLibre(x) {
        this.libre = x;
    }
    sumarFinTarea(x) {
        this.finTarea += x;
    }
    toString() {
        return `
      ===== PARTICIÓN =====
      Libre: ${this.libre ? "Sí" : "No"}
      Tamaño: ${this.tamanio}
      Inicio/Fin: [ ${this.inicio_particion}, ${this.fin_particion} ]
      Fin tarea: clock = ${this.finTarea === -1 ? "-" : this.finTarea}
      ${this.tarea ? `Tarea: ${this.tarea.getNombre()}` : "Sin tarea asignada"}
      ======================
      `;
    }
}
exports.default = Particion;
//# sourceMappingURL=particion.js.map