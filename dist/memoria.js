"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firstFit_1 = __importDefault(require("./algoritmos/firstFit"));
const particion_1 = __importDefault(require("./particion"));
const tanda_1 = __importDefault(require("./tanda"));
const index_1 = require("./index");
class Memoria {
    tamanio;
    particiones = [];
    tareasPendientes = [];
    totalLibre;
    estrategia;
    tanda = tanda_1.default.getInstance();
    colaEspera = [];
    // resultados:
    fragmentacion = 0;
    tiempoRetorno = [];
    tiempoMedioRetorno = 0;
    resumen = [];
    constructor(tamanio, estrategia = new firstFit_1.default()) {
        this.tamanio = tamanio;
        this.totalLibre = tamanio;
        this.estrategia = estrategia;
        // Creo una particion LIBRE que ocupe toda la memoria
        this.particiones.push(new particion_1.default(this.tamanio, // tamaño de la particion
        0, // inicio
        this.tamanio - 1, // fin
        true // libre?
        ));
        (0, index_1.agregarLog)("se creo el objeto memoria...");
    }
    agregarTarea(nuevaTarea) {
        (0, index_1.agregarLog)("================================");
        const textoParticiones = this.particiones
            .map(p => `[ ${p.getInicio()} , ${p.getFin()} ] -  Libre: ${p.getLibre()} - Tarea: ${p.getTarea() ? p.getTarea().getNombre() : "Sin tarea asignada"} - Fin tarea: ${p.getFinTarea()}`)
            .join('\n' + '--------------------------------------------------------' + '\n');
        (0, index_1.agregarLog)("Listado de particiones:\n" + textoParticiones);
        (0, index_1.agregarLog)("================================");
        let tarea = nuevaTarea;
        let dequeue = true;
        if ((tarea === null) || (tarea === undefined)) {
            tarea = this.tareasPendientes.shift();
            dequeue = false;
        }
        if (!(tarea === null) && !(tarea === undefined)) {
            (0, index_1.agregarLog)("Se quiere agregar la tarea:");
            (0, index_1.agregarLog)(tarea.toString());
            // hay tareas en la cola?
            if (dequeue) {
                let tareaAntigua = tarea;
                this.tareasPendientes.push(tarea);
                tarea = this.tareasPendientes.shift();
                let tareaActual = tarea;
                if (!(tareaAntigua === tareaActual)) {
                    (0, index_1.agregarLog)("Hay tareas pendientes...");
                    (0, index_1.agregarLog)("nueva tarea: ");
                    (0, index_1.agregarLog)(tarea.toString());
                }
            }
            // Hay espacio para la tarea?
            if (this.totalLibre >= tarea.getMemoria_requerida()) {
                (0, index_1.agregarLog)("Hay memoria disponible");
                const particion = this.estrategia.seleccionarParticion(this.particiones, tarea);
                if (!(particion === null)) {
                    this.crearParticion(particion, tarea);
                }
                else {
                    (0, index_1.agregarLog)("No hay particion disponible para la tarea: ");
                    this.tareasPendientes.unshift(tarea);
                }
            }
            else {
                // SI NO AHY MEMORIA PENDIENTE
                (0, index_1.agregarLog)("No hay memoria disponible...");
                (0, index_1.agregarLog)("Se mando a la cola de pendientes, la tarea");
                (0, index_1.agregarLog)(tarea.toString());
                this.tareasPendientes.unshift(tarea);
            }
        }
        else {
            // tarea es null
            (0, index_1.agregarLog)("");
            (0, index_1.agregarLog)("No hay tareas pendientes ni tareas nuevas");
        }
    }
    crearParticion(particion, tarea) {
        (0, index_1.agregarLog)("Particion disponible para la tarea: ");
        (0, index_1.agregarLog)(particion.toString());
        if (particion.getTamanio() === tarea.getMemoria_requerida()) {
            // el tamaño de la aprticion coincide con el que necesita la tarea
            (0, index_1.agregarLog)("La particion es del mismo tamaño que lo que requiere la tarea");
            particion.asignarTarea(tarea);
            this.totalLibre -= tarea.getMemoria_requerida();
            (0, index_1.agregarLog)("Se asigno la tarea a la particion.");
            (0, index_1.agregarLog)(particion.toString());
        }
        else {
            // la particion no es del mismo tamaño que necesita la Tarea.
            (0, index_1.agregarLog)("La particion es mas grande que lo que requiere la tarea");
            const finParticionLibre = particion.getFin();
            const nuevaParticion = new particion_1.default(tarea.getMemoria_requerida(), particion.getInicio(), particion.getInicio() + (tarea.getMemoria_requerida() - 1), false, tarea);
            // AGREGAR NUEVA PARTICION
            const indice = this.particiones.indexOf(particion);
            if (indice === -1) {
                throw new Error("La partición de referencia no existe en el arreglo.");
            }
            this.particiones.splice(indice, 0, nuevaParticion);
            particion.setInicio(nuevaParticion.getFin() + 1);
            particion.setFin(finParticionLibre);
            particion.setTamanio(particion.getTamanio() - nuevaParticion.getTamanio());
            this.totalLibre -= nuevaParticion.getTamanio();
            (0, index_1.agregarLog)("Se modifico la particion libre");
            (0, index_1.agregarLog)(particion.toString());
        }
    }
    espacioDisponible(tarea) {
        return this.totalLibre >= tarea.getMemoria_requerida();
    }
    fusionarParticionesContiguas() {
        let x = 0;
        (0, index_1.agregarLog)("Se intenta fusionar particiones ocntiguas");
        const resultado = [];
        let actual = this.particiones[0];
        for (let i = 1; i < this.particiones.length; i++) {
            const siguiente = this.particiones[i];
            // se pueden fusionar?
            const sonLibres = (actual.getLibre()) && (siguiente.getLibre());
            const sonContiguas = (actual.getFin()) === (siguiente.getInicio() - 1);
            if (sonLibres && sonContiguas) {
                (0, index_1.agregarLog)(`Se fusionan las particiones: [ ${actual.getInicio()}, ${actual.getFin()} ] y [ ${siguiente.getInicio()}, ${siguiente.getFin()} ]`);
                x += 1;
                // extendemos la partición actual
                const nuevoFin = siguiente.getFin();
                actual.setFin(nuevoFin);
                actual.setTamanio(actual.getTamanio() + siguiente.getTamanio());
                // no se hace push hasta no saber si la sigeiente esta libre
            }
            else {
                resultado.push(actual);
                actual = siguiente;
            }
        }
        // meter la última
        resultado.push(actual);
        (0, index_1.agregarLog)("-   Particiones fusionadas: " + x);
        this.particiones = resultado;
    }
    finalizarTareas() {
        (0, index_1.agregarLog)("Se busca finalizar tareas...");
        let x = 0;
        // reducir el tiempo de espera        
        if (index_1.tiempoLiberacion > 0) {
            (0, index_1.agregarLog)("======== REDUCCION TIEMPOS DE ESPERA ========");
            for (const item of this.colaEspera) {
                item.tiempoEspera -= 1;
            }
            // hay alguna tarea que pueda finalizar
            for (const particion of this.particiones) {
                // puede finalizar la tarea?
                if (!(particion.getLibre()) && (particion.getFinTarea() <= index_1.clock) && !(particion.getLiberacion())) {
                    this.colaEspera.push({
                        particion: particion,
                        tiempoEspera: index_1.tiempoLiberacion
                    });
                    particion.setLiberacion(true);
                }
            }
            // hay tareas que puedan salir de la cola?
            for (let i = 0; i < this.colaEspera.length; i++) {
                if (this.colaEspera[i].tiempoEspera <= 0) {
                    x += 1;
                    let eliminado = this.colaEspera.splice(i, 1)[0];
                    let particion = eliminado.particion;
                    // LE TENGO QUE SUMAR EL TIEMPO DE LA LIBERACION A lA PARTICION.
                    particion.sumarFinTarea(index_1.tiempoLiberacion);
                    // logica finalizacion de la tarea
                    (0, index_1.agregarLog)("Se libero la particion");
                    this.tanda.agregar(particion.getTarea().clone());
                    (0, index_1.agregarLog)(particion.toString());
                    this.tiempoRetorno.push({
                        finTarea: particion.getFinTarea(),
                        tarea: particion.getTarea().clone()
                    });
                    this.resumen.push({
                        inicio: particion.getInicio(),
                        fin: particion.getFin(),
                        finTarea: particion.getFinTarea(),
                        tarea: particion.getTarea().clone()
                    });
                    this.totalLibre += particion.getTamanio();
                    particion.finalizarTarea();
                }
            }
        }
        else {
            // no hay tiempo de liberacion
            for (const particion of this.particiones) {
                // puede finalizar la tarea?
                if (!particion.getLibre() && (particion.getFinTarea() <= index_1.clock)) {
                    // logica finalizacion de la tarea
                    (0, index_1.agregarLog)("Se libero la particion");
                    this.tanda.agregar(particion.getTarea().clone());
                    (0, index_1.agregarLog)(particion.toString());
                    this.tiempoRetorno.push({
                        finTarea: particion.getFinTarea(),
                        tarea: particion.getTarea().clone()
                    });
                    this.resumen.push({
                        inicio: particion.getInicio(),
                        fin: particion.getFin(),
                        finTarea: particion.getFinTarea(),
                        tarea: particion.getTarea().clone()
                    });
                    this.totalLibre += particion.getTamanio();
                    x += 1;
                    particion.finalizarTarea();
                }
            }
        }
        (0, index_1.agregarLog)("-   Tareas finalizadas: " + x);
        if (this.particiones.length >= 2) {
            this.fusionarParticionesContiguas();
        }
    }
    calcularFragmentacion() {
        const hayPendientes = (this.tareasPendientes.length > 0);
        const hayOcupadas = this.particiones.some(p => !p.getLibre());
        for (const p of this.particiones) {
            // la partion esta libre Y es la ultima tarea a ejecutar?
            if (p.getLibre() && (hayPendientes || this.tanda.hayTareas())) {
                if ((!(p.getLiberacion()) && hayOcupadas)) {
                    this.fragmentacion += p.getTamanio();
                }
            }
        }
    }
    calculoTiempoRetorno() {
        let retornoTanda = 0;
        (0, index_1.agregarLog)("-Retorno procesos: ");
        for (const retorno of this.tiempoRetorno) {
            (0, index_1.agregarLog)(`  Tarea: ${retorno.tarea.getNombre()} - Tiempo Retorno: ${retorno.finTarea}`);
            retornoTanda = retorno.finTarea;
            this.tiempoMedioRetorno += retornoTanda;
        }
        (0, index_1.agregarLog)("-Retorno de la tanda: " + retornoTanda);
        (0, index_1.agregarLog)("total tareas: " + this.tanda.getTotalTarea());
        (0, index_1.agregarLog)("-Tiempo medio de Retorno: " + this.tiempoMedioRetorno / this.tiempoRetorno.length);
    }
    getResumen() {
        (0, index_1.agregarLog)("RESUMEN: ");
        for (const resumen of this.resumen) {
            (0, index_1.agregarLog)(`  Tarea: ${resumen.tarea.getNombre()} - particion: [ ${resumen.inicio} , ${resumen.fin} ] - Fin tarea: ${resumen.finTarea}`);
        }
    }
    getTotalLibre() {
        return this.totalLibre;
    }
    getFragmentacion() {
        return this.fragmentacion;
    }
    hayTareasPendiente() {
        const hayOcupadas = this.particiones.some(p => !p.getLibre());
        return (this.tareasPendientes.length > 0) || (hayOcupadas);
    }
}
exports.default = Memoria;
//# sourceMappingURL=memoria.js.map